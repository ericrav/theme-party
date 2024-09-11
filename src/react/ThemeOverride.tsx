import { useContext, useMemo } from 'react';
import { DeepPartial, ThemeConfig, ThemeExtract } from '../ThemeParty.types';
import { DefaultTheme } from '../types';
import { themePartyContext } from './context';

export interface ThemeOverrideProps<T extends {}> {
  /** Override values of current theme. Object should be stable across renders */
  value: ThemeConfig<ThemeExtract<T>, DeepPartial<ThemeExtract<T>>>;
  children: React.ReactNode;
}

export function ThemeOverride<T extends {} = DefaultTheme>({
  value,
  children,
}: ThemeOverrideProps<T>) {
  const themeParty = useContext(themePartyContext);
  if (!themeParty)
    throw new Error('ThemeOverride must be used within a ThemeProvider');

  const override = useMemo(() => themeParty.createTheme(value), [themeParty, value]);

  return (
    <themePartyContext.Provider value={override}>
      {children}
    </themePartyContext.Provider>
  );
}
