"""Turn a downloaded movement clip into a small, muted, seamless loop for the game.

Usage:
  python tools/prepare_clip.py <downloaded.mp4> <move>-<standing|seated> [--boomerang] [--fix-red-hands]

  --boomerang      play the clip forwards then backwards, so it ends where it starts
                   (use when the tool could not set an end frame).
  --fix-red-hands  calm over-red palms/fingers back towards the face's skin tone.

Every clip also gets its last frames blended into its first ones, so the loop has no visible jump.

Output: assets/instructor/clips/<name>.mp4 (H.264, no audio, max 960 px tall, fast start),
        and assets/instructor/clips/index.json (the list of clips the game will use).
Needs:  pip install imageio-ffmpeg opencv-python-headless numpy
"""
import json
import pathlib
import subprocess
import sys

import cv2
import imageio_ffmpeg
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent.parent
LOOP_BLEND_FRAMES = 8
MAX_HEIGHT = 960


def read_frames(path):
    video = cv2.VideoCapture(str(path))
    fps = video.get(cv2.CAP_PROP_FPS) or 24
    frames = []
    while True:
        ok, frame = video.read()
        if not ok:
            break
        frames.append(frame)
    return frames, fps


def fix_red_hands(frame):
    """Pull strongly saturated reds (AI-tinted palms) towards the natural skin hue of the face."""
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV).astype(np.float32)
    hue, sat, val = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    red = ((hue < 9) | (hue > 170)) & (sat > 110) & (val > 70)
    mask = cv2.GaussianBlur(red.astype(np.float32), (0, 0), 2)
    hue = np.where(hue > 170, hue - 180, hue) * (1 - mask) + 12 * mask
    sat = sat * (1 - mask * .45)
    fixed = np.dstack([np.mod(hue, 180), sat, val]).clip(0, 255).astype(np.uint8)
    return cv2.cvtColor(fixed, cv2.COLOR_HSV2BGR)


def blend_loop(frames, count=LOOP_BLEND_FRAMES):
    """Cross-fade the tail into the head: the clip gets `count` frames shorter and loops without a jump."""
    if len(frames) <= count * 3:
        return frames
    head, body, tail = frames[:count], frames[count:-count], frames[-count:]
    blended = [cv2.addWeighted(t, 1 - (i + 1) / (count + 1), h, (i + 1) / (count + 1), 0)
               for i, (t, h) in enumerate(zip(tail, head))]
    return body + blended


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if len(args) != 2:
        sys.exit(__doc__)
    source, name = pathlib.Path(args[0]), args[1]
    target = ROOT / 'assets' / 'instructor' / 'clips' / f'{name}.mp4'
    target.parent.mkdir(parents=True, exist_ok=True)

    frames, fps = read_frames(source)
    if not frames:
        sys.exit(f'Could not read any frames from {source}')
    if '--fix-red-hands' in sys.argv:
        frames = [fix_red_hands(frame) for frame in frames]
    if '--boomerang' in sys.argv:
        frames = frames + frames[-2:0:-1]
    else:
        frames = blend_loop(frames)

    height, width = frames[0].shape[:2]
    if height > MAX_HEIGHT:
        width, height = round(width * MAX_HEIGHT / height / 2) * 2, MAX_HEIGHT
        frames = [cv2.resize(frame, (width, height), interpolation=cv2.INTER_AREA) for frame in frames]

    encoder = subprocess.Popen([imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-loglevel', 'error',
                                '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{width}x{height}', '-r', str(fps), '-i', '-',
                                '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p',
                                '-movflags', '+faststart', str(target)], stdin=subprocess.PIPE)
    for frame in frames:
        encoder.stdin.write(frame.tobytes())
    encoder.stdin.close()
    if encoder.wait() != 0:
        sys.exit('ffmpeg failed')
    print(f'Saved {target.relative_to(ROOT)} ({target.stat().st_size // 1024} KB, {len(frames)} frames)')

    # The game reads this list to know which movements have a clip.
    names = sorted(clip.stem for clip in target.parent.glob('*.mp4'))
    (target.parent / 'index.json').write_text(json.dumps(names, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
