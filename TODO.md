# To do

## Movement videos (12 clips: 6 movements x standing/seated) - all 12 done

Tools that work (logged in, in the Chrome with the Claude extension):
- **Kling**: Video 3.0, 720p, 5 s, audio off = 30 credits; free 66 credits/day -> 2 clips/day
- **Dreamina**: First and last frames, Seedance 1.5 Pro = 100 credits (first clip on Seedance 2.0 Mini was free)
- **Hailuo (hailuoai.video)**: mode 首/尾帧 -> model Hailuo 2.0, 768p, 6 s = 25 credits (Seedance 2.0 Mini on Dreamina now needs a subscription)
- **Vidu**: Image to Video, Frame 1 + Frame 2, Vidu Q3 (one free trial used; 20 credits left)
- Luma / PixVerse / Pika: sign in inside that same Chrome first
- Chrome asks where to save each download; turning that off lets clips land straight in `D:/desktop/NZ/Semester2/CSMAX570/prototype`

Settings: Video 3.0 · 720p · 5 s · Native Audio **off** (30 credits). Start frame = end frame. Prompts in `kling-inputs/README.md`.
After downloading: `python tools/prepare_clip.py <download.mp4> <name>` (add `--fix-red-hands` if palms look too red).
The tool also smooths the loop join and updates `clips/index.json`.

- [x] `tui-standing` (2026-09-26)
- [x] `tui-seated` (2026-09-26) — red palms colour-corrected with `--fix-red-hands`
- [x] `kowhai-standing` (Dreamina Seedance 2.0 Mini, 2026-09-27)
- [x] `kowhai-seated` (Dreamina Seedance 1.5 Pro, 2026-09-27)
- [x] `piwakawaka-standing` (Hailuo 2.0, first/last frame, 2026-09-27; the Kling copy got stuck in "Creating" and is not needed)
- [x] `piwakawaka-seated` (Dreamina Seedance 2.0 Mini, free reward use, 2026-09-27)
- [x] `ponga-standing` (Hailuo 2.0, 2026-09-27)
- [x] `ponga-seated` (Hailuo 2.0, 2026-09-27)
- [x] `harakeke-standing` (Dreamina Seedance 1.5 Pro, 2026-09-27)
- [x] `harakeke-seated` (Dreamina Seedance 2.0 Mini, free reward use, 2026-09-27)
- [x] `kereru-standing` (Vidu Q3 free trial, first/last frame, 2026-09-27; the Hailuo try skipped the ear-cup)
- [x] `kereru-seated` (Hailuo 2.0, 2026-09-27)
- [ ] Optional: remove the Kling watermark by upgrading the plan (currently kept)

## Report updates (the game now differs from the First Prototype Report)

- [ ] Tokens: 5 per 15 s of moving + 10 for the first song of the day (report says 1 / 2 / 3 bands)
- [ ] No separate "arms & hands only" option; standing and seated are shown side by side instead
- [ ] Waiata Hands / Poi Pathways draft cards are no longer shown in the game
- [ ] Garden: players unlock items with tokens and drag them anywhere in the picture; summer and winter are two different gardens
- [ ] Movement demos are AI-generated clips (Kling, Dreamina, Hailuo, Vidu) with watermarks kept

## Deployment

- [ ] Netlify site https://fancy-haupia-09e8b1.netlify.app is still Private: click **Make public** (and optionally rename it)
- To update: rebuild `../shared-garden-deploy` and drop it on the site's Deploys page

## Camera

- [ ] Try the motion threshold (`MOVING_LEVEL = 2.5` in `app.js`) with a real webcam in normal room light; raise it if leaves grow while sitting still, lower it if gentle moves are missed
- [ ] Report: camera now gives leaves (effort picture) but never tokens; asked once before the first song
