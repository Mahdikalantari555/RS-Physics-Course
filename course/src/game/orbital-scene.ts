import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { computeTelemetry, type GameParams, type LensMode } from "./physics";
import { createCloudTexture, createEarthTextures, createSolarPanelTexture } from "./textures";

export type CameraPreset = "overview" | "satellite" | "limb";

const EARTH_RADIUS = 2.2;
const PULSE_COUNT = 26;

// Reusable scratch math objects (zero per-frame GC allocations)
const _vSat = new THREE.Vector3();
const _vNadir = new THREE.Vector3();
const _vUp = new THREE.Vector3(0, 1, 0);
const _vMid = new THREE.Vector3();
const _vDir = new THREE.Vector3();
const _vSun = new THREE.Vector3();
const _vCamTargetPos = new THREE.Vector3();
const _vCamTargetLook = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _mat4 = new THREE.Matrix4();
const _scale = new THREE.Vector3();
const _color = new THREE.Color();

function detectSoftwareGl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? "");
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function altitudeToSceneRadius(altitudeKm: number): number {
  // Visualized slightly exaggerated over true Earth scale so LEO altitude
  // differences (300..1600 km) are unmistakably legible in 3D.
  const norm = Math.max(0, Math.min(1, (altitudeKm - 250) / 1450));
  return EARTH_RADIUS + 0.48 + norm * 1.15;
}

function latLonToVec3(latDeg: number, lonDeg: number, radius: number, out: THREE.Vector3): THREE.Vector3 {
  const phi = ((90 - latDeg) * Math.PI) / 180;
  const theta = ((lonDeg + 180) * Math.PI) / 180;
  out.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
  return out;
}

/**
 * Builds a composite 9-part procedural Earth-Observation Satellite (`THREE.Group`)
 * spanning primary bus, secondary solar wings & telescope, and accent telemetry dish.
 */
function buildSatelliteModel(solarTex: THREE.CanvasTexture): {
  root: THREE.Group;
  solarPivot: THREE.Group;
} {
  const root = new THREE.Group();

  // Shared calibrated PBR materials (varying metalness & roughness >= 0.25)
  const goldMliMat = new THREE.MeshStandardMaterial({
    color: 0xd9a441,
    metalness: 0.88,
    roughness: 0.28,
  });
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0x3b424c,
    metalness: 0.68,
    roughness: 0.56,
  });
  const matteBaffleMat = new THREE.MeshStandardMaterial({
    color: 0x191d22,
    metalness: 0.2,
    roughness: 0.85,
  });
  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xe6e2d8,
    metalness: 0.25,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    metalness: 0.15,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });
  const solarMat = new THREE.MeshStandardMaterial({
    map: solarTex,
    metalness: 0.35,
    roughness: 0.24,
  });

  // 1. Primary octagonal gold-foil spacecraft bus
  const bus = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.125, 0.24, 8), goldMliMat);
  root.add(bus);

  // 2 & 3. Structural titanium end caps & radiator collar
  const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.118, 0.118, 0.032, 8), titaniumMat);
  topCap.position.y = 0.132;
  root.add(topCap);

  const botCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.132, 0.105, 0.04, 8), titaniumMat);
  botCollar.position.y = -0.135;
  root.add(botCollar);

  // 4. Nadir optical telescope barrel (LatheGeometry pointing toward -Y = Earth nadir)
  const barrelProfile = [
    new THREE.Vector2(0.068, 0),
    new THREE.Vector2(0.068, -0.05),
    new THREE.Vector2(0.054, -0.095),
    new THREE.Vector2(0.06, -0.125),
    new THREE.Vector2(0.048, -0.125),
  ];
  const telescope = new THREE.Mesh(new THREE.LatheGeometry(barrelProfile, 20), matteBaffleMat);
  telescope.position.y = -0.145;
  root.add(telescope);

  // 5. Optical sapphire aperture lens at nadir tip
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.047, 0.047, 0.012, 20), lensMat);
  lens.position.y = -0.268;
  root.add(lens);

  // 6 & 7. Dual articulated solar array wings + truss booms
  const solarPivot = new THREE.Group();
  const boomGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.88, 8);
  const boom = new THREE.Mesh(boomGeo, titaniumMat);
  boom.rotation.z = Math.PI / 2;
  solarPivot.add(boom);

  const panelGeo = new THREE.BoxGeometry(0.36, 0.012, 0.15);
  const leftPanel = new THREE.Mesh(panelGeo, solarMat);
  leftPanel.position.x = -0.32;
  solarPivot.add(leftPanel);

  const rightPanel = new THREE.Mesh(panelGeo, solarMat);
  rightPanel.position.x = 0.32;
  solarPivot.add(rightPanel);
  root.add(solarPivot);

  // 8. Parabolic X-band / SAR telemetry dish mounted on the side
  const dishPoints: THREE.Vector2[] = [];
  for (let i = 0; i <= 8; i++) {
    const r = (i / 8) * 0.08;
    const y = r * r * 3.8;
    dishPoints.push(new THREE.Vector2(r, y));
  }
  const dish = new THREE.Mesh(new THREE.LatheGeometry(dishPoints, 18), dishMat);
  dish.position.set(0, 0.03, 0.15);
  dish.rotation.x = Math.PI * 0.42;
  root.add(dish);

  // 9. Star tracker baffle & S-band whip antenna on top deck
  const tracker = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.028, 0.055, 10), matteBaffleMat);
  tracker.position.set(-0.045, 0.17, -0.03);
  tracker.rotation.z = 0.28;
  root.add(tracker);

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.11, 6), goldMliMat);
  antenna.position.set(0.045, 0.195, 0.02);
  root.add(antenna);

  return { root, solarPivot };
}

export class OrbitalSceneController {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private isSoftwareGl: boolean;
  private startTimeMs = 0;
  private lastTimeMs = 0;
  private frameId = 0;
  private disposed = false;
  private paused = false;

  // Scene actors
  private earthMesh: THREE.Mesh;
  private earthMat: THREE.MeshStandardMaterial;
  private earthTextures: Record<LensMode, THREE.CanvasTexture>;
  private cloudMesh: THREE.Mesh;
  private atmoMat: THREE.ShaderMaterial;
  private sunLight: THREE.DirectionalLight;

  private orbitLine: THREE.LineLoop;
  private satGroup: THREE.Group;
  private solarPivot: THREE.Group;
  private swathCone: THREE.Mesh;
  private swathMat: THREE.MeshBasicMaterial;
  private footprintRing: THREE.Mesh;
  private footprintMat: THREE.MeshBasicMaterial;
  private targetBeacon: THREE.Group;
  private pulses: THREE.InstancedMesh;
  private pulseMat: THREE.MeshBasicMaterial;

  // Animated state
  private params: GameParams;
  private orbitAngle = 0.55;
  private currentOrbitRadius: number;
  private targetOrbitRadius: number;
  private currentSwathScale = 1;
  private activePreset: CameraPreset | null = null;
  private targetLatDeg = 35.0;
  private targetLonDeg = 51.0;

  private resizeObserver: ResizeObserver;
  private onContextLostBound: (e: Event) => void;

  constructor(
    container: HTMLElement,
    initialParams: GameParams,
    onContextLost?: () => void,
  ) {
    this.container = container;
    this.params = { ...initialParams };
    this.isSoftwareGl = detectSoftwareGl();

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b1018);
    this.scene.fog = new THREE.FogExp2(0x0b1018, 0.022);

    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 120);
    // Elevate globe & orbital ellipse into upper-middle viewport above bottom dock
    this.camera.position.set(5.4, 3.3, 5.7);

    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: "high-performance",
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.style.display = "block";
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    container.appendChild(this.renderer.domElement);

    this.onContextLostBound = (e: Event) => {
      e.preventDefault();
      onContextLost?.();
    };
    this.renderer.domElement.addEventListener("webglcontextlost", this.onContextLostBound);

    // Studio environment reflection for brushed gold foil & optics
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // Warm/Cool 3-point orbital lighting rig
    this.sunLight = new THREE.DirectionalLight(0xfff1dc, 2.35);
    this.sunLight.position.set(10, 5, 8);
    this.scene.add(this.sunLight);

    const hemiLight = new THREE.HemisphereLight(0x88b4e8, 0x1a2232, 0.65);
    this.scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x6ea8fe, 0.75);
    rimLight.position.set(-9, -3, -7);
    this.scene.add(rimLight);

    // Deep-space starfield (InstancedMesh for crisp dots with zero culling artifacts)
    const starGeo = new THREE.OctahedronGeometry(0.032, 0);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xe6edf7 });
    const starCount = 220;
    const stars = new THREE.InstancedMesh(starGeo, starMat, starCount);
    stars.frustumCulled = false;
    for (let i = 0; i < starCount; i++) {
      const u = ((i * 73.137) % 1000) / 1000;
      const v = ((i * 191.913) % 1000) / 1000;
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = 24 + (i % 14) * 1.4;
      _vMid.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      );
      const s = 0.65 + (i % 5) * 0.25;
      _scale.set(s, s, s);
      _quat.identity();
      _mat4.compose(_vMid, _quat, _scale);
      stars.setMatrixAt(i, _mat4);
    }
    stars.instanceMatrix.needsUpdate = true;
    this.scene.add(stars);

    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();

    // Earth globe with 3 procedural sensor-mode textures
    this.earthTextures = createEarthTextures(maxAniso);
    const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 64, 48);
    this.earthMat = new THREE.MeshStandardMaterial({
      map: this.earthTextures[initialParams.lensMode],
      roughness: 0.78,
      metalness: 0.06,
    });
    this.earthMesh = new THREE.Mesh(earthGeo, this.earthMat);
    // Rotate globe slightly so target region faces the front-right illuminated hemisphere
    this.earthMesh.rotation.y = -2.25;
    this.scene.add(this.earthMesh);

    // Translucent cloud shell
    const cloudTex = createCloudTexture(maxAniso);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTex,
      transparent: true,
      opacity: 0.52,
      roughness: 0.92,
      depthWrite: false,
    });
    this.cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.016, 48, 36), cloudMat);
    this.cloudMesh.renderOrder = 2;
    this.scene.add(this.cloudMesh);

    // Custom GLSL Fresnel atmospheric scattering shell (responds to Rayleigh & aerosols)
    this.atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      uniforms: {
        uColor: { value: new THREE.Color(0x4ea8ff) },
        uIntensity: { value: 0.85 },
        uSunDir: { value: new THREE.Vector3(1, 0.4, 0.7).normalize() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vNormal = normalize(mat3(modelMatrix) * normal);
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uIntensity;
        uniform vec3 uSunDir;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          float rim = pow(clamp(1.0 + dot(viewDir, vNormal), 0.0, 1.0), 2.8);
          float sunSide = smoothstep(-0.35, 0.65, dot(vNormal, uSunDir));
          float alpha = rim * uIntensity * (0.28 + 0.72 * sunSide);
          gl_FragColor = vec4(uColor * (0.85 + 0.4 * sunSide), clamp(alpha, 0.0, 0.88));
        }
      `,
    });
    const atmoMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.11, 48, 36), this.atmoMat);
    atmoMesh.renderOrder = 3;
    this.scene.add(atmoMesh);

    // Target beacon on the globe surface
    this.targetBeacon = new THREE.Group();
    const ringGeo = new THREE.RingGeometry(0.055, 0.088, 28);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    const pinMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.16, 8),
      new THREE.MeshBasicMaterial({ color: 0xfef3c7 }),
    );
    pinMesh.rotation.x = Math.PI / 2;
    pinMesh.position.z = 0.08;
    this.targetBeacon.add(ringMesh, pinMesh);
    this.earthMesh.add(this.targetBeacon);

    // Orbital ring path (inclined sun-synchronous style orbit)
    const orbitPts: THREE.Vector3[] = [];
    const segs = 128;
    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      orbitPts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a)));
    }
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPts);
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.68,
    });
    this.orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
    // Open inclined orbit clearly legible as a 3D ellipse from the overview camera
    this.orbitLine.rotation.z = 0.56;
    this.orbitLine.rotation.x = -0.34;
    this.scene.add(this.orbitLine);

    // Composite 9-part procedural satellite
    const solarTex = createSolarPanelTexture(maxAniso);
    const sat = buildSatelliteModel(solarTex);
    this.satGroup = sat.root;
    this.solarPivot = sat.solarPivot;
    this.scene.add(this.satGroup);

    // Translucent sensor swath cone extending from satellite down to Earth's surface
    const coneGeo = new THREE.ConeGeometry(1, 1, 32, 1, true);
    // Translate cone so apex sits at y=0 and base extends down to y=-1
    coneGeo.translate(0, -0.5, 0);
    this.swathMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.swathCone = new THREE.Mesh(coneGeo, this.swathMat);
    this.swathCone.renderOrder = 4;
    this.scene.add(this.swathCone);

    // Ground footprint ring on Earth surface directly beneath satellite
    const fpGeo = new THREE.RingGeometry(0.84, 1.0, 36);
    this.footprintMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.footprintRing = new THREE.Mesh(fpGeo, this.footprintMat);
    this.footprintRing.renderOrder = 5;
    this.scene.add(this.footprintRing);

    // EM photon/wave packet stream (InstancedMesh between Earth nadir and Satellite)
    const pulseGeo = new THREE.SphereGeometry(0.032, 10, 8);
    this.pulseMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
    });
    this.pulses = new THREE.InstancedMesh(pulseGeo, this.pulseMat, PULSE_COUNT);
    this.pulses.frustumCulled = false;
    this.scene.add(this.pulses);

    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = !this.isSoftwareGl;
    this.controls.dampingFactor = 0.06;
    this.controls.enablePan = false;
    this.controls.minDistance = 3.1;
    this.controls.maxDistance = 14.5;
    this.controls.target.set(0, -0.55, 0);
    this.controls.update();
    this.controls.addEventListener("start", () => {
      // Never fight user manual orbit drag
      this.activePreset = null;
    });

    this.currentOrbitRadius = altitudeToSceneRadius(initialParams.altitudeKm);
    this.targetOrbitRadius = this.currentOrbitRadius;
    this.applyParamsVisuals();
    this.setTargetLocation(this.targetLatDeg, this.targetLonDeg);

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(container);

    const now = performance.now();
    this.startTimeMs = now;
    this.lastTimeMs = now;
    this.tick();
  }

  public setParams(next: GameParams): void {
    const lensChanged = next.lensMode !== this.params.lensMode;
    this.params = { ...next };
    this.targetOrbitRadius = altitudeToSceneRadius(next.altitudeKm);
    if (lensChanged) {
      this.earthMat.map = this.earthTextures[next.lensMode];
      this.earthMat.needsUpdate = true;
    }
    this.applyParamsVisuals();
  }

  public setTargetLocation(latDeg: number, lonDeg: number): void {
    this.targetLatDeg = latDeg;
    this.targetLonDeg = lonDeg;
    latLonToVec3(latDeg, lonDeg, EARTH_RADIUS + 0.025, _vMid);
    this.targetBeacon.position.copy(_vMid);
    _vDir.copy(_vMid).normalize();
    _quat.setFromUnitVectors(new THREE.Vector3(0, 0, 1), _vDir);
    this.targetBeacon.quaternion.copy(_quat);
  }

  public setCameraPreset(preset: CameraPreset): void {
    this.activePreset = preset;
  }

  public setPaused(paused: boolean): void {
    this.paused = paused;
  }

  private applyParamsVisuals(): void {
    const telemetry = computeTelemetry(this.params);

    // Update sun vector from solar zenith angle
    const zenithRad = (this.params.sunZenithDeg * Math.PI) / 180;
    _vSun.set(Math.cos(zenithRad) * 9.5, Math.sin(zenithRad) * 6.5 + 2.0, 7.5);
    this.sunLight.position.copy(_vSun);
    this.atmoMat.uniforms.uSunDir.value.copy(_vSun).normalize();

    // Atmospheric shell responds to Rayleigh scattering & aerosols
    const haze = telemetry.atmo.pathHaze;
    const isBlueRayleigh = this.params.wavelengthUm < 0.6;
    const isBlocked = telemetry.atmo.transmittance < 0.35;
    if (isBlocked) {
      _color.set(0xd97706); // opaque absorption band warning amber
    } else if (isBlueRayleigh) {
      _color.set(0x38bdf8); // intense Rayleigh blue scattering
    } else if (this.params.lensMode === "thermal") {
      _color.set(0xf97316);
    } else {
      _color.set(0x34d399); // clean transparent atmospheric window
    }
    this.atmoMat.uniforms.uColor.value.copy(_color);
    this.atmoMat.uniforms.uIntensity.value = 0.42 + haze * 0.72 + (isBlocked ? 0.35 : 0);

    // Cloud visibility fades in Thermal / SWIR clarity visually while staying subtle
    const cloudMat = this.cloudMesh.material as THREE.MeshStandardMaterial;
    cloudMat.opacity = 0.22 + Math.min(0.42, this.params.waterVapor * 0.22);

    // Beam & footprint color reflects spectral band + Beer-Lambert transmittance
    _color.set(telemetry.atmo.beamHex);
    this.swathMat.color.copy(_color);
    this.swathMat.opacity = 0.06 + telemetry.atmo.transmittance * 0.14;
    this.footprintMat.color.copy(_color);
    this.footprintMat.opacity = 0.35 + telemetry.atmo.transmittance * 0.55;
    this.pulseMat.color.copy(_color);
    this.pulseMat.opacity = 0.25 + telemetry.atmo.transmittance * 0.75;
  }

  private handleResize(): void {
    if (this.disposed) return;
    const width = Math.max(this.container.clientWidth, 300);
    const height = Math.max(this.container.clientHeight, 300);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private updateOrbitAndBeam(dt: number, elapsed: number): void {
    const telemetry = computeTelemetry(this.params);

    // Smoothly damp orbit radius
    this.currentOrbitRadius = THREE.MathUtils.damp(
      this.currentOrbitRadius,
      this.targetOrbitRadius,
      6.0,
      dt,
    );
    this.orbitLine.scale.setScalar(this.currentOrbitRadius);

    // Keplerian angular speed: lower orbits move noticeably faster!
    const omega = (98 / telemetry.orbit.periodMin) * 0.34;
    if (!this.paused) {
      this.orbitAngle = (this.orbitAngle + dt * omega) % (Math.PI * 2);
      this.earthMesh.rotation.y += dt * 0.04;
      this.cloudMesh.rotation.y += dt * 0.052;
    }

    // Compute satellite world position along the inclined orbit ring
    _vSat.set(Math.cos(this.orbitAngle), 0, Math.sin(this.orbitAngle));
    _vSat.applyEuler(this.orbitLine.rotation);
    _vSat.multiplyScalar(this.currentOrbitRadius);
    this.satGroup.position.copy(_vSat);

    // Orient satellite nadir (-Y) directly toward Earth's center (0,0,0)
    _vDir.copy(_vSat).normalize(); // outward radial = local +Y
    _quat.setFromUnitVectors(_vUp, _vDir);
    this.satGroup.quaternion.copy(_quat);

    // Gently track sun angle with solar panels
    this.solarPivot.rotation.x = Math.sin(elapsed * 0.25) * 0.15;

    // Ground nadir point on Earth surface
    _vNadir.copy(_vDir).multiplyScalar(EARTH_RADIUS + 0.028);

    // Update swath cone geometry scale (apex at satellite, base at Earth surface)
    const coneHeight = Math.max(0.2, this.currentOrbitRadius - EARTH_RADIUS);
    const halfFovRad = (this.params.halfFovDeg * Math.PI) / 180;
    const targetFootprintR = Math.min(1.05, Math.max(0.12, coneHeight * Math.tan(halfFovRad) * 1.45));
    this.currentSwathScale = THREE.MathUtils.damp(this.currentSwathScale, targetFootprintR, 7.0, dt);

    this.swathCone.position.copy(_vSat);
    this.swathCone.quaternion.copy(_quat);
    this.swathCone.scale.set(this.currentSwathScale, coneHeight, this.currentSwathScale);

    // Place ground footprint ring flush on Earth surface
    this.footprintRing.position.copy(_vNadir);
    _quat.setFromUnitVectors(new THREE.Vector3(0, 0, 1), _vDir);
    this.footprintRing.quaternion.copy(_quat);
    this.footprintRing.scale.setScalar(this.currentSwathScale);

    // Animate EM wave/photon packets traveling upward from ground nadir -> satellite
    // Attenuated by Beer-Lambert transmittance and scattered by Rayleigh haze!
    const trans = telemetry.atmo.transmittance;
    const haze = telemetry.atmo.pathHaze;
    for (let i = 0; i < PULSE_COUNT; i++) {
      const phase = (elapsed * 0.55 + i / PULSE_COUNT) % 1;
      // Height along nadir-to-satellite path
      _vMid.lerpVectors(_vNadir, _vSat, phase);

      // Add subtle transverse wave oscillation whose spatial frequency scales inversely with lambda
      const waveFreq = Math.min(28, 12 / Math.max(0.4, Math.sqrt(this.params.wavelengthUm)));
      const scatterJitter = phase > 0.12 && phase < 0.45 ? haze * 0.16 * Math.sin(i * 4.7 + elapsed * 3) : 0;
      const amp = 0.035 + scatterJitter;
      // Offset perpendicular to radial direction
      _vMid.x += Math.sin(phase * waveFreq + elapsed * 4) * amp;
      _vMid.z += Math.cos(phase * waveFreq + elapsed * 4) * amp;

      // Shrink packet dramatically after atmospheric layer if blocked (Beer-Lambert attenuation)
      const inAtmoAtten = phase < 0.28 ? 1.0 : 0.2 + 0.85 * trans;
      const sz = (0.65 + 0.45 * Math.sin(phase * Math.PI)) * inAtmoAtten;
      _scale.set(sz, sz, sz);
      _quat.identity();
      _mat4.compose(_vMid, _quat, _scale);
      this.pulses.setMatrixAt(i, _mat4);
    }
    this.pulses.instanceMatrix.needsUpdate = true;

    // Camera preset smooth transitions (cancel automatically on user drag)
    if (this.activePreset) {
      if (this.activePreset === "overview") {
        _vCamTargetPos.set(5.4, 3.3, 5.7);
        _vCamTargetLook.set(0, -0.55, 0);
      } else if (this.activePreset === "satellite") {
        // Follow just behind and slightly above the satellite
        _vCamTargetPos.copy(_vSat).multiplyScalar(1.42);
        _vCamTargetPos.y += 0.65;
        _vCamTargetLook.copy(_vSat).multiplyScalar(0.75);
      } else if (this.activePreset === "limb") {
        // Low atmospheric limb framing showing Fresnel scattering halo & swath beam
        _vCamTargetPos.set(3.4, 1.25, 3.8);
        _vCamTargetLook.set(0.4, -0.2, 0.2);
      }
      this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, _vCamTargetPos.x, 4.5, dt);
      this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, _vCamTargetPos.y, 4.5, dt);
      this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, _vCamTargetPos.z, 4.5, dt);
      this.controls.target.x = THREE.MathUtils.damp(this.controls.target.x, _vCamTargetLook.x, 5.0, dt);
      this.controls.target.y = THREE.MathUtils.damp(this.controls.target.y, _vCamTargetLook.y, 5.0, dt);
      this.controls.target.z = THREE.MathUtils.damp(this.controls.target.z, _vCamTargetLook.z, 5.0, dt);

      if (
        this.activePreset !== "satellite" &&
        this.camera.position.distanceTo(_vCamTargetPos) < 0.04
      ) {
        this.activePreset = null;
      }
    }
  }

  private afterDraw(cb: () => void): void {
    const gl = this.renderer.getContext() as WebGL2RenderingContext;
    if (typeof gl.fenceSync !== "function") {
      this.frameId = window.setTimeout(cb, 80);
      return;
    }
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    const poll = () => {
      if (this.disposed) {
        if (sync) gl.deleteSync(sync);
        return;
      }
      const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (state === gl.UNSIGNALED) {
        this.frameId = window.setTimeout(poll, 5);
      } else {
        if (sync) gl.deleteSync(sync);
        this.frameId = window.setTimeout(cb, 80);
      }
    };
    this.frameId = window.setTimeout(poll, 5);
  }

  private tick = (): void => {
    if (this.disposed) return;
    const now = performance.now();
    const dt = Math.min((now - this.lastTimeMs) / 1000, 0.08);
    this.lastTimeMs = now;
    const elapsed = (now - this.startTimeMs) / 1000;

    this.updateOrbitAndBeam(dt, elapsed);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    if (this.isSoftwareGl) {
      this.afterDraw(this.tick);
    } else {
      this.frameId = requestAnimationFrame(this.tick);
    }
  };

  public dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.frameId);
    clearTimeout(this.frameId);
    this.resizeObserver.disconnect();
    this.controls.dispose();
    this.renderer.domElement.removeEventListener("webglcontextlost", this.onContextLostBound);

    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
        obj.geometry?.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) {
          if (!m) continue;
          if ("map" in m && m.map instanceof THREE.Texture) m.map.dispose();
          m.dispose();
        }
      }
    });

    Object.values(this.earthTextures).forEach((t) => t.dispose());
    this.scene.environment?.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
