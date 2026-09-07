interface HeaderProps {
  title: string;
  subtitle: string;
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-card-foreground">
        {title}
      </h1>
      <p className="text-sm font-light text-gray-500 dark:text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}

export default Header;