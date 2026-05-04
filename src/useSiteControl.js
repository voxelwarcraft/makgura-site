import { useEffect, useState } from "react";
import { defaultControlState, mergeControlState } from "./controlDefaults";

const CENTRAL_CONTROL_URL = "https://www.majorigames.com/api/site-control";
let cachedControlState = null;

async function fetchControlState() {
  try {
    const response = await fetch(`${CENTRAL_CONTROL_URL}?ts=${Date.now()}`, {
      cache: "no-store",
    });
    if (response.ok) {
      const remoteState = await response.json();
      return remoteState.state || remoteState;
    }
  } catch {
    // Fall back to the bundled static control file below.
  }

  const response = await fetch(`/site-control.json?ts=${Date.now()}`, {
    cache: "no-store",
  });
  if (!response.ok) return null;
  return response.json();
}

export function useSiteControl(siteKey) {
  const [controlState, setControlState] = useState(
    cachedControlState || defaultControlState,
  );

  useEffect(() => {
    let alive = true;

    async function loadControlState() {
      if (cachedControlState) return;

      try {
        const remoteState = await fetchControlState();
        if (!remoteState) return;
        const mergedState = mergeControlState(defaultControlState, remoteState);
        cachedControlState = mergedState;
        if (alive) setControlState(mergedState);
      } catch {
        // Bundled defaults keep Makgura stable if remote control is unavailable.
      }
    }

    loadControlState();
    return () => {
      alive = false;
    };
  }, []);

  return controlState[siteKey] || defaultControlState[siteKey];
}
