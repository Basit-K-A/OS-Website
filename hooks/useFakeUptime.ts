"use client";

import { useEffect, useState } from "react";

function formatUptime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

export function useFakeUptime() {
  const [uptime, setUptime] = useState("0h 0m 0s");

  useEffect(() => {
    const start = Date.now();
    const tick = () => setUptime(formatUptime(Date.now() - start));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return uptime;
}
