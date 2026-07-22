import * as UI from "@/components";

type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <UI.Stack
      gap="8"
      className="min-h-[18rem] justify-end border-b pb-12 pt-8 sm:min-h-[22rem] sm:pb-16"
    >
      <UI.Heading
        level={1}
        className="max-w-5xl text-balance text-5xl font-medium leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-8xl"
      >
        {title}
      </UI.Heading>
      <UI.Card className="max-w-4xl border-l-4 border-l-primary py-4 shadow-none">
        <UI.CardContent className="px-5">
          <UI.Text tone="muted" className="text-pretty text-base leading-7">
            {description}
          </UI.Text>
        </UI.CardContent>
      </UI.Card>
    </UI.Stack>
  );
}
