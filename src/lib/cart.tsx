"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Product } from "./data";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  emoji: string;
  image: string;
  gradient: [string, string];
  qty: number;
};

type State = { items: CartItem[] };

type Action =
  | { type: "add"; product: Product; qty?: number }
  | { type: "remove"; id: string }
  | { type: "setQty"; id: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; items: CartItem[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((i) => i.id === action.product.id);
      const qty = action.qty ?? 1;
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: action.product.id,
            slug: action.product.slug,
            title: action.product.title,
            price: action.product.price,
            emoji: action.product.emoji,
            image: action.product.image,
            gradient: action.product.gradient,
            qty,
          },
        ],
      };
    }
    case "remove":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "setQty":
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i))
          .filter((i) => i.qty > 0),
      };
    case "clear":
      return { items: [] };
    case "hydrate":
      return { items: action.items };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "rooprise-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", items: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.qty, 0);
    const subtotal = state.items.reduce((n, i) => n + i.qty * i.price, 0);
    return {
      items: state.items,
      add: (product, qty) => dispatch({ type: "add", product, qty }),
      remove: (id) => dispatch({ type: "remove", id }),
      setQty: (id, qty) => dispatch({ type: "setQty", id, qty }),
      clear: () => dispatch({ type: "clear" }),
      count,
      subtotal,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
