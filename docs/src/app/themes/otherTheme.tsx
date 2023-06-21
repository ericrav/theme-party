import { Logo } from '../components/Logo';
import { defaultTheme } from '../themeParty';

export const otherTheme = defaultTheme.extend({});

otherTheme.useComponent(Logo, ({ href, children }) => (
  <h1>
    Other theme logo <a href={href}>{children}</a>
  </h1>
));
