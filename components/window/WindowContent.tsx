"use client";

import type { ReactNode } from "react";
import { AboutPanel } from "@/components/Panels/AboutPanel";
import { BlogPanel } from "@/components/Panels/BlogPanel";
import { ContactPanel } from "@/components/Panels/ContactPanel";
import { ExperiencePanel } from "@/components/Panels/ExperiencePanel";
import { ProjectsPanel } from "@/components/Panels/ProjectsPanel";
import { Terminal } from "@/components/Terminal";
import type { AppWindowId } from "@/lib/windowTypes";
import type { WindowId } from "@/lib/windowTypes";

type WindowContentProps = {
  id: WindowId;
  maximized: boolean;
  focusedApp: AppWindowId | null;
  onOpenApp: (id: AppWindowId) => void;
};

export function WindowContent({
  id,
  maximized,
  focusedApp,
  onOpenApp,
}: WindowContentProps) {
  if (id === "terminal") {
    return (
      <Terminal
        maximized={maximized}
        focusedApp={focusedApp}
        onOpenApp={onOpenApp}
      />
    );
  }

  return (
    <div className="panel-scroll h-full p-4 font-sans">
      <PanelForApp id={id} />
    </div>
  );
}

function PanelForApp({ id }: { id: AppWindowId }) {
  const panels: Record<AppWindowId, ReactNode> = {
    about: <AboutPanel />,
    projects: <ProjectsPanel />,
    blog: <BlogPanel />,
    experience: <ExperiencePanel />,
    contact: <ContactPanel />,
  };
  return panels[id];
}
