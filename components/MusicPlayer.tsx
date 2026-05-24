"use client";

import type { ReactNode } from "react";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

function IconPrev() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
    </svg>
  );
}

function IconNext() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M6 18l8.5-6L6 6v12zm2-12v12h2V6H8zm8 0h2v12h-2V6z" />
    </svg>
  );
}

export function MusicPlayer() {
  const player = useMusicPlayer();

  return (
    <aside
      className="music-player panel-glass pointer-events-auto fixed bottom-10 left-3 z-[900] w-[min(18rem,calc(100vw-1.5rem))] font-mono text-[11px] text-gray-300"
      aria-label="Music player"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-2.5 py-1.5">
        <span className="text-[var(--color-accent-pink)]">♪ mpd</span>
        <span className="truncate text-[10px] text-gray-500">
          {player.autoplayBlocked ? "click to start" : "shuffle · on"}
        </span>
      </div>

      <div className="space-y-2 px-2.5 py-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-500">
            now playing
          </p>
          <p className="truncate text-sm text-[var(--color-accent)]">
            {player.currentTitle}
          </p>
          <p className="text-[10px] text-gray-500">
            {player.trackIndex + 1} / {player.queueLength}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={player.duration || 0}
            step={0.1}
            value={player.progress}
            onChange={(e) => player.seek(Number(e.target.value))}
            className="music-range h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/10"
            aria-label="Seek"
          />
          <span className="shrink-0 text-[10px] tabular-nums text-gray-500">
            {formatTime(player.progress)} / {formatTime(player.duration)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <ControlButton label="Previous track" onClick={player.previous}>
              <IconPrev />
            </ControlButton>
            <ControlButton
              label={player.isPlaying ? "Pause" : "Play"}
              onClick={() => void player.toggle()}
              primary
            >
              {player.isPlaying ? <IconPause /> : <IconPlay />}
            </ControlButton>
            <ControlButton label="Next track" onClick={player.next}>
              <IconNext />
            </ControlButton>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <span className="text-[10px] text-gray-500">vol</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={player.volume}
              onChange={(e) => player.setVolume(Number(e.target.value))}
              className="music-range h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-white/10"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

function ControlButton({
  label,
  onClick,
  primary = false,
  children,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-7 w-7 items-center justify-center rounded transition ${
        primary
          ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/30"
          : "text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
