import { assert, Equals } from 'tsafe';
import util from 'util';

import { ThemeParty } from '../ThemeParty';

const themeParty = new ThemeParty({
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
  spacing: {
    sm: 4,
    md: 8,
    lg: 16,
  },
});

test('ThemeParty', () => {
  expect(themeParty.getTheme()).toEqual({
    colors: {
      primary: 'red',
      secondary: 'blue',
    },
    spacing: {
      sm: 4,
      md: 8,
      lg: 16,
    },
  });
});

test('theme callbacks', () => {
  const themeParty = new ThemeParty({
    colors: {
      primary: 'red',
      secondary: (t) => t.colors.primary,
      tertiary: (t) => t.colors.secondary,
    },
  });

  expect(themeParty.getTheme()).toEqual({
    colors: {
      primary: 'red',
      secondary: 'red',
      tertiary: 'red',
    },
  });
});

test('extend theme', () => {
  const themeParty = new ThemeParty({
    colors: {
      primary: 'red',
    },
  }).extend({
    colors: {
      secondary: (t) => t.colors.primary,
      green: 'green',
    },
    spacing: {
      md: 8,
    },
  });

  expect(themeParty.getTheme()).toEqual({
    colors: {
      primary: 'red',
      secondary: 'red',
      green: 'green',
    },
    spacing: {
      md: 8,
    },
  });
});

test('create theme', () => {
  const themeParty = new ThemeParty({
    colors: {
      red: 'red',
      blue: 'blue',
      green: 'green',
    },
  }).extend({
    colors: {
      primary: (t) => t.colors.red,
    },
  });

  const blueTheme = themeParty.createTheme({
    colors: {
      primary: (t) => t.colors.blue,
    },
  });

  const greenTheme = themeParty.createTheme({
    colors: {
      primary: (t) => t.colors.green,
    },
  });

  {
    const {
      colors: { primary },
    } = themeParty.getTheme();

    assert<Equals<typeof primary, string>>();
    expect(primary).toBe('red');
  }

  {
    const {
      colors: { primary },
    } = blueTheme.getTheme();

    assert<Equals<typeof primary, string>>();
    expect(primary).toBe('blue');
  }

  {
    const {
      colors: { primary },
    } = greenTheme.getTheme();

    assert<Equals<typeof primary, string>>();
    expect(primary).toBe('green');
  }
});

test('getTheme with selector', () => {
  const themeParty = new ThemeParty({
    colors: {
      red: 'red',
      blue: 'blue',
    },
    spacing: {
      sm: 4,
      md: 8,
      lg: 16,
    },
    showLogo: true,
  }).extend({
    colors: {
      primary: (t) => t.colors.red,
    },
  });

  const colors = themeParty.getTheme((t) => t.colors);
  const spacing = themeParty.getTheme((t) => t.spacing);
  const primary = themeParty.getTheme((t) => t.colors.primary);
  const showLogo = themeParty.getTheme((t) => t.showLogo);

  assert<Equals<typeof colors, { red: string; blue: string; primary: string }>>();
  assert<Equals<typeof spacing, { sm: number; md: number; lg: number }>>();
  assert<Equals<typeof showLogo, boolean>>();

  expect(colors).toEqual({
    red: 'red',
    primary: 'red',
    blue: 'blue',
  });

  expect(spacing).toEqual({
    sm: 4,
    md: 8,
    lg: 16,
  });

  expect(primary).toBe('red');

  expect(showLogo).toBe(true);
});

test('proxy values', () => {
  const themeParty = new ThemeParty({
    string: 'string',
    number: 1,
    boolean: true,
    object: { key: 'value' },
    array: [1, 2, 3],
    function: () => ({ function: true }),
  });

  const theme = themeParty.getTheme();
  expect(util.types.isProxy(theme)).toBe(true);
  expect(theme.string).toBe('string');
  expect(util.types.isProxy(theme.string)).toBe(false);
  expect(theme.number).toBe(1);
  expect(util.types.isProxy(theme.number)).toBe(false);
  expect(theme.boolean).toBe(true);
  expect(util.types.isProxy(theme.boolean)).toBe(false);
  expect(theme.object).toEqual({ key: 'value' });
  expect(util.types.isProxy(theme.object)).toBe(true);
  expect(theme.array).toEqual([1, 2, 3]);
  expect(util.types.isProxy(theme.array)).toBe(false);
  expect(theme.function).toEqual({ function: true });
  expect(util.types.isProxy(theme.function)).toBe(false);
})
