import { ThemeParty } from './ThemeParty';

/**
 * Allows user to define type of their custom theme object.
 *
 * @example
 * interface UserTheme {
 *   default: typeof myDefaultThemeParty;
 * }
 */
export interface UserTheme {
  [key: string]: unknown;
}

/**
 * Extract type of theme object from ThemeParty instance.
 */
export type ThemeOfParty<T> = T extends ThemeParty<infer Theme> ? Theme : never;

export type DefaultUserTheme = unknown extends UserTheme['default']
  ? never
  : UserTheme['default'];
