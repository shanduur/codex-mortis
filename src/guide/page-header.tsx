type PageHeaderProps = {
  chapter: string
  title: string
  description: string
  eyebrow?: string
}

export function PageHeader({ chapter, title, description, eyebrow }: PageHeaderProps) {
  return (
    <header className="relative grid min-h-[22rem] content-between overflow-hidden border-b-2 pb-12 pt-8 sm:min-h-[28rem] sm:pb-16">
      <div aria-hidden="true" className="absolute right-1 top-20 -z-10 grid grid-cols-2 rotate-3 gap-2 opacity-80"><span className="size-10 border-2 bg-alert-coral" /><span className="size-10 border-2 bg-status-green" /><span className="size-10 border-2 bg-play-lavender" /><span className="size-10 border-2 bg-utility-blue" /></div>
      <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
        <span>{chapter}</span>
        <span>{eyebrow ?? "Design language / 01"}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl"><span className="box-decoration-clone bg-primary px-2">{title}</span></h1>
        <p className="max-w-md border-2 bg-card p-5 text-pretty text-base leading-7 text-card-foreground shadow-[5px_5px_0_0_var(--shadow-color)]">{description}</p>
      </div>
    </header>
  )
}
