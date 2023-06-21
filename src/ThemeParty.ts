import React from 'react';
import merge from 'lodash/merge';

import { makeThemeProxy } from './makeThemeProxy';
import { CostumedComponent } from './react/CostumedComponent';

interface ThemeConfig<Theme> {
  [key: string]: ((theme: Theme) => unknown) | ThemeConfig<Theme>;
}

export class ThemeParty<Theme extends {}> {
  public constructor(private theme: Theme) {}

  #theme!: Theme;

  #parent: ThemeParty<any> | null = null;

  #components = new WeakMap<CostumedComponent<any>, React.ComponentType<any>>();

  public getTheme(): Theme {
    this.#theme ??= makeThemeProxy(this.theme);
    return this.#theme;
  }

  public getComponent<P>(component: CostumedComponent<P>): React.ComponentType<P> | null {
    if (this.#components.has(component)) {
      return this.#components.get(component) as React.ComponentType<P>;
    }

    if (this.#parent) {
      return this.#parent.getComponent(component);
    }

    return null;
  }

  /**
   * Return a new ThemeParty with the given theme overrides.
   */
  public extend<T>(overrides: T & Partial<ThemeConfig<Theme>>) {
    const party = new ThemeParty<Theme & T>(merge({}, this.theme, overrides));
    party.#parent = this;
    return party;
  }

  public useComponent<P>(component: CostumedComponent<P>, override: (props: P) => React.ReactNode): this {
    this.#components.set(component, override);
    return this;
  }
}
