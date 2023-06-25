import { renderHook } from '@testing-library/react';

import { ThemeParty } from '../../ThemeParty';
import { useTheme } from '../useTheme';
import { ThemeProvider } from '../ThemeProvider';
import { Equals, assert } from 'tsafe';

const themeParty = new ThemeParty({
  color: {
    primary: 'red',
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={themeParty}>{children}</ThemeProvider>
);

test('useTheme errors without context', () => {
  renderHook(() => {
    expect(() => useTheme()).toThrow(
      'useTheme() must be used within a ThemeProvider'
    );
  });
});

test('useTheme returns theme', () => {
  const { result } = renderHook(
    () => {
      const theme = useTheme<typeof themeParty>();
      assert<Equals<typeof theme, { color: { primary: string } }>>();
      return theme;
    },
    {
      wrapper: wrapper,
    }
  );

  expect(result.current).toEqual({
    color: {
      primary: 'red',
    },
  });
});

test('useTheme with selector', () => {
  const { result } = renderHook(
    () => {
      const primary = useTheme<typeof themeParty, string>(t => t.color.primary);
      assert<Equals<typeof primary, string>>();
      return primary;
    },
    {
      wrapper: wrapper,
    }
  );

  expect(result.current).toEqual('red');
});
