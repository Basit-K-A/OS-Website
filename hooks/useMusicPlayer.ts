"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildPlaybackQueue,
  formatTrackTitle,
  trackUrl,
} from "@/config/playlist";

export function useMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<string[]>(buildPlaybackQueue());
  const trackIndexRef = useRef(0);

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.10);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const queue = queueRef.current;
  const currentTrack = queue[trackIndex] ?? queue[0];
  const currentTitle = useMemo(
    () => (currentTrack ? formatTrackTitle(currentTrack) : ""),
    [currentTrack],
  );

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      await audio.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
      return true;
    } catch {
      setAutoplayBlocked(true);
      setIsPlaying(false);
      return false;
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
      return;
    }
    await play();
  }, [isPlaying, pause, play]);

  const loadTrackAtIndex = useCallback(
    (index: number, autoplay = true) => {
      const audio = audioRef.current;
      const track = queueRef.current[index];
      if (!audio || !track) return;

      trackIndexRef.current = index;
      setTrackIndex(index);
      audio.src = trackUrl(track);
      audio.load();
      setProgress(0);
      setDuration(0);

      if (autoplay) {
        void play();
      }
    },
    [play],
  );

  const nextRef = useRef(() => {});
  nextRef.current = () => {
    const nextIndex = (trackIndexRef.current + 1) % queueRef.current.length;
    loadTrackAtIndex(nextIndex);
  };

  const next = useCallback(() => {
    nextRef.current();
  }, []);

  const previous = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    const prevIndex =
      (trackIndexRef.current - 1 + queueRef.current.length) %
      queueRef.current.length;
    loadTrackAtIndex(prevIndex);
  }, [loadTrackAtIndex]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => nextRef.current();
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    audio.src = trackUrl(queueRef.current[0]);
    audio.load();
    void play();

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!autoplayBlocked) return;

    const unlock = () => {
      void play();
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [autoplayBlocked, play]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setProgress(time);
  }, []);

  return {
    currentTitle,
    currentTrack,
    trackIndex,
    queueLength: queue.length,
    isPlaying,
    progress,
    duration,
    volume,
    autoplayBlocked,
    setVolume,
    toggle,
    play,
    pause,
    next,
    previous,
    seek,
  };
}

export type MusicPlayerState = ReturnType<typeof useMusicPlayer>;
