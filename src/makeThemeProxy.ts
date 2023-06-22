import { ResolvedTheme } from "./ThemeParty.types";

export function makeThemeProxy<T>(theme: T): ResolvedTheme<T> {
  const handler: ProxyHandler<any> = {
    get(target, prop) {
      const value = Reflect.get(target, prop);

      if (typeof value === "function") {
        return value(new Proxy(theme, handler));
      }

      if (typeof value === "object" && value !== null) {
        return new Proxy(value, handler);
      }

      return value;
    }
  };

  return new Proxy(theme, handler);
}
