import { useContext } from 'react';
import { themePartyContext } from './context';
import { DefaultThemeParty, ThemeOfParty } from '../types';
import { ThemeParty } from '../ThemeParty';

export function useTheme<T extends ThemeParty = DefaultThemeParty, R = unknown>(
  selector: (theme: ThemeOfParty<T>) => R
): ReturnType<typeof selector>;

export function useTheme<T extends ThemeParty = DefaultThemeParty>(): ThemeOfParty<T>;

export function useTheme<T extends ThemeParty = DefaultThemeParty>(selector?: any) {
  const themeParty = useContext(themePartyContext) as T;
  if (!themeParty)
    throw new Error('useTheme() must be used within a ThemeProvider');
  return themeParty.getTheme(selector);
}
