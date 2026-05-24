export const MUSIC_FOLDER = "/Music";

/** First track on load; remaining tracks play in shuffled order. */
export const START_TRACK = "01. Dearly Beloved.mp3";

export const PLAYLIST = [
  "01. Dearly Beloved.mp3",
  "10. Kairi.mp3",
  "13. Roxas.mp3",
  "14. Sora.mp3",
  "15. The Afternoon Streets.mp3",
  "16. Working Together.mp3",
  "17. Friends in My Heart.mp3",
] as const;

export type TrackFilename = (typeof PLAYLIST)[number];

export function trackUrl(filename: string): string {
  return `${MUSIC_FOLDER}/${encodeURIComponent(filename)}`;
}

export function formatTrackTitle(filename: string): string {
  return filename.replace(/^\d+\.\s*/, "").replace(/\.mp3$/i, "");
}

export function buildPlaybackQueue(): string[] {
  const rest = PLAYLIST.filter((track) => track !== START_TRACK);
  const shuffled = [...rest];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return [START_TRACK, ...shuffled];
}
