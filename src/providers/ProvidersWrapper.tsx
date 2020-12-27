import React from "react";
import { SearchProvider } from "./SearchProvider";
import { SnackbarProvider } from "./SnackbarProvider";

export const ProvidersWrapper: React.FC = ({ children }) => {
  return (
    <SnackbarProvider>
      <SearchProvider>{children}</SearchProvider>
    </SnackbarProvider>
  );
};
