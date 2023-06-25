type ThemeCallback<Theme, Result> = (theme: Theme) => Result

export type ThemeConfig<Theme extends {}, Subset = Theme> = {
  [Key in keyof Subset]: ThemeConfig<Theme, Subset[Key]> | ThemeCallback<Theme, Subset[Key]> | Subset[Key];
};

export type ThemeExtract<Theme extends {}, Subset = Theme> = {
  [Key in keyof Subset]: Subset[Key] extends ThemeCallback<Theme, infer Result> ? Result : Subset[Key] extends ThemeConfig<Theme, infer SubSubset> ? ThemeExtract<Theme, SubSubset> : Subset[Key];
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string | number, unknown>
    ? DeepPartial<T[K]>
    : T[K];
};
