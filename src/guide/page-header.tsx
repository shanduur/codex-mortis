type PageHeaderProps = {
  chapter: string
  title: string
  description: string
  eyebrow?: string
}

export function PageHeader({ chapter, title, description, eyebrow }: PageHeaderProps) {
  return (
    <header className="grid min-h-[20rem] content-between border-b pb-12 pt-8 sm:min-h-[24rem] sm:pb-16">
      <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
        <span>{chapter}</span>
        <span>{eyebrow ?? "Design language / 01"}</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <h1 className="max-w-4xl text-balance text-5xl font-medium leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-8xl">{title}</h1>
        <p className="max-w-md border-l-2 border-primary pl-5 text-pretty text-base leading-7 text-muted-foreground">{description}</p>
      </div>
    </header>
  )
}
