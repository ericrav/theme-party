type ThemeValue<Theme> = ((theme: Theme) => unknown) | string | number;

export interface ProxyObject {
  [key: string]: ProxyObject | unknown;
}

export interface ThemeObject<Theme> {
  [key: string]: ThemeValue<Theme> | ThemeObject<Theme>;
}

type KeysOf<T, V> = {
  [K in keyof T]: T[K] extends Record<string | number, unknown>
    ? KeysOf<T[K], V>
    : V;
};

export type UnwrappedTheme<T> = KeysOf<T, ThemeValue<KeysOf<T, unknown>>>;

export type ResolvedTheme<T> = {
  [K in keyof T]: T[K] extends ThemeValue<any>
    ? (T[K] extends (...args: any) => any ? ReturnType<T[K]> : T[K])
    : ResolvedTheme<T[K]>;
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string | number, unknown>
    ? DeepPartial<T[K]>
    : T[K];
};
