"use client";

import { useEffect, useRef } from "react";

/**
 * SkillsSphere – 3D rotating tag cloud of skills (TagCloud.js).
 * Install: npm i -S TagCloud   (or: npm i TagCloud --legacy-peer-deps if needed)
 * Add/remove skills: change the `skills` prop array in the parent (e.g. HERO_SKILLS in hero-section.tsx).
 */

const SPHERE_CONTAINER_CLASS = "skills-sphere-tagcloud";
const SPHERE_ITEM_CLASS = "skills-sphere-tagcloud-item";

export type SkillsSphereProps = {
  /** List of skill labels to show on the sphere. Edit this array to add/remove skills. */
  skills: string[];
  /** Radius of the sphere in px. */
  radius?: number;
  /** Max rotation speed: 'slow' | 'normal' | 'fast'. */
  maxSpeed?: "slow" | "normal" | "fast";
  /** Initial rotation speed. */
  initSpeed?: "slow" | "normal" | "fast";
  /** Whether to keep rotating after mouse leaves. */
  keep?: boolean;
  className?: string;
  /** Height of the container div in px. Defaults to 340. */
  containerHeight?: number;
  /** Max width of the container div in px. Defaults to 360. */
  containerMaxWidth?: number;
};

export function SkillsSphere({
  skills,
  radius = 290,
  maxSpeed = "normal",
  initSpeed = "slow",
  keep = true,
  className = "",
  containerHeight = 340,
  containerMaxWidth = 360,
}: SkillsSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<{ destroy: () => void; update: (texts: string[]) => void } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !skills.length) return;

    let mounted = true;

    const init = async () => {
      const TagCloud = (await import("TagCloud")).default as (
        container: HTMLElement,
        texts: string[],
        options: Record<string, unknown>
      ) => { destroy: () => void; update: (texts: string[]) => void };

      if (!mounted || !containerRef.current) return;

      const instance = TagCloud(containerRef.current, skills, {
        radius,
        maxSpeed,
        initSpeed,
        keep,
        direction: 135,
        containerClass: SPHERE_CONTAINER_CLASS,
        itemClass: SPHERE_ITEM_CLASS,
        useContainerInlineStyles: true,
        useItemInlineStyles: true,
      });

      instanceRef.current = instance;
    };

    init();

    return () => {
      mounted = false;
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, []);

  // Update tag list when skills change (e.g. from parent) without re-mounting the sphere
  useEffect(() => {
    if (instanceRef.current && skills.length > 0) {
      instanceRef.current.update(skills);
    }
  }, [skills]);

  return (
    <div
      className={`skills-sphere-wrapper relative flex items-center justify-center w-full mx-auto lg:mx-0 ${className}`}
      style={{ minHeight: containerHeight, maxWidth: containerMaxWidth }}
      aria-hidden
    >
      <div ref={containerRef} className="skills-sphere-container w-full" style={{ height: containerHeight }} />
    </div>
  );
}
