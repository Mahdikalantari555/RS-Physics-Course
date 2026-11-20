// Empty entry module used by Nitro's unused server-build stage during static
// builds (`NITRO_PRESET=static` / `NITRO_PRESET=github-pages`) so Vite 8 does
// not fall back to `index.html` as an SSR input.
export default {};
