import { useMemo, useState } from "react";
import {
  Accessibility,
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronDown,
  CircleHelp,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Eye,
  File,
  Filter,
  Info,
  Menu,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  User,
  X,
  type LucideIcon,
} from "lucide-react";

import * as UI from "@/components";

const icons: { name: string; icon: LucideIcon }[] = [
  { name: "Accessibility", icon: Accessibility },
  { name: "Alert triangle", icon: AlertTriangle },
  { name: "Arrow left", icon: ArrowLeft },
  { name: "Check", icon: Check },
  { name: "Chevron down", icon: ChevronDown },
  { name: "Circle help", icon: CircleHelp },
  { name: "Copy", icon: Copy },
  { name: "Download", icon: Download },
  { name: "Edit", icon: Edit },
  { name: "External link", icon: ExternalLink },
  { name: "Eye", icon: Eye },
  { name: "File", icon: File },
  { name: "Filter", icon: Filter },
  { name: "Info", icon: Info },
  { name: "Menu", icon: Menu },
  { name: "Plus", icon: Plus },
  { name: "Search", icon: Search },
  { name: "Settings", icon: Settings },
  { name: "Trash 2", icon: Trash2 },
  { name: "Upload", icon: Upload },
  { name: "User", icon: User },
  { name: "X", icon: X },
];

export function IconCatalog() {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return normalizedQuery
      ? icons.filter(({ name }) =>
          name.toLocaleLowerCase().includes(normalizedQuery),
        )
      : icons;
  }, [query]);

  return (
    <UI.Stack id="catalog" gap="4">
      <UI.Stack
        direction="horizontal"
        className="flex-wrap items-end justify-between"
      >
        <UI.Stack gap="2">
          <UI.Heading level={2}>Available icons</UI.Heading>
          <UI.Badge variant="outline" className="w-fit">
            {matches.length} of {icons.length}
          </UI.Badge>
        </UI.Stack>
        <UI.Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search icons"
          placeholder="Search icons"
          className="w-full sm:max-w-xs"
        />
      </UI.Stack>

      {matches.length ? (
        <UI.Grid className="grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {matches.map(({ name, icon: Icon }) => (
            <UI.Card key={name} className="shadow-none">
              <UI.CardContent className="flex min-h-28 flex-col items-center justify-center gap-3 text-center">
                <UI.Icon className="size-6 text-primary">
                  <Icon />
                </UI.Icon>
                <UI.Text className="text-sm font-medium">{name}</UI.Text>
              </UI.CardContent>
            </UI.Card>
          ))}
        </UI.Grid>
      ) : (
        <UI.EmptyState
          title="No icons found"
          description="Try a broader concept or a shorter name."
        />
      )}
    </UI.Stack>
  );
}
