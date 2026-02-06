import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { AppData } from './types';

const IMAGES = {
  pizzaMargherita: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
  pizzaPepperoni: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80",
  pizzaVegetarian: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400&q=80",
  pizza4Fromages: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=400&q=80",
  pizzaChicken: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
  pizzaSaumon: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80",
  pizzaBBQ: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&q=80",
  pizzaDefault: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80",
  panini: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=400&q=80",
  paniniChicken: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=400&q=80",
  paniniNutella: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
  fries: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&q=80",
  saladTenders: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80",
  saladMozzarella: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&q=80",
  saladSaumon: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&q=80",
  saladChevre: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  wings: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&q=80",
  nuggets: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80",
  mozzaSticks: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&q=80",
  jalapenos: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=400&q=80",
  tiramisu: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
  daim: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
  kidsMenu: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
  family: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
};

const INITIAL_DATA: AppData = {
  pizzasTomato: [
    { name: "AMERICAINE", ingredients: "Tomate, Mozzarella, Merguez, Viande hachée, Œuf", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaPepperoni },
    { name: "MARGHERITA", ingredients: "Tomate, Mozzarella", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaMargherita },
    { name: "REGINA", ingredients: "Tomate, Mozzarella, Jambon, Champignon", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaDefault },
    { name: "CALZONE", ingredients: "Tomate, Mozzarella, Jambon, Œuf", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaDefault },
    { name: "BOURSIN", ingredients: "Tomate, Mozzarella, Viande hachée, Champignon, Boursin", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizza4Fromages },
    { name: "CAMPIONE", ingredients: "Tomate, Mozzarella, Viande hachée, Champignon, Œuf", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaDefault },
    { name: "CHICAGO", ingredients: "Tomate, Mozzarella, Pepperoni, Chorizo, Oignon, Olive", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaPepperoni },
    { name: "CALIFORNIA", ingredients: "Tomate, Mozzarella, Chorizo, Olive, Oignon", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaPepperoni },
    { name: "HAWAÏENNE", ingredients: "Tomate, Mozzarella, Jambon, Ananas", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaChicken },
    { name: "TREVISO", ingredients: "Tomate, Mozzarella, Jambon, Parmesan", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaDefault },
    { name: "KEBAB", ingredients: "Tomate, Mozzarella, Kebab, Poivron, Olive", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaBBQ },
    { name: "NAPOLITAINE", ingredients: "Tomate, Mozzarella, Anchois, Câpres, Olive", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaDefault },
    { name: "ORIENTALE", ingredients: "Tomate, Mozzarella, Merguez, Oignon, Poivron, Olive, Œuf", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaPepperoni },
    { name: "PAYSANNE", ingredients: "Tomate, Mozzarella, Lardon, Œuf", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaDefault },
    { name: "PEPPERONI", ingredients: "Tomate, Mozzarella, Pepperoni, Poivron", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaPepperoni },
    { name: "4 FROMAGES", ingredients: "Tomate, Mozzarella, Bleu, Chèvre, Brie", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizza4Fromages },
    { name: "3 JAMBONS", ingredients: "Tomate, Mozzarella, Jambon, Bacon, Lardon", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaDefault },
    { name: "MEXICAINE", ingredients: "Tomate, Mozzarella, Merguez, Viande hachée, Chorizo, Poivron", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaBBQ },
    { name: "VÉGÉTARIENNE", ingredients: "Tomate, Mozzarella, Aubergine, Artichaut, Champignon, Poivron, Olive", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaVegetarian },
    { name: "4 SAISONS", ingredients: "Tomate, Mozzarella, Jambon, Artichaut, Poivron, Champignon", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaVegetarian },
  ],
  pizzasSignatures: [
    { name: "SAMOURAÏ", ingredients: "Sauce samouraï, Mozzarella, Poulet, Viande hachée, Pommes de terre", prices: { junior: 10, senior: 15, mega: 20 }, signature: true, image: IMAGES.pizzaBBQ },
    { name: "CURRY", ingredients: "Sauce curry, Mozzarella, Poulet, Pommes de terre, Poivron", prices: { junior: 10, senior: 15, mega: 20 }, signature: true, image: IMAGES.pizzaChicken },
    { name: "BARBECUE", ingredients: "Sauce barbecue, Mozzarella, Viande hachée, Poivron", prices: { junior: 10, senior: 15, mega: 20 }, signature: true, image: IMAGES.pizzaBBQ },
  ],
  pizzasCream: [
    { name: "BRETONNE", ingredients: "Crème fraîche, Mozzarella, Jambon, Chèvre, Oignon", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaSaumon },
    { name: "COUNTRY", ingredients: "Crème fraîche, Mozzarella, Viande hachée, Pommes de terre, Oignon", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaChicken },
    { name: "CHÈVRE MIEL", ingredients: "Crème fraîche, Mozzarella, Chèvre, Miel", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizza4Fromages },
    { name: "CANNIBALE", ingredients: "Crème fraîche, Mozzarella, Viande hachée, Poulet", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaPepperoni },
    { name: "FROMAGÈRE", ingredients: "Crème fraîche, Mozzarella, Chèvre, Bleu, Édam", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizza4Fromages },
    { name: "FERMIÈRE", ingredients: "Crème fraîche, Mozzarella, Poulet, Pommes de terre, Oignon", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaChicken },
    { name: "MONTAGNARDE", ingredients: "Crème fraîche, Mozzarella, Bacon, Viande hachée, Édam", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaDefault },
    { name: "RACLETTE", ingredients: "Crème fraîche, Mozzarella, Jambon, Pommes de terre, Raclette", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizza4Fromages },
    { name: "SALMONE", ingredients: "Crème fraîche, Mozzarella, Saumon fumé", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaSaumon },
    { name: "SAVOYARDE", ingredients: "Crème fraîche, Mozzarella, Lardon, Pommes de terre, Tartiflette", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaDefault },
    { name: "TEXANE", ingredients: "Crème fraîche, Mozzarella, Poulet, Champignon, Oignon", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaBBQ },
    { name: "VENEZIA", ingredients: "Crème fraîche, Mozzarella, Saumon, Brocoli", prices: { junior: 10, senior: 15, mega: 20 }, image: IMAGES.pizzaVegetarian },
  ],
  familyFormulas: [
    { id: "F1", content: "10 wings + 2 pizzas senior + Coca 1,5L", price: 35, image: IMAGES.wings },
    { id: "F2", content: "10 tenders + 3 pizzas senior + Coca 1,5L", price: 35, image: IMAGES.nuggets },
    { id: "F3", content: "10 wings + 10 tenders + 1 pizza mega + Coca 1,5L", price: 35, image: IMAGES.pizzaDefault },
  ],
  paninis: [
    { name: "Poulet", ingredients: "Poulet, salade, tomate, sauce", price: 6, image: IMAGES.paniniChicken },
    { name: "3 Fromages", ingredients: "Mozzarella, chèvre, emmental", price: 6, image: IMAGES.panini },
    { name: "Jambon", ingredients: "Jambon, fromage, salade, tomate", price: 6, image: IMAGES.panini },
    { name: "Saumon", ingredients: "Saumon fumé, crème, citron", price: 6, image: IMAGES.panini },
    { name: "Tomate Moza", ingredients: "Tomate, mozzarella, basilic", price: 6, image: IMAGES.panini },
    { name: "Viande hachée", ingredients: "Viande hachée, oignons, sauce", price: 6, image: IMAGES.panini },
    { name: "Nutella", ingredients: "Nutella", price: 5, image: IMAGES.paniniNutella },
  ],
  frites: [
    { name: "Frites", price: 3, image: IMAGES.fries },
    { name: "Frites + boisson", price: 5, image: IMAGES.fries },
  ],
  salads: [
    { name: "Salade Tenders", ingredients: "Salade verte, tenders, tomates, maïs, sauce", price: 9, image: IMAGES.saladTenders },
    { name: "Salade Mozzarella", ingredients: "Salade verte, mozzarella, tomates, olives", price: 9, image: IMAGES.saladMozzarella },
    { name: "Salade Saumon", ingredients: "Salade verte, saumon fumé, tomates, citron", price: 9, image: IMAGES.saladSaumon },
    { name: "Goat Salade", ingredients: "Salade verte, chèvre chaud, miel, noix", price: 9, image: IMAGES.saladChevre },
  ],
  texMex: [
    { name: "Wings", format: "6 pièces", price: 5, image: IMAGES.wings },
    { name: "Wings", format: "10 pièces", price: 9, image: IMAGES.wings },
    { name: "Mozza Sticks", format: "6 pièces", price: 5, image: IMAGES.mozzaSticks },
    { name: "Mozza Sticks", format: "10 pièces", price: 9, image: IMAGES.mozzaSticks },
    { name: "Bouchées Camembert", format: "6 pièces", price: 5, image: IMAGES.mozzaSticks },
    { name: "Bouchées Camembert", format: "10 pièces", price: 9, image: IMAGES.mozzaSticks },
    { name: "Jalapeños", format: "6 pièces", price: 5, image: IMAGES.jalapenos },
    { name: "Jalapeños", format: "10 pièces", price: 9, image: IMAGES.jalapenos },
    { name: "Nuggets", format: "6 pièces", price: 5, image: IMAGES.nuggets },
    { name: "Nuggets", format: "10 pièces", price: 9, image: IMAGES.nuggets },
    { name: "Magic Box", format: "2 wings + 2 tenders + 3 mozza sticks + 3 bouchées camemberts + 2 nuggets", price: 17, image: IMAGES.wings },
  ],
  desserts: [
    { name: "Tiramisu", price: 3, image: IMAGES.tiramisu },
    { name: "Tarte au Daim", price: 3, image: IMAGES.daim },
  ],
  menuKids: {
    content: "6 nuggets ou 3 tenders + frites + Capri Sun",
    price: 8,
    image: IMAGES.kidsMenu,
  },
  promos: [
    { text: "1 pizza achetée, la 2ᵉ à 3€" },
    { text: "2 pizzas achetées, la 3ᵉ gratuite" },
    { text: "1 pizza senior achetée, la 2ᵉ à 2€" },
    { text: "1 pizza junior achetée, la 2ᵉ à 1€" },
  ],
  footerNote: "1 pizza achetée = la 2ᵉ à 3€ | 2 pizzas achetées = la 3ᵉ gratuite | Offres non cumulables, valables uniquement à emporter.",
};

const GITHUB_API = 'https://api.github.com';
const GIST_FILENAME = 'pizza-rasil-menu.json';
const STORAGE_KEYS = {
  localData: 'pizza_rasil_data',
  gistId: 'pizza_rasil_gist_id',
  githubToken: 'pizza_rasil_github_token',
};

interface GistFile {
  content: string;
}

interface GistResponse {
  id: string;
  files: Record<string, GistFile>;
  html_url: string;
}

async function createGist(token: string, data: AppData): Promise<{ id: string; url: string } | null> {
  try {
    const res = await fetch(`${GITHUB_API}/gists`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        description: 'Pizza Rasil - Menu Data',
        public: false,
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify(data, null, 2),
          },
        },
      }),
    });
    if (!res.ok) return null;
    const gist: GistResponse = await res.json();
    return { id: gist.id, url: gist.html_url };
  } catch {
    return null;
  }
}

async function updateGist(token: string, gistId: string, data: AppData): Promise<boolean> {
  try {
    const res = await fetch(`${GITHUB_API}/gists/${gistId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify(data, null, 2),
          },
        },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function fetchGist(gistId: string, token?: string): Promise<AppData | null> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    const res = await fetch(`${GITHUB_API}/gists/${gistId}`, { headers });
    if (!res.ok) return null;
    const gist: GistResponse = await res.json();
    const file = gist.files[GIST_FILENAME];
    if (!file) return null;
    return { ...INITIAL_DATA, ...JSON.parse(file.content) };
  } catch {
    return null;
  }
}

async function validateToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${GITHUB_API}/user`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export type SyncStatus = 'local' | 'loading' | 'syncing' | 'synced' | 'error';

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
  resetData: () => void;
  updateItem: (category: keyof AppData | string, index: number, item: any) => void;
  addItem: (category: keyof AppData, item: any) => void;
  deleteItem: (category: keyof AppData | string, index: number) => void;
  gistId: string | null;
  githubToken: string | null;
  syncStatus: SyncStatus;
  setupGithub: (token: string) => Promise<boolean>;
  publishToGithub: () => Promise<boolean>;
  getShareUrl: () => string;
  disconnectGithub: () => void;
  exportData: () => void;
  importData: (json: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gistId, setGistId] = useState<string | null>(null);
  const [githubToken, setGithubToken] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('local');
  const saveTimerRef = useRef<number | null>(null);
  const initialLoadDone = useRef(false);

  const loadData = useCallback(async () => {
    setSyncStatus('loading');
    const params = new URLSearchParams(window.location.search);
    const urlGistId = params.get('menu');
    if (urlGistId) {
      localStorage.setItem(STORAGE_KEYS.gistId, urlGistId);
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('menu');
      window.history.replaceState({}, '', cleanUrl.toString());
    }
    const storedGistId = urlGistId || localStorage.getItem(STORAGE_KEYS.gistId);
    const storedToken = localStorage.getItem(STORAGE_KEYS.githubToken);
    if (storedGistId) {
      setGistId(storedGistId);
      if (storedToken) setGithubToken(storedToken);
      const cloudData = await fetchGist(storedGistId, storedToken || undefined);
      if (cloudData) {
        setData(cloudData);
        localStorage.setItem(STORAGE_KEYS.localData, JSON.stringify(cloudData));
        setSyncStatus('synced');
        setIsLoaded(true);
        initialLoadDone.current = true;
        return;
      }
      setSyncStatus('error');
    }
    const saved = localStorage.getItem(STORAGE_KEYS.localData);
    if (saved) {
      try {
        setData({ ...INITIAL_DATA, ...JSON.parse(saved) });
      } catch { /* use defaults */ }
    }
    if (!storedGistId) setSyncStatus('local');
    setIsLoaded(true);
    initialLoadDone.current = true;
  }, []);

  useEffect(() => {
    loadData();
    const wasAdmin = localStorage.getItem('pizza_rasil_is_admin');
    if (wasAdmin === 'true') setIsAdmin(true);
  }, [loadData]);

  useEffect(() => {
    if (!isLoaded || !initialLoadDone.current) return;
    localStorage.setItem(STORAGE_KEYS.localData, JSON.stringify(data));
    if (gistId && githubToken) {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      setSyncStatus('syncing');
      saveTimerRef.current = window.setTimeout(async () => {
        const ok = await updateGist(githubToken, gistId, data);
        setSyncStatus(ok ? 'synced' : 'error');
      }, 1500);
    }
  }, [data, isLoaded, gistId, githubToken]);

  useEffect(() => {
    if (isLoaded) localStorage.setItem('pizza_rasil_is_admin', isAdmin.toString());
  }, [isAdmin, isLoaded]);

  const login = (password: string) => {
    if (password === '1234' || password === '0183884781') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsAdmin(false);

  const updateData = (newData: Partial<AppData>) => setData(prev => ({ ...prev, ...newData }));

  const resetData = () => {
    setData(INITIAL_DATA);
  };

  const updateItem = (category: keyof AppData | string, index: number, item: any) => {
    setData(prev => {
      if (index === -1) return { ...prev, [category]: item };
      const list = (prev as any)[category];
      if (Array.isArray(list)) {
        const newList = [...list];
        newList[index] = item;
        return { ...prev, [category]: newList };
      }
      return prev;
    });
  };

  const addItem = (category: keyof AppData, item: any) => {
    setData(prev => {
      const list = prev[category];
      if (Array.isArray(list)) return { ...prev, [category]: [...list, item] };
      return prev;
    });
  };

  const deleteItem = (category: keyof AppData | string, index: number) => {
    if (!confirm("Supprimer cet élément ?")) return;
    setData(prev => {
      const list = (prev as any)[category];
      if (Array.isArray(list)) {
        return { ...prev, [category]: list.filter((_: any, i: number) => i !== index) };
      }
      return prev;
    });
  };

  const setupGithub = async (token: string): Promise<boolean> => {
    setSyncStatus('syncing');
    const valid = await validateToken(token);
    if (!valid) {
      setSyncStatus('error');
      return false;
    }
    setGithubToken(token);
    localStorage.setItem(STORAGE_KEYS.githubToken, token);
    if (gistId) {
      const ok = await updateGist(token, gistId, data);
      setSyncStatus(ok ? 'synced' : 'error');
      return ok;
    }
    const result = await createGist(token, data);
    if (result) {
      setGistId(result.id);
      localStorage.setItem(STORAGE_KEYS.gistId, result.id);
      setSyncStatus('synced');
      return true;
    }
    setSyncStatus('error');
    return false;
  };

  const publishToGithub = async (): Promise<boolean> => {
    if (!githubToken || !gistId) return false;
    setSyncStatus('syncing');
    const ok = await updateGist(githubToken, gistId, data);
    setSyncStatus(ok ? 'synced' : 'error');
    return ok;
  };

  const getShareUrl = (): string => {
    if (!gistId) return window.location.origin + window.location.pathname;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('menu', gistId);
    return url.toString();
  };

  const disconnectGithub = () => {
    localStorage.removeItem(STORAGE_KEYS.gistId);
    localStorage.removeItem(STORAGE_KEYS.githubToken);
    setGistId(null);
    setGithubToken(null);
    setSyncStatus('local');
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pizza-rasil-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      setData({ ...INITIAL_DATA, ...parsed });
      return true;
    } catch {
      return false;
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🍕</div>
          <p className="text-xl font-bold text-amber-700 animate-pulse">Chargement du menu...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={{
      isAdmin, login, logout, data, updateData, resetData, updateItem, addItem, deleteItem,
      gistId, githubToken, syncStatus, setupGithub, publishToGithub, getShareUrl, disconnectGithub, exportData, importData,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
