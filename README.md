# Be There, From Anywhere — telepresence-kerala

> **A call can be missed. Your presence shouldn’t be.**

Marketing + interactive demo website for a small, moving telepresence robot that helps
families abroad see, talk to, and stay close to their loved ones in Kerala.
Built from `Webiste-des (1).txt`. All robot/home/video/movement is **simulated** —
no backend, no real recording by default.

## Stack

Next.js 16 App Router (static export) + React 19 + Tailwind 4 + framer-motion +
lucide-react + three / react-three-fiber (robot island only) + Noto Sans Malayalam.
Tests: Playwright (chromium + mobile) against the production static build in `out/`.

## Run

```bash
npm install
npm run dev -- --port 3100   # port 3000 may be taken by other local bots
npm run build                # static export → out/
npx serve out -l 3100        # preview production build
```

## Build → Review → Test loop (used for every wave)

```bash
npm run typecheck   # tsc --noEmit
npm run lint
npm run build
npx playwright test # 24 tests: 12 specs × chromium + mobile
```

Evidence: **24/24 green** (desktop + Pixel 7). CI (`.github/workflows/ci.yml`)
repeats typecheck + lint + build + Playwright on every push.

## Deploy on Vercel (telepresence-kerala.vercel.app)

1. Vercel → Add New → Project → Import `muhammedrinshidvpr-coder/telepresence-kerala`.
2. Framework Preset: Next.js (default zero-config).
3. **Output Directory: Leave default (`.next`)**. Do not override to `out`, as Vercel's Next.js builder automatically handles the output and routes manifest.
4. Deploy. Every push to `master` redeploys automatically; every PR gets a preview URL.
5. Optional: Settings → Git → Deploy Hooks → create hook for `master` to trigger rebuilds on demand (`POST` the hook URL). Never commit hook URLs or tokens.

## Homepage order (per spec §10)

1. Hero split-scene (GCC / Kerala, robot light on gently)
2. Distance journey (7 GCC cities, slider, `Be there now`)
3. Robot reveal (procedural 3D, 9 hotspots, Day/Night/Charging, front/side/rear)
4. Take Control home sim (joystick + arrows + `Talk/Check in/Return to dock`,
   Malayalam greeting `അമ്മേ, ദുബായിൽ നിന്ന് മകൻ വിളിക്കുന്നു.`)
5. Everyday moments (5 use cases) + Before/After + 6-scene story
6. Mobility lab (7 obstacles + `Path blocked → Retry/Reverse/Dock` fail-safe)
7. Malayalam-first phrases + language selector
8. Privacy 3 states (Available / Privacy / Docked) + trust list
9. 60-second demo (`?demoFast=1` compresses it for tests) + How-it-works + CTA

## Copy guardrails (enforced by `00-smoke` test)

Never claim: `secure WebRTC`, `2MFA`, `secure cloud operations`, medical-emergency
use, stair climbing. Privacy line is always:
`Designed with privacy-first access controls and secure communication.`
