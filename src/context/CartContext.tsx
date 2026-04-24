import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Product } from "@/data/products";

export type CartItem = { product: Product; quantity: number };

type CartContextType = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "marse-bi-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = (p: Product, qty = 1) =>
    setItems((curr) => {
      const found = curr.find((i) => i.product.id === p.id);
      if (found) {
        return curr.map((i) =>
          i.product.id === p.id ? { ...i, quantity: Math.min(i.quantity + qty, p.stock) } : i
        );
      }
      return [...curr, { product: p, quantity: Math.min(qty, p.stock) }];
    });

  const remove = (id: string) => setItems((c) => c.filter((i) => i.product.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((c) =>
      c.map((i) =>
        i.product.id === id ? { ...i, quantity: Math.max(1, Math.min(qty, i.product.stock)) } : i
      )
    );
  const clear = () => setItems([]);

  const total = useMemo(() => items.reduce((s, i) => s + i.product.price * i.quantity, 0), [items]);
  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
