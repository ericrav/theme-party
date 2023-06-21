import { CostumedComponent } from './CostumedComponent';
import { useContext } from 'react';
import { themePartyContext } from './context';
import { DefaultTheme } from '../types';

export function costumed<Props extends {}>(
  DefaultComponent: React.ComponentType<Props & { theme: DefaultTheme }>
): CostumedComponent<Props> {
  function Costumed(props: Props) {
    const themeParty = useContext(themePartyContext);
    if (!themeParty) {
      throw new Error('Costumed Component must be used within a ThemeProvider');
    }
    const Component = themeParty.getComponent(Costumed) || DefaultComponent;
    const theme = themeParty.getTheme() as DefaultTheme;

    return <Component theme={theme} {...props} />;
  }

  Costumed.displayName = `Costumed(${
    DefaultComponent.displayName || DefaultComponent.name || 'Component'
  })`;
  Costumed.__theme_party_costumed = true as true;

  return Costumed;
}
