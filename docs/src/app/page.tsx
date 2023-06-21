'use client';

import { ThemeProvider } from 'theme-party'
import { defaultTheme, themeParty } from './themeParty';
import { Heading } from './components/Heading';

export default function Home() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <Heading>Theme Party!</Heading>
      </main>
    </ThemeProvider>
  )
}
