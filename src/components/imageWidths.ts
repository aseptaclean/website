// Responsive-srcset width clamp.
//
// WHY THIS EXISTS. Every component below declares a fixed `widths` ladder sized for the assets
// that happened to be in the repository when it was written — the stock and Commons files, all
// of which are 1920px wide or wider. The 2026-09-05 owner image package is smaller: its hero
// masters are 1672x941 and the window-track detail is 1448x1086, and the founder portrait is
// 1152x1536. A fixed 1920 rung against a 1672px master asks the image service to invent 248px of
// detail that does not exist, which is upscaling — it costs bytes and returns a softer image.
//
// So the ladder is clamped to the source instead of the source being stretched to the ladder:
// drop every rung wider than the master, then append the master's own width when the ladder
// stops short of it, so a wide display still gets full native resolution and never more.
//
// Landscape assets whose masters are wider than every rung (the existing 1920px+ files) come
// back unchanged, so this is a no-op for everything that shipped before the package.
import type { ImageMetadata } from "astro";

export const srcsetWidths = (
  image: ImageMetadata,
  requested: readonly number[]
): number[] => {
  const intrinsic = image.width;
  const fitted = requested.filter((width) => width <= intrinsic);

  // A master narrower than the smallest rung still needs one entry, and a master wider than the
  // widest kept rung gets its own so the top of the ladder is native rather than truncated.
  if (fitted.length === 0 || fitted[fitted.length - 1]! < intrinsic) {
    fitted.push(intrinsic);
  }

  return fitted;
};
