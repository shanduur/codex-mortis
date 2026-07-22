import * as UI from "@/components";

type PageHeaderProps = {
  chapter: string;
  title: string;
  description: string;
  eyebrow?: string;
};

export function PageHeader({
  chapter,
  title,
  description,
  eyebrow,
}: PageHeaderProps) {
  return (
    <UI.Stack
      gap="8"
      className="min-h-[20rem] justify-end border-b pb-12 pt-8 sm:min-h-[24rem] sm:pb-16"
    >
      <UI.Grid
        columns={2}
        gap="8"
        className="items-end lg:grid-cols-[minmax(0,1fr)_22rem]"
      >
        <UI.Heading
          level={1}
          className="max-w-4xl text-balance text-5xl font-medium leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-8xl"
        >
          {title}
        </UI.Heading>
        <UI.Card className="gap-4 border-l-4 border-l-primary py-5 shadow-none">
          <UI.CardHeader className="flex-row items-center justify-between gap-3 px-5">
            <UI.Badge variant="outline">{chapter}</UI.Badge>
            <UI.Badge variant="outline">
              {eyebrow ?? "Design language / 01"}
            </UI.Badge>
          </UI.CardHeader>
          <UI.CardContent className="px-5">
            <UI.Text tone="muted" className="text-pretty text-base leading-7">
              {description}
            </UI.Text>
          </UI.CardContent>
        </UI.Card>
      </UI.Grid>
    </UI.Stack>
  );
}
