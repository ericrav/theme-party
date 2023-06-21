import { useContext } from "react";
import { themePartyContext } from "./context";
import { CostumedComponent } from './CostumedComponent';

export function useThemedComponent<P>(original: CostumedComponent<P>) {
  const themeParty = useContext(themePartyContext);
  if (!themeParty)
    throw new Error('Costumed Component must be used within a ThemeProvider');
  return themeParty.getComponent(original);
}
