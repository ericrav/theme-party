import React from 'react';
import merge from 'lodash/merge';

import { makeThemeProxy } from './makeThemeProxy';
import { CostumedComponent } from './react/CostumedComponent';
import { ThemeConfig, DeepPartial, ThemeExtract } from './ThemeParty.types';

export class ThemeParty<T extends {}> {
  public constructor(private theme: ThemeConfig<T>) {}

  #theme!: ThemeExtract<T>;

  #parent: ThemeParty<any> | null = null;

  #components = new WeakMap<CostumedComponent<any>, React.ComponentType<any>>();

  public getTheme(): ThemeExtract<T> {
    this.#theme ??= makeThemeProxy(this.theme);
    return this.#theme;
  }

  public getComponent<P>(
    component: CostumedComponent<P>
  ): React.ComponentType<P> | null {
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
   * `extend` is an alias of `createTheme` but will let you add new properties to the type of the theme.
   */
  public extend<O extends {}>(overrides: ThemeConfig<ThemeExtract<T>, O>) {
    const party = new ThemeParty<O & ThemeExtract<T>>(merge({}, this.theme, overrides) as ThemeConfig<ThemeExtract<T> & O>);
    party.#parent = this;
    return party;
  }

  /**
   * Return a new ThemeParty with the given theme overrides.
   * `createTheme` is an alias of `extend` but will have TypeScript check properties match the type of the base theme.
   */
  public createTheme<O extends DeepPartial<T>>(overrides: ThemeConfig<ThemeExtract<T>, O>) {
    const party = new ThemeParty<T>(merge({}, this.theme, overrides));
    party.#parent = this;
    return party;
  }

  public useComponent<P>(
    component: CostumedComponent<P>,
    override: (props: P) => React.ReactNode
  ): this {
    this.#components.set(component, override);
    return this;
  }
}
