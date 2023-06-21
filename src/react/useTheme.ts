import { useContext } from "react";
import { themePartyContext } from "./context";
import { UserTheme } from "..";
import { ThemeOfParty } from "../ThemeParty";

export function useTheme<Theme = UserTheme['default']>(): ThemeOfParty<Theme> {
  const themeParty = useContext(themePartyContext)
  if (!themeParty) throw new Error("useTheme() must be used within a ThemeProvider");
  return themeParty.getTheme();
}
