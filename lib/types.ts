export type ViewId = "menu" | "about" | "projects" | "blog" | "experience" | "contact";

export const MENU_ITEMS = [
  { id: "about" as const, label: "about", number: 1 },
  { id: "projects" as const, label: "projects", number: 2 },
  { id: "blog" as const, label: "blog", number: 3 },
  { id: "experience" as const, label: "experience", number: 4 },
  { id: "contact" as const, label: "contact", number: 5 },
] as const;

export type MenuViewId = (typeof MENU_ITEMS)[number]["id"];
