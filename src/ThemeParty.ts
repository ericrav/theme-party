import React from 'react';
import merge from 'lodash/merge';

import { makeThemeProxy } from './makeThemeProxy';
import { CostumedComponent } from './react/CostumedComponent';
import { ThemeObject, ProxyObject, UnwrappedTheme, DeepPartial, ResolvedTheme } from './ThemeParty.types';

export class ThemeParty<T extends ThemeObject<ProxyObject>> {
  public constructor(private theme: T) {}

  #theme!: ResolvedTheme<T>;

  #parent: ThemeParty<any> | null = null;

  #components = new WeakMap<CostumedComponent<any>, React.ComponentType<any>>();

  public getTheme(): ResolvedTheme<T> {
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
   */
  public extend(overrides: DeepPartial<UnwrappedTheme<T>>): ThemeParty<T>;
  public extend<O extends ThemeObject<UnwrappedTheme<T>>>(overrides: O): ThemeParty<T & O>;
  public extend<O extends ThemeObject<ProxyObject & UnwrappedTheme<T>>>(overrides: O) {
    const party = new ThemeParty<O & T>(merge({}, this.theme, overrides));
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
