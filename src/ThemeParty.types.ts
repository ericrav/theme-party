type ThemeCallback<Theme, Result> = (theme: Theme) => Result

export type ThemeObject<Theme extends {}, Subset = Theme> = {
  [Key in keyof Subset]: ThemeObject<Theme, Subset[Key]> | ThemeCallback<Theme, Subset[Key]> | Subset[Key];
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string | number, unknown>
    ? DeepPartial<T[K]>
    : T[K];
};
