import merge from "lodash/merge";

export type ThemeStyleValue = string | number | undefined;
export type ResponseThemeValue<Breakpoints> = {
  [K in keyof Breakpoints]?: ThemeStyleValue;
};
export type ThemeValue = ThemeStyleValue | ResponseThemeValue<any>;

interface ThemeObject {
  [key: string]: ThemeValue | ThemeObject;
}

interface ThemeConfig<Theme> {
  [key: string]: ((theme: Theme) => unknown) | ThemeConfig<Theme>;
}

function makeProxy<T extends ThemeObject>(theme: T): T {
  const handler: ProxyHandler<any> = {
    get(target, prop, receiver) {
      console.log({ target, prop, receiver })
      const value = Reflect.get(target, prop);

      if (typeof value === "function") {
        return value(new Proxy(theme, handler));
      }

      if (typeof value === "object" && value !== null) {
        return new Proxy(value, handler);
      }

      return value;
    }
  }

  return new Proxy(theme, handler);
}

export type ThemeOfParty<T> = T extends ThemeParty<infer Theme> ? Theme : never;

export class ThemeParty<Theme extends {}> {
  public constructor(private theme: Theme) {}

  #theme!: Theme

  getTheme(): Theme {
    this.#theme ??= makeProxy(this.theme);
    return this.#theme;
  }

  extend<T>(overrides: T & Partial<ThemeConfig<Theme>>) {
    return new ThemeParty<Theme & T>(merge({}, this.theme, overrides));
  }
}
