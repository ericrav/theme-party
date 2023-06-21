import React from 'react';

import { themePartyContext } from "./context";
import { ThemeParty } from '../ThemeParty';

export interface ThemeProviderProps {
  theme: ThemeParty<any>;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return (
    <themePartyContext.Provider value={theme}>
      {children}
    </themePartyContext.Provider>
  );
}
