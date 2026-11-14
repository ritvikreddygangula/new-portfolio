"use client";

import { useEffect } from "react";
import { initMotion } from "@/lib/motion";

/** Mounted last in the layout so every page section exists before motion starts. */
export function Motion() {
  useEffect(() => initMotion(), []);
  return null;
}
