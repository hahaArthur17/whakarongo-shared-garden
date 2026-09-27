# Movement clips to generate (Kling or Google Veo image-to-video)

12 clips: 6 movements × standing / seated. Each clip starts **and ends** on the same frame so it loops without a jump.

## Progress

| Clip | Status |
|---|---|
| `tui-standing.mp4` | ✅ done (Kling 3.0, 720p) — arms open to about shoulder width |
| `tui-seated.mp4` | ✅ done (Kling 3.0, 720p) — red palms colour-corrected (`--fix-red-hands`) |
| `kowhai-standing.mp4` | done (Dreamina Seedance 2.0 Mini) |
| `kowhai-seated.mp4` | done (Dreamina Seedance 1.5 Pro) |
| `piwakawaka-standing.mp4` | done (Hailuo 2.0, first/last frame) |
| `piwakawaka-seated.mp4` | done (Dreamina Seedance 2.0 Mini) |
| `ponga-standing.mp4`, `ponga-seated.mp4` | done (Hailuo 2.0, first/last frame) |
| `harakeke-standing.mp4` | done (Dreamina Seedance 1.5 Pro), gentle small sway |
| `harakeke-seated.mp4` | done (Dreamina Seedance 2.0 Mini) |
| `kereru-standing.mp4` | done (Vidu Q3, first/last frame) |
| `kereru-seated.mp4` | done (Hailuo 2.0, first/last frame) |

What worked on the free plan: **Video 3.0 · 720p · 5 s · Native Audio OFF** = 30 credits per clip
(66 free credits a day → 2 clips a day; free accounts can run only one generation at a time).
After downloading, run `python tools/prepare_clip.py <download.mp4> <name>` to add it to the game.

## Settings for every clip

- Mode: **Image to Video**, with **start frame** and **end frame**
- Start frame = End frame = the file listed below (same image both times)
- Length: **5 s**
- Negative prompt (paste for all): `camera movement, zoom, pan, shaking, extra arms, extra hands, distorted hands, blur, fast movement, dancing, walking away, text, logo`
- Download the MP4 and save it **with exactly the file name shown** into
  `assets/instructor/clips/` using `tools/prepare_clip.py`, which also updates `clips/index.json` so the game picks it up.

Pose reference images (`ref-*.png`) show the target pose; you can attach them as reference if the tool allows, otherwise just use the prompt.

### Using Google Veo instead (Gemini / Flow)

- Prefer **Google Flow → Frames to Video**: it takes a start **and** end frame, so the clip loops cleanly.
  The Gemini app only takes a start image; its clips will jump when they loop.
- Length is 8 s (fine). Sound is generated but the game plays clips muted.
- Aspect ratio: **9:16 for standing** clips, **16:9 for seated** clips (Veo has no 1:1). The game shows
  clips filling the frame, centred, so the extra background Veo adds at the sides of seated clips is trimmed.
- Same prompts, same negative prompt, same file names.

## Standing (start/end frame: `standing-start-frame.png`)

| Save as | Prompt |
|---|---|
| `tui-standing.mp4` | An older man stands still with both hands on his heart. He slowly and smoothly opens both arms out wide to the sides like bird wings, palms open, holds for a moment, then slowly brings his hands back to his heart. Gentle, calm, steady. Static camera, same background. |
| `kowhai-standing.mp4` | An older man stands still with both hands on his heart. He slowly reaches both arms forward at chest height with palms facing up, holds for a moment, then slowly draws his hands back to his heart. Gentle, calm, steady. Static camera, same background. |
| `piwakawaka-standing.mp4` | An older man stands with both hands on his heart. Keeping one hand on his heart, he slowly reaches the other arm out to his side and gently turns his upper body that way, returns to centre, then does the same to the other side, and returns to hands on heart. Gentle, calm, feet stay in place. Static camera, same background. |
| `ponga-standing.mp4` | An older man stands still with both hands resting on his heart. He takes one slow, deep breath: his chest and shoulders rise gently, then slowly fall as he breathes out, eyes softly relaxed. Very small, calm movement. Static camera, same background. |
| `harakeke-standing.mp4` | An older man stands with both hands on his heart. He gently sways his upper body to one side like flax in a soft breeze, returns to centre, sways to the other side, and returns to centre. Feet stay in place. Slow, calm, steady. Static camera, same background. |
| `kereru-standing.mp4` | An older man stands with both hands on his heart. He slowly lifts one hand to cup his ear as if listening to a bird, keeps the other hand on his heart, holds for a moment, then slowly brings the hand back to his heart. Gentle, calm. Static camera, same background. |

## Seated (start/end frame: `seated-start-frame.png`)

| Save as | Prompt |
|---|---|
| `tui-seated.mp4` | An older man sits upright on a wooden chair with his hands resting on his knees. He slowly and smoothly opens both arms out wide to the sides like bird wings, palms open, holds for a moment, then slowly lowers his hands back to his knees. He stays seated. Gentle, calm, steady. Static camera, same background. |
| `kowhai-seated.mp4` | An older man sits upright on a wooden chair with his hands on his knees. He slowly reaches both arms forward at chest height, holds for a moment, then slowly lowers his hands back to his knees. He stays seated. Gentle, calm, steady. Static camera, same background. |
| `piwakawaka-seated.mp4` | An older man sits upright on a wooden chair with his hands on his knees. He places one hand on his heart and slowly reaches the other arm out to the side, gently turning his upper body, returns to centre, then does the same to the other side, and returns his hands to his knees. He stays seated. Gentle, calm. Static camera, same background. |
| `ponga-seated.mp4` | An older man sits upright on a wooden chair with his hands resting on his knees. He takes one slow, deep breath: his chest and shoulders rise gently, then slowly fall as he breathes out. Very small, calm movement. He stays seated. Static camera, same background. |
| `harakeke-seated.mp4` | An older man sits upright on a wooden chair with his hands on his knees. He gently sways his upper body to one side like flax in a soft breeze, returns to centre, sways to the other side, and returns to centre. He stays seated. Slow, calm. Static camera, same background. |
| `kereru-seated.mp4` | An older man sits upright on a wooden chair with his hands on his knees. He slowly lifts one hand to cup his ear as if listening to a bird, places the other hand on his heart, holds for a moment, then slowly lowers both hands back to his knees. He stays seated. Gentle, calm. Static camera, same background. |

## Checking a clip before saving it

- Hands and arms look natural (no extra fingers or arms)
- He never stands up in a seated clip; feet stay put in a standing clip
- The last second looks like the first second (so the loop is seamless)
- Movement is slow — an older adult should be able to follow it comfortably

These are generic movements named after native species. They are not waiata-ā-ringa or poi, so they do not
reproduce Māori movement forms.
