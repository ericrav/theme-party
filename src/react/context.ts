import { createContext } from 'react';
import { ThemeParty } from '../ThemeParty';

export const themePartyContext = createContext<ThemeParty<any> | null>(null);
