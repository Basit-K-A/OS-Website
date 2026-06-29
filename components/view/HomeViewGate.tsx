"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  isMobileViewport,
  nonDesktopHomeHref,
  prefersDesktopView,
  setDesktopViewPreference,
} from "@/lib/viewMode";

type HomeViewGateProps = {
  children: ReactNode;
};

function HomeViewGateInner({ children }: HomeViewGateProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDesktop, setShowDesktop] = useState(false);

  useEffect(() => {
    if (searchParams.get("desktop") === "1") {
      setDesktopViewPreference();
    }

    if (isMobileViewport() && !prefersDesktopView()) {
      router.replace(nonDesktopHomeHref);
      return;
    }

    setShowDesktop(true);
  }, [router, searchParams]);

  if (!showDesktop) return null;

  return <>{children}</>;
}

export function HomeViewGate({ children }: HomeViewGateProps) {
  return <HomeViewGateInner>{children}</HomeViewGateInner>;
}
