import { useContext } from 'react';
import { themePartyContext } from './context';
import { DefaultUserTheme, ThemeOfParty } from '../types';

export function useTheme<Theme = DefaultUserTheme>(): ThemeOfParty<Theme> {
  const themeParty = useContext(themePartyContext);
  if (!themeParty)
    throw new Error('useTheme() must be used within a ThemeProvider');
  return themeParty.getTheme();
}
