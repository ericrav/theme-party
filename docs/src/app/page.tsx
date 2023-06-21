'use client';

import { ThemeProvider } from 'theme-party'
import { defaultTheme, themeParty } from './themeParty';
import { Heading } from './components/Heading';
import { otherTheme } from './themes/otherTheme';
import { Logo } from './components/Logo';
import { useState } from 'react';

export default function Home() {
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Logo href='https://google.com'>
          foo
        </Logo>
        <Heading>Theme Party!</Heading>

        <div>
          <button onClick={() => setTheme(defaultTheme)}>Default Theme</button>
          <button onClick={() => setTheme(otherTheme)}>Other Theme</button>
        </div>
      </main>
    </ThemeProvider>
  )
}
