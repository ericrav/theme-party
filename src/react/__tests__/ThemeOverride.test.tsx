import { render } from '@testing-library/react';
import { ThemeParty } from '../../ThemeParty';
import { useTheme } from '../useTheme';
import { ThemeProvider } from '../ThemeProvider';
import { ThemeOverride } from '../ThemeOverride';
import { ThemeOfParty } from '../../types';

const themeParty = new ThemeParty({
  color: 'red',
  fontWeight: 700,
});

type Theme = ThemeOfParty<typeof themeParty>;

const theme2 = themeParty.createTheme({
  color: 'blue',
});

const Text = ({ children }: { children: React.ReactNode }) => {
  const { color, fontWeight } = useTheme<typeof themeParty>();
  return <p style={{ color, fontWeight }}>{children}</p>;
};

test('ThemeOverride', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme2}>
      <Text>Text 1</Text>

      <ThemeOverride<Theme> value={{ color: 'green' }}>
        <Text>Text 2</Text>
      </ThemeOverride>

      <ThemeOverride<Theme> value={{ fontWeight: () => 400 }}>
        <Text>Text 3</Text>
      </ThemeOverride>
    </ThemeProvider>
  );

  expect(getByText('Text 1')).toHaveStyle('color: blue');
  expect(getByText('Text 1')).toHaveStyle('font-weight: 700');

  expect(getByText('Text 2')).toHaveStyle('color: green');
  expect(getByText('Text 2')).toHaveStyle('font-weight: 700');

  expect(getByText('Text 3')).toHaveStyle('color: blue');
  expect(getByText('Text 3')).toHaveStyle('font-weight: 400');
});
