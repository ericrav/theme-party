import merge from 'lodash/merge';

import { makeThemeProxy } from './makeThemeProxy';

interface ThemeConfig<Theme> {
  [key: string]: ((theme: Theme) => unknown) | ThemeConfig<Theme>;
}

export class ThemeParty<Theme extends {}> {
  public constructor(private theme: Theme) {}

  #theme!: Theme;

  public getTheme(): Theme {
    this.#theme ??= makeThemeProxy(this.theme);
    return this.#theme;
  }

  public extend<T>(overrides: T & Partial<ThemeConfig<Theme>>) {
    return new ThemeParty<Theme & T>(merge({}, this.theme, overrides));
  }
}
