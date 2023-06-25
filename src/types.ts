import type { ThemeParty } from './ThemeParty';
import { ThemeExtract } from './ThemeParty.types';

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
export type ThemeOfParty<T> = T extends ThemeParty<infer Theme> ? ThemeExtract<Theme> : never;

export type DefaultThemeParty = unknown extends UserTheme['default']
  ? never
  : UserTheme['default'];

export type DefaultTheme = ThemeOfParty<DefaultThemeParty>;
