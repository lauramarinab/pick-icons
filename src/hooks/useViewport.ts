import { useEffect, useLayoutEffect, useState } from "react";
import { theme } from "../theme/tokens";

type ViewportSize = {
  viewportHeight: number;
  viewportWidth: number;
};

type Device = { isDesktop: boolean; isMobile: boolean; isTablet: boolean };

const matchDevice = (): Device => {
  const isDesktop = window.matchMedia(`(${theme.breakpoints.desktop})`).matches;
  const isTablet = window.matchMedia(`(${theme.breakpoints.tablet})`).matches;
  return { isDesktop, isMobile: !isDesktop && !isTablet, isTablet };
};

export const useViewport = (): ViewportSize & Device => {
  const { isDesktop, isMobile, isTablet } = matchDevice();
  const [device, setDevice] = useState<Device>({ isDesktop, isMobile, isTablet });

  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
  });

  const handleSize = () => {
    setDevice(matchDevice());

    setViewportSize({
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, []);

  return { ...viewportSize, ...device };
};

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
