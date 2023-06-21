import React from 'react';

import { themePartyContext } from "./context";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <themePartyContext.Provider value={null}>
      {children}
    </themePartyContext.Provider>
  );
}
