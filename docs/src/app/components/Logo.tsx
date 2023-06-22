import { costumed } from 'theme-party';

interface Props {
  href: string;
  children: React.ReactNode;
}

export const Logo = costumed<Props>(function Logo({ href, children, theme }) {
  return (
    <a href={href} style={{ color: theme.colors.link }}>
      My Logo!
      <div>{children}</div>
    </a>
  );
});
