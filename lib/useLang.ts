"use client";

import { useState, useEffect, useCallback } from "react";
import { Lang } from "./translations";

export function useLang(): [Lang, () => void] {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem("pagasimple-lang") as Lang;
    if (saved === "es" || saved === "en") {
      setLang(saved);
    }
  }, []);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "es" ? "en" : "es";
      localStorage.setItem("pagasimple-lang", next);
      return next;
    });
  }, []);

  return [lang, toggle];
}
