#!/usr/bin/env bash
# Transcodes the client's camera masters (1080p60 @ ~20 Mbps, 200-300 MB each)
# into web-deliverable background loops. Run from the repo root:
#
#   bash scripts/encode-video.sh
#
# Masters live in media-src/ (gitignored, ~250 MB each) and are NOT deployed —
# only the encoded public/media/ output is. Anything under public/ is copied
# into the build, so the masters must stay out of it.
set -euo pipefail

SRC="media-src"
OUT="public/media"
mkdir -p "$OUT"

# name | source file | start (s) | duration (s)
CLIPS=(
  "hero-office|cosmo 02.mp4|9|20"
  "sterling-dip|sterling.mp4|6|20"
  "perfume-wall|The wall.mp4|6|18"
)

for clip in "${CLIPS[@]}"; do
  IFS='|' read -r name file start dur <<< "$clip"
  echo "=== $name (from $file, ${start}s +${dur}s) ==="

  # H.264 only. VP9 was tried and dropped: at matched quality it encoded ~25x
  # slower and came out larger than x264 here, and H.264 needs no fallback.
  # -an because a muted track is dead weight and autoplay requires muted anyway.
  # yuv420p + faststart so it decodes everywhere and starts before full download.
  for h in 1080 720; do
    w=$(( h * 16 / 9 ))
    case "$h" in
      1080) crf=33 ;;
      720)  crf=31 ;;
    esac

    ffmpeg -v error -stats -ss "$start" -t "$dur" -i "$SRC/$file" \
      -an -vf "fps=30,scale=${w}:${h}:flags=lanczos" \
      -c:v libx264 -profile:v high -crf "$crf" -preset slow \
      -pix_fmt yuv420p -movflags +faststart \
      -y "$OUT/$name-${h}.mp4"
  done

  # Poster is the clip's own first frame, so the swap to video is seamless.
  ffmpeg -v error -ss "$start" -i "$SRC/$file" -frames:v 1 \
    -vf "scale=1920:1080:flags=lanczos" -q:v 4 -y "$OUT/$name-poster.jpg"
done

echo
ls -la "$OUT"
