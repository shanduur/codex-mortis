type CodeBlockProps = {
  children: string
  label?: string
}

export function CodeBlock({ children, label = "Example" }: CodeBlockProps) {
  return (
    <div className="overflow-hidden border-2 bg-foreground text-background shadow-[5px_5px_0_0_var(--primary)]">
      <div className="flex items-center justify-between border-b-2 border-background/40 bg-primary px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
        <span>{label}</span>
        <span>TSX</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6"><code>{children}</code></pre>
    </div>
  )
}
