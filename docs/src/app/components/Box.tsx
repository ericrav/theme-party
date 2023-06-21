interface Props {
  as?: keyof JSX.IntrinsicElements;
  mx?: number | string;
  children?: React.ReactNode;
}

export function Box({ as = 'div', mx }: Props) {
  const theme = useTheme();
  const Component = as;
  return (
    <Component
      style={{
        marginLeft: mx ? theme.spacing[mx] : undefined,
        marginRight: mx ? theme.spacing[mx] : undefined,
      }}
    >
      {children}
    </Component>
  );
}
