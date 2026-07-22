import * as UI from "@/components";

type CodeBlockProps = {
  children: string;
  label?: string;
};

export function CodeBlock({ children, label = "Example" }: CodeBlockProps) {
  return (
    <UI.Card className="min-w-0 max-w-full gap-0 overflow-hidden border-0 bg-code py-0 text-code-foreground soft-shadow">
      <UI.CardHeader className="border-b border-white/15 px-4 py-2">
        <UI.Stack direction="horizontal" className="justify-between">
          <UI.Text
            as="span"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-code-foreground/65"
          >
            {label}
          </UI.Text>
          <UI.Badge
            variant="outline"
            className="border-white/20 text-code-foreground/65"
          >
            TSX
          </UI.Badge>
        </UI.Stack>
      </UI.CardHeader>
      <UI.CardContent className="px-0">
        <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
          <code>{children}</code>
        </pre>
      </UI.CardContent>
    </UI.Card>
  );
}
