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
  })
  .extend({
    colors: {
      primary: (t) => t.colors.red,
    }
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
    const theme = themeParty.getTheme();
    expect(theme.colors.primary).toBe('red');
  }

  {
    const theme = blueTheme.getTheme();
    expect(theme.colors.primary).toBe('blue');
  }

  {
    const theme = greenTheme.getTheme();
    expect(theme.colors.primary).toBe('green');
  }

});
