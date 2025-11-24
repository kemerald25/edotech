"use client";

import { useState } from "react";
import { ResourceItem, Project } from "@/types/content";
import { ResourceLibrary } from "./resource-library";
import { ProjectsGallery } from "./projects-gallery";

type Props = {
  resources: ResourceItem[];
  projects: Project[];
};

const tabs = [
  { id: "resources", label: "Resources" },
  { id: "projects", label: "Projects" },
];

export function ResourceTabs({ resources, projects }: Props) {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("resources");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-ring focus-visible:ring-offset-0 ${
              active === tab.id
                ? "border-secondary/80 bg-secondary/20 text-secondary"
                : "border-white/10 text-white hover:border-secondary/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {active === "resources" ? (
        <ResourceLibrary items={resources} />
      ) : (
        <ProjectsGallery projects={projects} />
      )}
    </div>
  );
}


