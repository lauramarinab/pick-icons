import { PropsWithChildren, createContext, useContext } from "react";
import { useViewport } from "../hooks/useViewport";

type ResponsiveContext = {
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
};
export const ResponsiveContext = createContext<ResponsiveContext>({} as ResponsiveContext);

export const ResponsiveProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isDesktop, isMobile, isTablet } = useViewport();

  return <ResponsiveContext.Provider value={{ isDesktop, isMobile, isTablet }}>{children}</ResponsiveContext.Provider>;
};

export const useResponsive = () => {
  return useContext(ResponsiveContext);
};
