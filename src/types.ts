export interface PizzaType {
  id?: string;
  name: string;
  ingredients: string;
  prices: { junior: number; senior: number; mega: number };
  signature?: boolean;
  image?: string;
}

export interface FormulaType {
  id: string;
  content: string;
  price: number;
  image?: string;
}

export interface ItemType {
  id?: string;
  name: string;
  ingredients?: string;
  price: number;
  format?: string;
  image?: string;
}

export interface MenuKidsType {
  content: string;
  price: number;
  image?: string;
}

export interface PromoType {
  text: string;
}

export interface AppData {
  pizzasTomato: PizzaType[];
  pizzasSignatures: PizzaType[];
  pizzasCream: PizzaType[];
  familyFormulas: FormulaType[];
  paninis: ItemType[];
  frites: ItemType[];
  salads: ItemType[];
  texMex: ItemType[];
  desserts: ItemType[];
  menuKids: MenuKidsType;
  promos: PromoType[];
  footerNote: string;
}
