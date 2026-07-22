type CodeBlockProps = {
  children: string
  label?: string
}

export function CodeBlock({ children, label = "Example" }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-md border bg-code text-code-foreground soft-shadow">
      <div className="flex items-center justify-between border-b border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-code-foreground/65">
        <span>{label}</span>
        <span>TSX</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6"><code>{children}</code></pre>
    </div>
  )
}
