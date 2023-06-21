import { costumed } from "theme-party";

interface Props {
  href: string;
  children: React.ReactNode;
}

export const Logo = costumed<Props>(({ href, children, theme }) => (
  <a href={href} style={{ color: theme.colors.link }}>
    My Logo!
    <div>
      {children}
    </div>
  </a>
));
