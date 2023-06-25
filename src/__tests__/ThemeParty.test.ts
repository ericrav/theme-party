import { assert, Equals } from 'tsafe';

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
  }).extend({
    colors: {
      primary: (t) => t.colors.red,
    },
  });

  const colors = themeParty.getTheme((t) => t.colors);
  const spacing = themeParty.getTheme((t) => t.spacing);

  assert<Equals<typeof colors, { red: string; blue: string; primary: string }>>();
  assert<Equals<typeof spacing, { sm: number; md: number; lg: number }>>();

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
});
