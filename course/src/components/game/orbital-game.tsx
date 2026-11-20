import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { Formula } from "@/components/course/formula";
import {
  computeTelemetry,
  getMission,
  MISSIONS,
  type GameParams,
  type LensMode,
  type MissionId,
} from "@/game/physics";
import { OrbitalSceneController, type CameraPreset } from "@/game/orbital-scene";
import { useProgress } from "@/lib/progress";

const LENS_OPTIONS: { id: LensMode; label: string }[] = [
  { id: "rgb", label: "مرئی RGB" },
  { id: "nir", label: "رنگ کاذب NIR" },
  { id: "thermal", label: "حرارتی TIR" },
];

const CAMERA_OPTIONS: { id: CameraPreset; label: string }[] = [
  { id: "overview", label: "نمای مدار" },
  { id: "satellite", label: "نمای ماهواره" },
  { id: "limb", label: "افق جو" },
];

type DockTab = "controls" | "mission";

export default function OrbitalGame() {
  const { data, ready, markMission } = useProgress();
  const [missionId, setMissionId] = useState<MissionId>("atmosphere-window");
  const mission = useMemo(() => getMission(missionId), [missionId]);

  const [params, setParams] = useState<GameParams>(() => ({ ...mission.initialParams }));
  const [dockOpen, setDockOpen] = useState(true);
  const [dockTab, setDockTab] = useState<DockTab>("mission");
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>("overview");
  const [paused, setPaused] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);
  const [showMathCheck, setShowMathCheck] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [mathSubmitted, setMathSubmitted] = useState(false);
  const [webglError, setWebglError] = useState(false);

  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<OrbitalSceneController | null>(null);
  const initialParamsRef = useRef<GameParams>(params);

  const telemetry = useMemo(() => computeTelemetry(params), [params]);
  const checks = useMemo(() => mission.evaluate(params, telemetry), [mission, params, telemetry]);
  const allChecksPassed = checks.length > 0 && checks.every((c) => c.passed);

  const completedCount = useMemo(
    () => MISSIONS.filter((m) => m.id !== "sandbox" && ready && data.missions[m.id]).length,
    [data.missions, ready],
  );
  const totalScoredMissions = MISSIONS.length - 1;

  // Mount Three.js controller once inside dedicated ref container
  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;
    try {
      const ctrl = new OrbitalSceneController(mount, initialParamsRef.current, () => {
        setWebglError(true);
      });
      controllerRef.current = ctrl;
      return () => {
        ctrl.dispose();
        controllerRef.current = null;
      };
    } catch {
      setWebglError(true);
      return undefined;
    }
  }, []);

  // Push parameter updates smoothly without recreating the WebGL canvas
  useEffect(() => {
    controllerRef.current?.setParams(params);
  }, [params]);

  // Sync target marker when mission changes
  useEffect(() => {
    controllerRef.current?.setTargetLocation(mission.targetLatDeg, mission.targetLonDeg);
  }, [mission.targetLatDeg, mission.targetLonDeg]);

  // Keyboard shortcut `H` to collapse/expand bottom control dock (Zen mode)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "h" || e.key === "H") {
        setDockOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setShowFormulas(false);
        setShowMathCheck(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selectMission = useCallback((id: MissionId) => {
    const next = getMission(id);
    setMissionId(id);
    setParams({ ...next.initialParams });
    setSelectedChoice(null);
    setMathSubmitted(false);
    setShowMathCheck(false);
    setDockTab(id === "sandbox" ? "controls" : "mission");
    setDockOpen(true);
  }, []);

  const handleCameraPreset = useCallback((preset: CameraPreset) => {
    setCameraPreset(preset);
    controllerRef.current?.setCameraPreset(preset);
  }, []);

  const handleTogglePause = useCallback(() => {
    setPaused((prev) => {
      const next = !prev;
      controllerRef.current?.setPaused(next);
      return next;
    });
  }, []);

  const handleResetMission = useCallback(() => {
    setParams({ ...mission.initialParams });
    setSelectedChoice(null);
    setMathSubmitted(false);
    handleCameraPreset("overview");
  }, [mission.initialParams, handleCameraPreset]);

  const updateParam = useCallback(
    <K extends keyof GameParams>(key: K, value: GameParams[K]) => {
      setParams((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleSubmitMath = useCallback(() => {
    if (selectedChoice === null || !mission.mathCheck) return;
    setMathSubmitted(true);
    if (selectedChoice === mission.mathCheck.answerIndex) {
      markMission(mission.id);
    }
  }, [selectedChoice, mission.mathCheck, mission.id, markMission]);

  const nextMission = useMemo(() => {
    const idx = MISSIONS.findIndex((m) => m.id === missionId);
    if (idx < 0 || idx >= MISSIONS.length - 1) return null;
    return MISSIONS[idx + 1];
  }, [missionId]);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0b1018] text-[#f3eee6]"
      style={{ height: "calc(100dvh - 73px)", minHeight: "620px" }}
    >
      {/* Dedicated isolated WebGL canvas container */}
      <div
        ref={canvasMountRef}
        className="absolute inset-0 h-full w-full"
        aria-label="صحنه سه‌بعدی مدار ماهواره و سنجش از دور"
      />

      {webglError ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0b1018] p-6 text-center">
          <div className="max-w-md rounded-2xl border border-white/15 bg-[#151b26] p-6">
            <h2 className="text-lg font-semibold">امکان اجرای WebGL در این مرورگر نیست</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#c6c0b6]">
              مرورگر یا دستگاه فعلی شتاب‌دهنده‌ی سه‌بعدی WebGL را در اختیار ندارد. می‌توانید از بخش آزمایشگاه‌های دوبعدی دوره استفاده کنید.
            </p>
          </div>
        </div>
      ) : null}

      {/* Compact Top Overlay Bar — zero backdrop-blur over WebGL */}
      <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-5">
        {/* Mission selector tabs */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1 rounded-xl border border-white/15 bg-[#121722]/92 p-1">
          {MISSIONS.map((m) => {
            const active = m.id === missionId;
            const done = m.id !== "sandbox" && ready && Boolean(data.missions[m.id]);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => selectMission(m.id)}
                className={
                  "inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-xs font-medium transition-colors sm:text-sm " +
                  (active
                    ? "bg-[#f3eee6] text-[#1c1915]"
                    : "text-[#d4cec4] hover:bg-white/10 hover:text-white")
                }
              >
                {done ? <Check className="size-3.5 text-[#1f6b4a]" /> : null}
                <span>{m.shortTitle}</span>
              </button>
            );
          })}
          <span className="hidden px-2.5 text-xs text-[#9fa8b8] tabular-nums md:inline">
            تکمیل: {completedCount} / {totalScoredMissions}
          </span>
        </div>

        {/* Camera & Utility Bar */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 rounded-xl border border-white/15 bg-[#121722]/92 p-1">
          {CAMERA_OPTIONS.map((cam) => (
            <button
              key={cam.id}
              type="button"
              onClick={() => handleCameraPreset(cam.id)}
              className={
                "inline-flex min-h-9 items-center gap-1 whitespace-nowrap rounded-lg px-2.5 text-xs transition-colors " +
                (cameraPreset === cam.id
                  ? "bg-[#1f6b4a] text-white"
                  : "text-[#c8cfd8] hover:bg-white/10 hover:text-white")
              }
            >
              <Eye className="size-3.5" />
              <span className="hidden sm:inline">{cam.label}</span>
            </button>
          ))}

          <span className="h-5 w-px bg-white/15" aria-hidden="true" />

          <button
            type="button"
            onClick={handleTogglePause}
            aria-label={paused ? "ادامه حرکت مدار" : "توقف حرکت مدار"}
            className="inline-flex min-h-9 items-center gap-1 whitespace-nowrap rounded-lg px-2.5 text-xs text-[#c8cfd8] hover:bg-white/10 hover:text-white"
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            <span className="hidden md:inline">{paused ? "ادامه" : "مکث"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowFormulas((v) => !v)}
            className={
              "inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-xs font-medium transition-colors " +
              (showFormulas
                ? "bg-[#b4532a] text-white"
                : "bg-white/10 text-[#f3eee6] hover:bg-white/18")
            }
          >
            <BookOpen className="size-3.5" />
            <span>فرمول‌های این مأموریت</span>
          </button>
        </div>
      </div>

      {/* Unified Collapsible Bottom Control Dock (Zero Mid-Viewport Occlusion) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center px-3 sm:px-5">
        <div
          className="w-full max-w-[980px] transition-transform duration-300"
          style={{
            transform: dockOpen ? "translateY(0)" : "translateY(calc(100% - 40px))",
          }}
        >
          {/* Collapse / Expand Handle */}
          <div className="mb-1.5 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setDockOpen((v) => !v)}
              className="pointer-events-auto inline-flex min-h-9 items-center gap-1.5 rounded-t-xl border border-b-0 border-white/15 bg-[#121722]/94 px-4 text-xs font-medium text-[#e6dfd4] hover:bg-[#1a2232]"
            >
              {dockOpen ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
              <span>{dockOpen ? "پنهان کردن کنترل‌ها (H)" : "نمایش کنترل‌ها و تله‌متری (H)"}</span>
            </button>
          </div>

          {/* Main Dock Body */}
          <div className="pointer-events-auto rounded-2xl border border-white/15 bg-[#121722]/95 p-3.5 shadow-2xl sm:p-4">
          {/* Dock Header: Live Telemetry Strip + Mode Switch */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-1 rounded-lg bg-white/8 p-1">
              {mission.id !== "sandbox" ? (
                <button
                  type="button"
                  onClick={() => setDockTab("mission")}
                  className={
                    "inline-flex min-h-8 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-xs font-medium transition-colors " +
                    (dockTab === "mission"
                      ? "bg-[#f3eee6] text-[#1c1915]"
                      : "text-[#c8cfd8] hover:text-white")
                  }
                >
                  <Target className="size-3.5" />
                  <span>اهداف مأموریت</span>
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setDockTab("controls")}
                className={
                  "inline-flex min-h-8 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-xs font-medium transition-colors " +
                  (dockTab === "controls"
                    ? "bg-[#f3eee6] text-[#1c1915]"
                    : "text-[#c8cfd8] hover:text-white")
                }
              >
                <span>تنظیم مدار و سنجنده</span>
              </button>
            </div>

            {/* Compact Live Physics Readout (Tabular Numerals) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tabular-nums">
              <MetricChip
                label="عبور جو T"
                value={`${Math.round(telemetry.atmo.transmittance * 100)}٪`}
                tone={telemetry.atmo.transmittance >= 0.7 ? "good" : telemetry.atmo.transmittance < 0.35 ? "warn" : "neutral"}
              />
              <MetricChip
                label="غبار مسیر"
                value={`${Math.round(telemetry.atmo.pathHaze * 100)}٪`}
                tone={telemetry.atmo.pathHaze <= 0.2 ? "good" : "neutral"}
              />
              <MetricChip
                label="پیکسل GSD"
                value={`${telemetry.orbit.gsdMeters.toFixed(1)} m`}
              />
              <MetricChip
                label="جاروب"
                value={`${Math.round(telemetry.orbit.swathKm)} km`}
              />
              <MetricChip
                label="دوره کپلر"
                value={`${telemetry.orbit.periodMin.toFixed(1)} min`}
              />
              <MetricChip
                label="فوتون E"
                value={`${telemetry.atmo.photonEnergyEv.toFixed(2)} eV`}
              />
            </div>

            <button
              type="button"
              onClick={handleResetMission}
              className="inline-flex min-h-8 items-center gap-1 whitespace-nowrap rounded-lg border border-white/12 px-2.5 text-xs text-[#c8cfd8] hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="size-3.5" />
              <span>بازنشانی</span>
            </button>
          </div>

          {/* Tab 1: Mission Objectives + Quick Tuning */}
          {dockTab === "mission" && mission.id !== "sandbox" ? (
            <div className="mt-3 grid gap-3 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium text-[#6ee7b7]">{mission.targetLocationLabel}</p>
                <h2 className="mt-0.5 text-sm font-semibold text-white sm:text-base">{mission.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-[#c6ceda]">{mission.brief}</p>

                {/* Primary slider shortcut right in mission tab for zero-friction play */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDockTab("controls")}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/8 px-3 text-xs font-medium text-white hover:bg-white/15"
                  >
                    <span>باز کردن اسلایدرهای تنظیم</span>
                  </button>
                  {allChecksPassed && mission.mathCheck ? (
                    <button
                      type="button"
                      onClick={() => setShowMathCheck(true)}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-[#1f6b4a] px-3.5 text-xs font-semibold text-white hover:bg-[#247c56]"
                    >
                      <Sparkles className="size-3.5" />
                      <span>تایید و آزمون کوتاه ریاضی</span>
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Objective Status Rows (explicit text labels, never hue-only) */}
              <div className="grid gap-2 sm:grid-cols-3 lg:col-span-7">
                {checks.map((chk) => (
                  <div
                    key={chk.id}
                    className={
                      "rounded-xl border px-3 py-2.5 " +
                      (chk.passed
                        ? "border-[#1f6b4a]/70 bg-[#1f6b4a]/18"
                        : "border-white/12 bg-white/5")
                    }
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-medium text-[#e8e3da]">{chk.label}</span>
                      <span
                        className={
                          "whitespace-nowrap text-[11px] font-semibold " +
                          (chk.passed ? "text-[#6ee7b7]" : "text-[#fbbf24]")
                        }
                      >
                        {chk.passed ? "تایید شد" : "نیاز به تنظیم"}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-baseline justify-between gap-2 text-xs tabular-nums">
                      <span className="text-base font-semibold text-white">{chk.currentText}</span>
                      <span className="text-[#9fa8b8]">هدف: {chk.targetText}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Tab 2: Full Interactive Orbit, Wavelength & Sensor Controls */
            <div className="mt-3 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <SliderControl
                  label="طول‌موج سنجنده (λ)"
                  valueText={`${params.wavelengthUm.toFixed(2)} μm · ${telemetry.atmo.bandCode}`}
                  min={0.4}
                  max={12.5}
                  step={0.05}
                  value={params.wavelengthUm}
                  onChange={(v) => updateParam("wavelengthUm", v)}
                />
                <SliderControl
                  label="ارتفاع مدار (H)"
                  valueText={`${Math.round(params.altitudeKm)} km`}
                  min={350}
                  max={1500}
                  step={10}
                  value={params.altitudeKm}
                  onChange={(v) => updateParam("altitudeKm", v)}
                />
                <SliderControl
                  label="میدان دید لحظه‌ای (IFOV)"
                  valueText={`${params.ifovMrad.toFixed(3)} mrad`}
                  min={0.008}
                  max={0.05}
                  step={0.001}
                  value={params.ifovMrad}
                  onChange={(v) => updateParam("ifovMrad", v)}
                />
                <SliderControl
                  label="نیم‌زاویه‌ی جاروب (α)"
                  valueText={`${params.halfFovDeg.toFixed(0)}°`}
                  min={4}
                  max={24}
                  step={1}
                  value={params.halfFovDeg}
                  onChange={(v) => updateParam("halfFovDeg", v)}
                />
              </div>

              {/* Second Row: Lens Mode + Quick Band Presets + Sandbox Atmosphere Sliders */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#9fa8b8]">لنز سنجنده:</span>
                  <div className="flex items-center gap-1 rounded-lg bg-white/8 p-0.5">
                    {LENS_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateParam("lensMode", opt.id)}
                        className={
                          "min-h-8 whitespace-nowrap rounded-md px-2.5 text-xs font-medium transition-colors " +
                          (params.lensMode === opt.id
                            ? "bg-[#b4532a] text-white"
                            : "text-[#c8cfd8] hover:text-white")
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick physical band buttons */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[#9fa8b8]">پرش به باند:</span>
                  {[
                    { label: "آبی 0.45", v: 0.45 },
                    { label: "NIR 0.84", v: 0.84 },
                    { label: "جذب H₂O 1.38", v: 1.38 },
                    { label: "SWIR 1.60", v: 1.6 },
                    { label: "MWIR 3.85", v: 3.85 },
                    { label: "جذب CO₂ 4.30", v: 4.3 },
                    { label: "TIR 10.8", v: 10.8 },
                  ].map((b) => (
                    <button
                      key={b.label}
                      type="button"
                      onClick={() => updateParam("wavelengthUm", b.v)}
                      className="min-h-7 whitespace-nowrap rounded-md border border-white/12 bg-white/5 px-2 text-[11px] text-[#d4cec4] hover:border-white/30 hover:text-white"
                    >
                      {b.label}
                    </button>
                  ))}
                </div>

                {allChecksPassed && mission.mathCheck ? (
                  <button
                    type="button"
                    onClick={() => setShowMathCheck(true)}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-[#1f6b4a] px-3.5 text-xs font-semibold text-white hover:bg-[#247c56]"
                  >
                    <Sparkles className="size-3.5" />
                    <span>تایید و آزمون کوتاه ریاضی</span>
                  </button>
                ) : null}
              </div>

              {!mission.lockedAtmosphere ? (
                <div className="grid gap-3 border-t border-white/10 pt-2.5 sm:grid-cols-3">
                  <SliderControl
                    label="بخار آب جو (H₂O)"
                    valueText={`${params.waterVapor.toFixed(1)}×`}
                    min={0.3}
                    max={2.4}
                    step={0.1}
                    value={params.waterVapor}
                    onChange={(v) => updateParam("waterVapor", v)}
                  />
                  <SliderControl
                    label="غبار و هواویز (Mie)"
                    valueText={`${params.aerosol.toFixed(1)}×`}
                    min={0.3}
                    max={2.4}
                    step={0.1}
                    value={params.aerosol}
                    onChange={(v) => updateParam("aerosol", v)}
                  />
                  <SliderControl
                    label="زاویه زنیت خورشید (θ)"
                    valueText={`${Math.round(params.sunZenithDeg)}°`}
                    min={10}
                    max={65}
                    step={1}
                    value={params.sunZenithDeg}
                    onChange={(v) => updateParam("sunZenithDeg", v)}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
        </div>
      </div>

      {/* On-Demand Clickable Course Formulas Drawer (Light Parchment Course Style) */}
      {showFormulas ? (
        <div
          className="fixed inset-0 z-30 flex justify-end bg-black/55"
          role="dialog"
          aria-modal="true"
          aria-label="فرمول‌های تعاملی مأموریت"
        >
          <div className="flex h-full w-full max-w-2xl flex-col bg-parchment text-ink shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p className="text-xs font-medium text-cane">رابطه‌های ریاضی همین صحنه‌ی سه‌بعدی</p>
                <h3 className="text-base font-semibold">{mission.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFormulas(false)}
                aria-label="بستن پنل فرمول‌ها"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-card text-ink hover:border-copper"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {mission.formulaIds.map((fid) => (
                <Formula key={fid} id={fid} />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* On-Demand Quantitative Math Check Modal */}
      {showMathCheck && mission.mathCheck ? (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/65 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="آزمون کوتاه ریاضی مأموریت"
        >
          <div className="w-full max-w-xl rounded-2xl border border-line bg-parchment p-5 text-ink shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-cane">مرحله‌ی نهایی · تایید ریاضی</p>
                <h3 className="mt-1 text-lg font-semibold">{mission.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMathCheck(false)}
                aria-label="بستن"
                className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-card text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="mt-4 leading-relaxed text-ink">{mission.mathCheck.prompt}</p>
            <p className="mt-2 rounded-xl border border-line bg-paper px-3.5 py-2 text-xs leading-relaxed text-muted">
              راهنما: {mission.mathCheck.hint}
            </p>

            <div className="mt-4 space-y-2">
              {mission.mathCheck.choices.map((choice, idx) => {
                const picked = selectedChoice === idx;
                const isCorrect = idx === mission.mathCheck?.answerIndex;
                let cls = "border-line bg-card text-ink hover:border-cane";
                if (mathSubmitted) {
                  if (isCorrect) cls = "border-cane bg-cane-soft text-ink font-medium";
                  else if (picked) cls = "border-copper bg-copper-soft text-ink";
                } else if (picked) {
                  cls = "border-ink bg-ink text-parchment";
                }
                return (
                  <button
                    key={choice}
                    type="button"
                    disabled={mathSubmitted}
                    onClick={() => setSelectedChoice(idx)}
                    className={`flex min-h-11 w-full items-center rounded-xl border px-3.5 py-2.5 text-right text-sm transition-colors ${cls}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {mathSubmitted ? (
              <div className="mt-4 rounded-xl border border-line bg-card p-4 text-sm leading-relaxed">
                <p
                  className={
                    "font-semibold " +
                    (selectedChoice === mission.mathCheck.answerIndex ? "text-cane" : "text-copper")
                  }
                >
                  {selectedChoice === mission.mathCheck.answerIndex
                    ? "درست بود! مأموریت با موفقیت ثبت شد."
                    : "پاسخ دقیق نبود — توضیح فیزیکی زیر را ببین و دوباره امتحان کن."}
                </p>
                <p className="mt-1.5 text-ink-soft">{mission.mathCheck.explain}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedChoice !== mission.mathCheck.answerIndex ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMathSubmitted(false);
                        setSelectedChoice(null);
                      }}
                      className="inline-flex min-h-10 items-center rounded-xl border border-line bg-paper px-4 text-sm font-medium text-ink"
                    >
                      تلاش دوباره
                    </button>
                  ) : nextMission ? (
                    <button
                      type="button"
                      onClick={() => selectMission(nextMission.id)}
                      className="inline-flex min-h-10 items-center rounded-xl bg-cane px-4 text-sm font-semibold text-parchment"
                    >
                      رفتن به {nextMission.shortTitle}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setShowMathCheck(false)}
                    className="inline-flex min-h-10 items-center rounded-xl border border-line bg-paper px-4 text-sm text-ink-soft"
                  >
                    برگشت به صحنه سه‌بعدی
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMathCheck(false)}
                  className="inline-flex min-h-10 items-center rounded-xl border border-line bg-paper px-4 text-sm text-ink-soft"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  disabled={selectedChoice === null}
                  onClick={handleSubmitMath}
                  className="inline-flex min-h-10 items-center rounded-xl bg-ink px-5 text-sm font-semibold text-parchment disabled:opacity-45"
                >
                  ثبت پاسخ
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MetricChip({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "good" | "warn" | "neutral";
}) {
  const valColor =
    tone === "good" ? "text-[#6ee7b7]" : tone === "warn" ? "text-[#fbbf24]" : "text-white";
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[#9fa8b8]">{label}:</span>
      <span className={`font-semibold ${valColor}`} dir="ltr">
        {value}
      </span>
    </div>
  );
}

function SliderControl({
  label,
  valueText,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  valueText: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="font-medium text-[#e6dfd4]">{label}</span>
        <span className="font-semibold text-[#7dd3fc] tabular-nums" dir="ltr">
          {valueText}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer accent-[#1f6b4a]"
      />
    </label>
  );
}
