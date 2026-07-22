export type GuideEntry = {
  id: string
  name: string
  description: string
  group: "Foundations" | "Components"
  status?: "Stable" | "Draft"
}

export const foundationEntries: GuideEntry[] = [
  { id: "introduction", name: "Introduction", description: "Purpose and design posture", group: "Foundations" },
  { id: "principles", name: "Principles", description: "Rules behind the visual language", group: "Foundations" },
  { id: "colors", name: "Color", description: "Semantic color tokens", group: "Foundations" },
  { id: "typography", name: "Typography", description: "Editorial scale and technical detail", group: "Foundations" },
  { id: "spacing", name: "Spacing", description: "Rhythm, density, and alignment", group: "Foundations" },
]

export const componentEntries: GuideEntry[] = [
  { id: "button", name: "Button", description: "Trigger an action", group: "Components", status: "Stable" },
  { id: "badge", name: "Badge", description: "Label status or metadata", group: "Components", status: "Stable" },
  { id: "input", name: "Input", description: "Collect a short value", group: "Components", status: "Stable" },
  { id: "textarea", name: "Textarea", description: "Collect longer text", group: "Components", status: "Stable" },
  { id: "card", name: "Card", description: "Group related information", group: "Components", status: "Stable" },
  { id: "alert", name: "Alert", description: "Communicate important state", group: "Components", status: "Stable" },
  { id: "dialog", name: "Dialog", description: "Focus a short task", group: "Components", status: "Stable" },
]

export const guideEntries = [...foundationEntries, ...componentEntries]

export function isGuideEntry(id: string): boolean {
  return guideEntries.some((entry) => entry.id === id)
}
