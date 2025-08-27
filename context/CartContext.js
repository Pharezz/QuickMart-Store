// context/CartContext.js
"use client";
import { createContext, useContext, useMemo, useState } from "react";

const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // store full item objects, any extra props kept

  // Preserve all incoming fields on product; normalize qty and image
  const addToCart = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p._id === product._id);
      if (idx >= 0) {
        // existing item: increase qty but keep other fields intact
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + 1 };
        return copy;
      }
      const itemToAdd = {
        ...product,
        qty: product.qty ?? 1,
        image: product.image ?? null,
      };
      return [...prev, itemToAdd];
    });
  };

  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((p) => p._id !== id));

  const clearCart = () => setItems([]);

  const updateQuantity = (id, qty) => {
    setItems((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, qty: Math.max(Number(qty) || 1, 1) } : p
      )
    );
  };

  // Convenience functions for + and -
  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((p) => (p._id === id ? { ...p, qty: (p.qty || 1) + 1 } : p))
    );
  };

  const decreaseQty = (id) => {
    setItems((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, qty: Math.max((p.qty || 1) - 1, 1) } : p
      )
    );
  };

  const total = useMemo(
    () =>
      items.reduce(
        (s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 1),
        0
      ),
    [items]
  );

  const count = useMemo(
    () => items.reduce((s, it) => s + (Number(it.qty) || 1), 0),
    [items]
  );

  // Server-driven surprise box (keeps surpriseItems returned by /api/surprise-box)
  const addSurpriseBox = async () => {
    try {
      const res = await fetch("/api/surprise-box");
      if (!res.ok) {
        console.error("addSurpriseBox: server responded", res.status);
        return false;
      }
      const box = await res.json();

      const boxItem = {
        _id: `surprise-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        title: box.title || "🎁 Surprise Box",
        price: Number(box.discountedTotal) || Number(box.total) || 0,
        image: box.image ?? "/mystery-box.png",
        qty: 1,
        // expect server to return items array with {_id,title,price,image}
        surpriseItems: box.items ?? box.products ?? [],
      };

      setItems((prev) => [...prev, boxItem]);
      return true;
    } catch (err) {
      console.error("addSurpriseBox error:", err);
      return false;
    }
  };

  return (
    <Ctx.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQty,
        decreaseQty,
        addSurpriseBox,
        clearCart,
        total,
        count,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
