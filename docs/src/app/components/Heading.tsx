'use client';
import { useTheme } from 'theme-party';

export function Heading({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return <h1 style={{ color: theme.colors.link }}>{children}</h1>;
}
