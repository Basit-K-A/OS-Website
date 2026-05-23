"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

export function useClock() {
  const [time, setTime] = useState("--:-- --");
  const [date, setDate] = useState("—");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(formatTime(now));
      setDate(formatDate(now));
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return { time, date };
}
