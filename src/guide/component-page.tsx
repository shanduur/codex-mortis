import { CircleAlert, Cpu, Inbox, Info, Server, Terminal } from "lucide-react";

import * as UI from "@/components";
import { CodeBlock } from "./code-block";
import { PageHeader } from "./page-header";
import { componentEntries, type GuideEntry } from "./registry";

type ComponentCopy = {
  guidance: string;
  code: string;
  doThis: string;
  avoid: string;
};

const customCopy: Record<string, Omit<ComponentCopy, "code">> = {
  button: {
    guidance: "Choose a variant by intent, not appearance.",
    doThis: "Use a verb that describes the result: Deploy system.",
    avoid:
      "Do not use vague labels such as Continue when the outcome is known.",
  },
  badge: {
    guidance: "Use badges for compact metadata, not primary actions.",
    doThis: "Keep labels short and use sentence case.",
    avoid: "Do not turn every piece of supporting text into a badge.",
  },
  input: {
    guidance: "Every input needs a visible label and a clear expected format.",
    doThis: "Place persistent instructions near the field.",
    avoid: "Do not use placeholder text as the only label.",
  },
  textarea: {
    guidance: "Use a textarea when the expected answer is more than one line.",
    doThis: "Explain what a useful answer contains.",
    avoid: "Do not use a tall textarea for a short identifier.",
  },
  card: {
    guidance:
      "Cards group related content; they do not replace page hierarchy.",
    doThis: "Give the card one clear subject.",
    avoid: "Do not put every page section inside an equal-looking card.",
  },
  alert: {
    guidance: "Alerts communicate state that deserves attention in context.",
    doThis: "Describe the state and the next useful action.",
    avoid: "Do not use destructive styling for neutral information.",
  },
  dialog: {
    guidance:
      "Dialogs focus a short, interruptive task without changing context.",
    doThis: "Keep the task focused and provide a clear way to close it.",
    avoid: "Do not place long, multi-step workflows inside a dialog.",
  },
};

const usage: Record<string, { imports?: string; example: string }> = {
  accordion: {
    example: `<Accordion items={[{ id: "requirements", title: "Requirements", content: "Node 22 or newer." }]} />`,
  },
  alert: {
    imports: "Alert, AlertDescription, AlertTitle",
    example: `<Alert>\n  <AlertTitle>Restart required</AlertTitle>\n  <AlertDescription>Apply the new kernel after the workload finishes.</AlertDescription>\n</Alert>`,
  },
  avatar: {
    example: `<Avatar alt="Ada Lovelace" fallback="AL" src="/avatar.jpg" />`,
  },
  badge: { example: `<Badge variant="secondary">In review</Badge>` },
  banner: {
    example: `<Banner title="Maintenance scheduled">Saturday at 10:00 UTC.</Banner>`,
  },
  breadcrumb: {
    example: `<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Systems" }]} />`,
  },
  button: { example: `<Button>Deploy system</Button>` },
  "button-group": {
    imports: "Button, ButtonGroup",
    example: `<ButtonGroup aria-label="View density">\n  <Button>Comfortable</Button>\n  <Button>Compact</Button>\n</ButtonGroup>`,
  },
  card: {
    imports: "Card, CardContent, CardHeader, CardTitle",
    example: `<Card>\n  <CardHeader><CardTitle>System status</CardTitle></CardHeader>\n  <CardContent>All services operational.</CardContent>\n</Card>`,
  },
  checkbox: { example: `<label><Checkbox /> Enable autoscaling</label>` },
  collapsible: {
    example: `<Collapsible trigger="Advanced settings">Debug logging</Collapsible>`,
  },
  combobox: {
    example: `<Combobox aria-label="Environment" options={[{ value: "production", label: "Production" }]} />`,
  },
  container: { example: `<Container size="md">Page content</Container>` },
  "date-picker": { example: `<DatePicker aria-label="Deployment date" />` },
  "description-list": {
    imports: "DescriptionDetails, DescriptionList, DescriptionTerm",
    example: `<DescriptionList>\n  <DescriptionTerm>Status</DescriptionTerm>\n  <DescriptionDetails>Operational</DescriptionDetails>\n</DescriptionList>`,
  },
  dialog: {
    imports: "Button, Dialog, DialogContent, DialogTitle, DialogTrigger",
    example: `<Dialog>\n  <DialogTrigger asChild><Button>Rename</Button></DialogTrigger>\n  <DialogContent><DialogTitle>Rename system</DialogTitle></DialogContent>\n</Dialog>`,
  },
  divider: { example: `<Divider />` },
  drawer: {
    imports: "Button, Drawer, DrawerContent, DrawerTitle, DrawerTrigger",
    example: `<Drawer>\n  <DrawerTrigger asChild><Button>Open filters</Button></DrawerTrigger>\n  <DrawerContent><DrawerTitle>Filters</DrawerTitle></DrawerContent>\n</Drawer>`,
  },
  "empty-state": {
    example: `<EmptyState title="No systems" description="Create a system to get started." />`,
  },
  fieldset: {
    example: `<Fieldset legend="Deployment">Form controls</Fieldset>`,
  },
  "file-upload": {
    example: `<FileUpload aria-label="Configuration file" accept=".yaml" />`,
  },
  form: { example: `<Form onSubmit={handleSubmit}>Form fields</Form>` },
  "form-error-summary": {
    example: `<FormErrorSummary errors={[{ href: "#email", message: "Enter an email address." }]} />`,
  },
  "form-field": {
    imports: "FormField, Input",
    example: `<FormField id="name" label="System name"><Input /></FormField>`,
  },
  "form-section": {
    example: `<FormSection title="Identity" description="How the system appears.">Form fields</FormSection>`,
  },
  grid: { example: `<Grid columns={3}><Card /><Card /><Card /></Grid>` },
  header: { example: `<Header>Product navigation</Header>` },
  heading: { example: `<Heading level={2}>Available systems</Heading>` },
  icon: { example: `<Icon label="Compute"><Cpu /></Icon>` },
  image: { example: `<Image src="/rack.jpg" alt="Compute rack" />` },
  input: {
    example: `<Input aria-label="System name" placeholder="compute-01" />`,
  },
  "input-group": {
    imports: "Input, InputGroup",
    example: `<InputGroup prefix="https://" suffix=".example.com"><Input aria-label="Hostname" /></InputGroup>`,
  },
  link: { example: `<Link href="/docs">Read documentation</Link>` },
  list: {
    imports: "List, ListItem",
    example: `<List><ListItem>Fast</ListItem><ListItem>Inspectable</ListItem></List>`,
  },
  main: { example: `<Main>Primary page content</Main>` },
  menu: {
    example: `<Menu label="Actions" items={[{ label: "Rename", onSelect: rename }]} />`,
  },
  "navigation-menu": {
    example: `<NavigationMenu items={[{ label: "Products", href: "/products" }]} />`,
  },
  "number-input": {
    example: `<NumberInput aria-label="Replica count" min={1} />`,
  },
  page: { example: `<Page><Header /><Main /></Page>` },
  "page-header": {
    example: `<PageHeader title="Systems" description="Inspect deployed systems." />`,
  },
  pagination: {
    example: `<Pagination page={2} totalPages={5} getHref={(page) => \`?page=\${page}\`} />`,
  },
  popover: {
    imports: "Button, Popover",
    example: `<Popover trigger={<Button>Show details</Button>}>Contextual details</Popover>`,
  },
  progress: { example: `<Progress value={40} aria-label="Upload progress" />` },
  prose: {
    example: `<Prose><h2>Architecture</h2><p>Long-form technical content.</p></Prose>`,
  },
  "radio-group": {
    example: `<RadioGroup name="region" label="Region" options={[{ value: "eu", label: "Europe" }]} />`,
  },
  select: {
    example: `<Select aria-label="Runtime" options={[{ value: "go", label: "Go" }]} />`,
  },
  sidebar: {
    example: `<Sidebar aria-label="Section navigation">Navigation</Sidebar>`,
  },
  skeleton: { example: `<Skeleton label="Loading card" className="h-24" />` },
  "skip-link": {
    example: `<SkipLink href="#content">Skip to content</SkipLink>`,
  },
  slider: {
    example: `<Slider aria-label="Replicas" min={1} max={10} defaultValue={3} />`,
  },
  spinner: { example: `<Spinner label="Loading systems" />` },
  stack: {
    example: `<Stack gap="4"><Heading>Title</Heading><Text>Supporting copy</Text></Stack>`,
  },
  stat: {
    example: `<Stat label="Deployments" value="24" description="This month" />`,
  },
  "status-indicator": {
    example: `<StatusIndicator status="operational">Operational</StatusIndicator>`,
  },
  stepper: {
    example: `<Stepper currentStep={2} steps={["Configure", "Review", "Deploy"]} />`,
  },
  switch: { example: `<Switch aria-label="Public endpoint" />` },
  table: {
    imports: "Table, TableBody, TableCell, TableHead, TableHeader, TableRow",
    example: `<Table>\n  <TableHeader><TableRow><TableHead>System</TableHead></TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>Rack 01</TableCell></TableRow></TableBody>\n</Table>`,
  },
  "table-of-contents": {
    example: `<TableOfContents items={[{ href: "#overview", label: "Overview" }]} />`,
  },
  tabs: {
    example: `<Tabs defaultValue="overview" items={[{ value: "overview", label: "Overview", content: "Overview panel" }]} />`,
  },
  text: { example: `<Text tone="muted">Supporting information</Text>` },
  textarea: { example: `<Textarea aria-label="Change summary" />` },
  "time-picker": { example: `<TimePicker aria-label="Deployment time" />` },
  toast: {
    example: `<Toast title="System saved" description="The new configuration is active." />`,
  },
  toggle: { example: `<Toggle aria-label="Pin system">Pin</Toggle>` },
  "toggle-group": {
    example: `<ToggleGroup aria-label="Alignment" items={[{ value: "left", label: "Left" }]} />`,
  },
  tooltip: {
    example: `<Tooltip content="Copy identifier"><Button>Copy</Button></Tooltip>`,
  },
};

function getCopy(entry: GuideEntry): ComponentCopy {
  const componentName = entry.name.replaceAll(" ", "");
  const example = usage[entry.id] ?? { example: `<${componentName} />` };
  const custom = customCopy[entry.id];
  return {
    guidance:
      custom?.guidance ??
      `Use ${entry.name} when you need to ${entry.description.toLowerCase()}.`,
    code: `import { ${example.imports ?? componentName} } from "@shanduur/design-language"\n\n${example.example}`,
    doThis:
      custom?.doThis ??
      `Use ${entry.name} for a clear, specific ${entry.description.toLowerCase()} need.`,
    avoid:
      custom?.avoid ??
      `Do not add ${entry.name} when simpler semantic HTML communicates the same thing.`,
  };
}

function ComponentExample({ id }: { id: string }) {
  switch (id) {
    case "accordion":
      return (
        <UI.Accordion
          items={[
            {
              id: "requirements",
              title: "Requirements",
              content: "Node 22 or newer.",
            },
            { id: "support", title: "Support", content: "Linux and macOS." },
          ]}
        />
      );
    case "alert":
      return (
        <div className="grid max-w-2xl gap-4">
          <UI.Alert>
            <Info />
            <UI.AlertTitle>Restart required</UI.AlertTitle>
            <UI.AlertDescription>
              Apply the new kernel after the workload finishes.
            </UI.AlertDescription>
          </UI.Alert>
          <UI.Alert variant="destructive">
            <CircleAlert />
            <UI.AlertTitle>Deployment failed</UI.AlertTitle>
            <UI.AlertDescription>
              Inspect the build log before trying again.
            </UI.AlertDescription>
          </UI.Alert>
        </div>
      );
    case "avatar":
      return (
        <div className="flex items-center gap-3">
          <UI.Avatar alt="Ada Lovelace" fallback="AL" />
          <UI.Avatar alt="Grace Hopper" fallback="GH" size="lg" />
        </div>
      );
    case "badge":
      return (
        <div className="flex flex-wrap gap-3">
          <UI.Badge>Active</UI.Badge>
          <UI.Badge variant="secondary">In review</UI.Badge>
          <UI.Badge variant="outline">Queued</UI.Badge>
          <UI.Badge variant="destructive">Failed</UI.Badge>
        </div>
      );
    case "banner":
      return (
        <UI.Banner title="Maintenance scheduled">
          Saturday at 10:00 UTC.
        </UI.Banner>
      );
    case "breadcrumb":
      return (
        <UI.Breadcrumb
          items={[
            { label: "Home", href: "#" },
            { label: "Systems", href: "#" },
            { label: "Rack 04" },
          ]}
        />
      );
    case "button":
      return (
        <div className="flex flex-wrap items-center gap-3">
          <UI.Button>Deploy system</UI.Button>
          <UI.Button variant="secondary">Save draft</UI.Button>
          <UI.Button variant="outline">Inspect</UI.Button>
          <UI.Button variant="ghost">Cancel</UI.Button>
          <UI.Button variant="destructive">Delete</UI.Button>
          <UI.Button disabled>Unavailable</UI.Button>
        </div>
      );
    case "button-group":
      return (
        <UI.ButtonGroup aria-label="View density">
          <UI.Button variant="outline">Comfortable</UI.Button>
          <UI.Button variant="outline">Compact</UI.Button>
        </UI.ButtonGroup>
      );
    case "card":
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          <UI.Card className="border-t-4 border-t-status-green">
            <UI.CardHeader>
              <Server className="size-5 text-status-green" />
              <UI.CardTitle className="mt-8">System status</UI.CardTitle>
              <UI.CardDescription>Rack 04 / eastern zone</UI.CardDescription>
            </UI.CardHeader>
            <UI.CardContent>
              <UI.StatusIndicator status="operational">
                Operational
              </UI.StatusIndicator>
            </UI.CardContent>
            <UI.CardFooter className="border-t pt-6 text-xs text-muted-foreground">
              Updated 12 seconds ago
            </UI.CardFooter>
          </UI.Card>
          <UI.Card className="border-t-4 border-t-utility-blue">
            <UI.CardHeader>
              <Terminal className="size-5 text-primary" />
              <UI.CardTitle className="mt-8">Compiler</UI.CardTitle>
              <UI.CardDescription>Toolchain / release</UI.CardDescription>
            </UI.CardHeader>
            <UI.CardContent>
              <code className="font-mono text-sm">forge --version 0.4.1</code>
            </UI.CardContent>
          </UI.Card>
        </div>
      );
    case "checkbox":
      return (
        <label className="flex items-center gap-3 text-sm">
          <UI.Checkbox defaultChecked />
          Enable autoscaling
        </label>
      );
    case "collapsible":
      return (
        <UI.Collapsible trigger="Advanced settings">
          Debug logging and trace output.
        </UI.Collapsible>
      );
    case "combobox":
      return (
        <UI.Combobox
          className="max-w-sm"
          aria-label="Environment"
          placeholder="Choose an environment"
          options={[
            { value: "production", label: "Production" },
            { value: "staging", label: "Staging" },
          ]}
        />
      );
    case "container":
      return (
        <UI.Container
          size="sm"
          className="rounded-md border bg-card py-6 text-sm"
        >
          Constrained content area
        </UI.Container>
      );
    case "date-picker":
      return <UI.DatePicker aria-label="Deployment date" />;
    case "description-list":
      return (
        <UI.DescriptionList>
          <UI.DescriptionTerm>Status</UI.DescriptionTerm>
          <UI.DescriptionDetails>Operational</UI.DescriptionDetails>
          <UI.DescriptionTerm>Region</UI.DescriptionTerm>
          <UI.DescriptionDetails>Europe West</UI.DescriptionDetails>
        </UI.DescriptionList>
      );
    case "dialog":
      return (
        <UI.Dialog>
          <UI.DialogTrigger asChild>
            <UI.Button>Rename system</UI.Button>
          </UI.DialogTrigger>
          <UI.DialogContent>
            <UI.DialogHeader>
              <UI.DialogTitle>Rename system</UI.DialogTitle>
              <UI.DialogDescription>
                Names must be unique within this workspace.
              </UI.DialogDescription>
            </UI.DialogHeader>
            <UI.FormField id="dialog-name" label="System name">
              <UI.Input defaultValue="compute-01" />
            </UI.FormField>
            <UI.DialogFooter>
              <UI.DialogClose asChild>
                <UI.Button variant="outline">Cancel</UI.Button>
              </UI.DialogClose>
              <UI.DialogClose asChild>
                <UI.Button>Save name</UI.Button>
              </UI.DialogClose>
            </UI.DialogFooter>
          </UI.DialogContent>
        </UI.Dialog>
      );
    case "divider":
      return (
        <div className="grid gap-4">
          <span>Before</span>
          <UI.Divider />
          <span>After</span>
        </div>
      );
    case "drawer":
      return (
        <UI.Drawer>
          <UI.DrawerTrigger asChild>
            <UI.Button>Open filters</UI.Button>
          </UI.DrawerTrigger>
          <UI.DrawerContent>
            <UI.DrawerTitle>Filters</UI.DrawerTitle>
            <UI.DrawerDescription>
              Limit the systems shown in this view.
            </UI.DrawerDescription>
          </UI.DrawerContent>
        </UI.Drawer>
      );
    case "empty-state":
      return (
        <UI.EmptyState
          icon={<Inbox className="size-6" />}
          title="No systems"
          description="Create a system to get started."
          action={<UI.Button>Create system</UI.Button>}
        />
      );
    case "fieldset":
      return (
        <UI.Fieldset className="max-w-md" legend="Deployment">
          <label className="flex items-center gap-3 text-sm">
            <UI.Checkbox />
            Enable autoscaling
          </label>
        </UI.Fieldset>
      );
    case "file-upload":
      return (
        <UI.FileUpload
          className="max-w-lg"
          aria-label="Configuration file"
          accept=".yaml"
        />
      );
    case "form":
      return (
        <UI.Form className="max-w-md">
          <UI.FormField id="form-name" label="System name">
            <UI.Input />
          </UI.FormField>
          <UI.Button type="button">Save</UI.Button>
        </UI.Form>
      );
    case "form-error-summary":
      return (
        <UI.FormErrorSummary
          errors={[
            { href: "#email", message: "Enter an email address." },
            { href: "#name", message: "Enter a system name." },
          ]}
        />
      );
    case "form-field":
      return (
        <UI.FormField
          id="field-name"
          label="System name"
          description="Use a unique name."
          required
        >
          <UI.Input placeholder="compute-01" />
        </UI.FormField>
      );
    case "form-section":
      return (
        <UI.FormSection title="Identity" description="How the system appears.">
          <UI.FormField id="section-name" label="System name">
            <UI.Input />
          </UI.FormField>
        </UI.FormSection>
      );
    case "grid":
      return (
        <UI.Grid columns={3}>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-md border bg-card p-6 text-center text-sm"
            >
              Column {item}
            </div>
          ))}
        </UI.Grid>
      );
    case "header":
      return (
        <UI.Header className="flex items-center justify-between">
          <strong>Product</strong>
          <UI.NavigationMenu items={[{ label: "Docs", href: "#" }]} />
        </UI.Header>
      );
    case "heading":
      return (
        <UI.Stack>
          <UI.Heading level={1}>Page heading</UI.Heading>
          <UI.Heading level={2}>Section heading</UI.Heading>
          <UI.Heading level={3}>Subsection heading</UI.Heading>
        </UI.Stack>
      );
    case "icon":
      return (
        <div className="flex gap-4">
          <UI.Icon label="Compute" className="size-8">
            <Cpu />
          </UI.Icon>
          <UI.Icon label="Information" className="size-8">
            <Info />
          </UI.Icon>
        </div>
      );
    case "image":
      return (
        <UI.Image
          className="h-48 w-full"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='320'%3E%3Crect width='100%25' height='100%25' fill='%236ec5e8'/%3E%3Cpath d='M0 260L180 100l150 120 150-90 320 130' fill='none' stroke='%231d2528' stroke-width='16'/%3E%3C/svg%3E"
          alt="Abstract system topology"
        />
      );
    case "input":
      return (
        <div className="grid max-w-md gap-6">
          <UI.FormField id="input-name" label="System name">
            <UI.Input placeholder="compute-01" />
          </UI.FormField>
          <UI.Input value="mesh-4x4" readOnly aria-label="Read-only value" />
          <UI.Input placeholder="No access" disabled aria-label="Unavailable" />
        </div>
      );
    case "input-group":
      return (
        <UI.InputGroup prefix="https://" suffix=".example.com">
          <UI.Input aria-label="Hostname" placeholder="compute" />
        </UI.InputGroup>
      );
    case "link":
      return <UI.Link href="#">Read the architecture documentation</UI.Link>;
    case "list":
      return (
        <UI.List>
          <UI.ListItem>Inspectable source</UI.ListItem>
          <UI.ListItem>Semantic tokens</UI.ListItem>
          <UI.ListItem>Keyboard support</UI.ListItem>
        </UI.List>
      );
    case "main":
      return (
        <UI.Main className="rounded-md border bg-card px-6">
          Primary page content
        </UI.Main>
      );
    case "menu":
      return (
        <UI.Menu
          label="Actions"
          items={[
            { label: "Rename", onSelect: () => undefined },
            { label: "Duplicate", onSelect: () => undefined },
            { label: "Delete", onSelect: () => undefined, destructive: true },
          ]}
        />
      );
    case "navigation-menu":
      return (
        <UI.NavigationMenu
          items={[
            { label: "Products", href: "#", current: true },
            { label: "Docs", href: "#" },
            { label: "Support", href: "#" },
          ]}
        />
      );
    case "number-input":
      return (
        <UI.NumberInput
          className="max-w-40"
          aria-label="Replica count"
          min={1}
          defaultValue={3}
        />
      );
    case "page":
      return (
        <UI.Page className="min-h-0 overflow-hidden rounded-md border">
          <UI.Header>Product</UI.Header>
          <UI.Main className="px-6">Primary page content</UI.Main>
        </UI.Page>
      );
    case "page-header":
      return (
        <UI.PageHeader
          title="Systems"
          eyebrow="Workspace / Production"
          description="Inspect deployed systems and their current health."
          actions={<UI.Button>Create system</UI.Button>}
        />
      );
    case "pagination":
      return (
        <UI.Pagination
          page={2}
          totalPages={5}
          getHref={(page) => `#page-${page}`}
        />
      );
    case "popover":
      return (
        <UI.Popover trigger={<UI.Button>Show details</UI.Button>}>
          Rack 04 is running firmware 2.3.
        </UI.Popover>
      );
    case "progress":
      return (
        <div className="grid max-w-lg gap-2">
          <UI.Progress value={40} aria-label="Upload progress" />
          <span className="text-xs text-muted-foreground">40% uploaded</span>
        </div>
      );
    case "prose":
      return (
        <UI.Prose>
          <h2>Architecture</h2>
          <p>
            The control plane coordinates scheduling, state, and system health
            across the deployment.
          </p>
          <p>
            <UI.Link href="#">Read the full specification</UI.Link>
          </p>
        </UI.Prose>
      );
    case "radio-group":
      return (
        <UI.RadioGroup
          name="region-example"
          label="Region"
          defaultValue="eu"
          options={[
            { value: "eu", label: "Europe" },
            { value: "us", label: "United States" },
          ]}
        />
      );
    case "select":
      return (
        <UI.Select
          className="max-w-sm"
          aria-label="Runtime"
          defaultValue="go"
          options={[
            { value: "go", label: "Go" },
            { value: "rust", label: "Rust" },
          ]}
        />
      );
    case "sidebar":
      return (
        <UI.Sidebar
          aria-label="Section navigation"
          className="max-w-64 rounded-md border"
        >
          <UI.List>
            <UI.ListItem>Overview</UI.ListItem>
            <UI.ListItem>Deployments</UI.ListItem>
            <UI.ListItem>Settings</UI.ListItem>
          </UI.List>
        </UI.Sidebar>
      );
    case "skeleton":
      return (
        <div className="grid max-w-md gap-3">
          <UI.Skeleton label="Loading title" className="h-8 w-2/3" />
          <UI.Skeleton label="Loading line" />
          <UI.Skeleton label="Loading line" className="w-5/6" />
        </div>
      );
    case "skip-link":
      return (
        <UI.SkipLink className="static translate-y-0" href="#content">
          Skip to content
        </UI.SkipLink>
      );
    case "slider":
      return (
        <UI.Slider
          className="max-w-md"
          aria-label="Replicas"
          min={1}
          max={10}
          defaultValue={3}
        />
      );
    case "spinner":
      return (
        <div className="flex items-center gap-3">
          <UI.Spinner label="Loading systems" />
          <span className="text-sm">Loading systems</span>
        </div>
      );
    case "stack":
      return (
        <UI.Stack gap="4">
          <div className="rounded-md border bg-card p-4">First</div>
          <div className="rounded-md border bg-card p-4">Second</div>
        </UI.Stack>
      );
    case "stat":
      return (
        <UI.Grid columns={3}>
          <UI.Stat label="Deployments" value="24" description="This month" />
          <UI.Stat label="Healthy" value="98%" />
          <UI.Stat label="Regions" value="4" />
        </UI.Grid>
      );
    case "status-indicator":
      return (
        <div className="flex flex-wrap gap-6">
          <UI.StatusIndicator status="operational">
            Operational
          </UI.StatusIndicator>
          <UI.StatusIndicator status="warning">Degraded</UI.StatusIndicator>
          <UI.StatusIndicator status="critical">Offline</UI.StatusIndicator>
        </div>
      );
    case "stepper":
      return (
        <UI.Stepper currentStep={2} steps={["Configure", "Review", "Deploy"]} />
      );
    case "switch":
      return (
        <label className="flex items-center gap-3 text-sm">
          <UI.Switch defaultChecked aria-label="Public endpoint" />
          Public endpoint
        </label>
      );
    case "table":
      return (
        <UI.Table>
          <UI.TableHeader>
            <UI.TableRow>
              <UI.TableHead>System</UI.TableHead>
              <UI.TableHead>Status</UI.TableHead>
            </UI.TableRow>
          </UI.TableHeader>
          <UI.TableBody>
            <UI.TableRow>
              <UI.TableCell>Rack 01</UI.TableCell>
              <UI.TableCell>
                <UI.StatusIndicator status="operational">
                  Operational
                </UI.StatusIndicator>
              </UI.TableCell>
            </UI.TableRow>
          </UI.TableBody>
        </UI.Table>
      );
    case "table-of-contents":
      return (
        <UI.TableOfContents
          items={[
            { href: "#overview", label: "Overview" },
            { href: "#usage", label: "Usage" },
            { href: "#accessibility", label: "Accessibility", level: 3 },
          ]}
        />
      );
    case "tabs":
      return (
        <UI.Tabs
          defaultValue="overview"
          items={[
            {
              value: "overview",
              label: "Overview",
              content: "System overview",
            },
            {
              value: "events",
              label: "Events",
              content: "Recent system events",
            },
          ]}
        />
      );
    case "text":
      return (
        <UI.Stack>
          <UI.Text>Default body text communicates the primary message.</UI.Text>
          <UI.Text tone="muted">
            Muted text carries supporting information.
          </UI.Text>
        </UI.Stack>
      );
    case "textarea":
      return (
        <UI.FormField
          id="summary"
          label="Change summary"
          description="Include expected impact and rollback notes."
        >
          <UI.Textarea placeholder="Describe what changed and why…" />
        </UI.FormField>
      );
    case "time-picker":
      return (
        <UI.TimePicker aria-label="Deployment time" defaultValue="10:30" />
      );
    case "toast":
      return (
        <UI.Toast
          title="System saved"
          description="The new configuration is active."
          onDismiss={() => undefined}
        />
      );
    case "toggle":
      return <UI.Toggle aria-label="Pin system">Pin system</UI.Toggle>;
    case "toggle-group":
      return (
        <UI.ToggleGroup
          aria-label="Alignment"
          type="single"
          defaultValue="left"
          items={[
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ]}
        />
      );
    case "tooltip":
      return (
        <UI.Tooltip content="Copy identifier">
          <UI.Button variant="outline">Copy</UI.Button>
        </UI.Tooltip>
      );
    default:
      return null;
  }
}

export function ComponentPage({ id }: { id: string }) {
  const entry =
    componentEntries.find((component) => component.id === id) ??
    componentEntries[0];
  const copy = getCopy(entry);

  return (
    <>
      <PageHeader
        chapter="Component / Stable"
        title={entry.name}
        description={`${entry.description}. ${copy.guidance}`}
        eyebrow="React / Shadcn"
      />
      <section className="py-14 sm:py-20">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Preview</h2>
          <span className="rounded-full border bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-status-green" />
            Light + dark ready
          </span>
        </div>
        <div
          aria-label={`${entry.name} component examples`}
          className="catalogue-grid min-h-64 rounded-lg border p-6 shadow-sm sm:grid sm:place-items-center sm:p-12"
        >
          <div className="w-full rounded-md border bg-background p-6 sm:p-8">
            <ComponentExample id={entry.id} />
          </div>
        </div>
      </section>
      <section className="grid gap-8 border-t py-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,1fr)]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            Start here
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Usage</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Import from the package entry point. Compose with standard React
            props and use Tailwind utilities only for layout adjustments
            specific to the consuming screen.
          </p>
        </div>
        <CodeBlock>{copy.code}</CodeBlock>
      </section>
      <section className="grid gap-5 sm:grid-cols-2">
        <article className="rounded-lg border bg-card p-7 shadow-sm">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="mr-2 inline-block size-2 rounded-full bg-status-green" />
            Do
          </p>
          <p className="mt-8 text-sm leading-6">{copy.doThis}</p>
        </article>
        <article className="rounded-lg border bg-card p-7 shadow-sm">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="mr-2 inline-block size-2 rounded-full bg-alert-coral" />
            Avoid
          </p>
          <p className="mt-8 text-sm leading-6">{copy.avoid}</p>
        </article>
      </section>
      <section className="py-14">
        <h2 className="text-xl font-semibold">Accessibility checklist</h2>
        <ul className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <li>• Works with keyboard input</li>
          <li>• Keeps a visible focus indicator</li>
          <li>• Uses labels that describe intent</li>
          <li>• Does not rely on color alone</li>
        </ul>
      </section>
    </>
  );
}
