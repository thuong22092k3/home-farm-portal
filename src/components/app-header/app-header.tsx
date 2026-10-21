type AppHeaderProps = {
  title?: string;
  subTitle?: string;
};

function AppHeader({ title, subTitle }: AppHeaderProps) {
  return (
    <div>
      {!!title && (
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      )}
      {!!subTitle && <p className="text-muted-foreground">{subTitle}</p>}
    </div>
  );
}

export { AppHeader, type AppHeaderProps };
