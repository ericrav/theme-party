import { useContext } from 'react';
import { themePartyContext } from './context';
import { DefaultThemeParty, ThemeOfParty } from '../types';

export function useTheme<ThemeParty = DefaultThemeParty>(): ThemeOfParty<ThemeParty> {
  const themeParty = useContext(themePartyContext);
  if (!themeParty)
    throw new Error('useTheme() must be used within a ThemeProvider');
  return themeParty.getTheme() as ThemeOfParty<ThemeParty>;
}
