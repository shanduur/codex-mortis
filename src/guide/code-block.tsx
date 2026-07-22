type CodeBlockProps = {
  children: string
  label?: string
}

export function CodeBlock({ children, label = "Example" }: CodeBlockProps) {
  return (
    <div className="overflow-hidden border bg-foreground text-background">
      <div className="flex items-center justify-between border-b border-background/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-background/60">
        <span>{label}</span>
        <span>TSX</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6"><code>{children}</code></pre>
    </div>
  )
}
