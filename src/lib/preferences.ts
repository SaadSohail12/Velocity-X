import { useCallback, useEffect, useState } from "react";

export const TEXT_SIZES = [100, 112.5, 125] as const;
const KEY = "aether-prefs";

type Prefs = { textSize: number; animations: boolean };
const defaults: Prefs = { textSize: 0, animations: true };

function apply(p: Prefs) {
  const root = document.documentElement;
  root.style.fontSize = `${TEXT_SIZES[p.textSize] ?? 100}%`;
  root.classList.toggle("motion-off", !p.animations);
}

/** Site-wide accessibility preferences (text size, animations), persisted in localStorage. */
export function usePreferences() {
  const [prefs, setPrefs] = useState<Prefs>(defaults);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as Prefs | null;
      if (saved) setPrefs({ ...defaults, ...saved });
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    apply(prefs);
    localStorage.setItem(KEY, JSON.stringify(prefs));
  }, [prefs]);

  const changeText = useCallback(
    (dir: 1 | -1) =>
      setPrefs((p) => ({
        ...p,
        textSize: Math.min(TEXT_SIZES.length - 1, Math.max(0, p.textSize + dir)),
      })),
    [],
  );
  const toggleAnimations = useCallback(() => setPrefs((p) => ({ ...p, animations: !p.animations })), []);

  return { prefs, changeText, toggleAnimations };
}
