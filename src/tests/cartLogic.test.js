import { describe, it, expect } from "vitest";

// Логіка витягнута з CartContext.jsx
const addToCart = (prev, flower) => {
  const existing = prev.find((item) => item.id === flower.id);
  if (existing) {
    return prev.map((item) =>
      item.id === flower.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }
  return [...prev, { ...flower, quantity: 1 }];
};

const removeFromCart = (prev, id) => prev.filter((item) => item.id !== id);

const calcTotalItems = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

const calcTotalPrice = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

describe("CartContext — addToCart", () => {
  it("додає новий товар з quantity: 1", () => {
    const result = addToCart([], { id: "1", name: "Троянда", price: 85 });
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(1);
  });

  it("збільшує quantity якщо товар вже є", () => {
    const cart = [{ id: "1", name: "Троянда", price: 85, quantity: 1 }];
    const result = addToCart(cart, { id: "1", name: "Троянда", price: 85 });
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it("додає різні товари як окремі позиції", () => {
    const cart = [{ id: "1", name: "Троянда", price: 85, quantity: 1 }];
    const result = addToCart(cart, { id: "2", name: "Тюльпан", price: 55 });
    expect(result).toHaveLength(2);
  });
});

describe("CartContext — removeFromCart", () => {
  it("видаляє товар за id", () => {
    const cart = [
      { id: "1", name: "Троянда", price: 85, quantity: 1 },
      { id: "2", name: "Тюльпан", price: 55, quantity: 2 },
    ];
    const result = removeFromCart(cart, "1");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("повертає порожній масив якщо видалено єдиний товар", () => {
    const cart = [{ id: "1", name: "Троянда", price: 85, quantity: 1 }];
    const result = removeFromCart(cart, "1");
    expect(result).toHaveLength(0);
  });
});

describe("CartContext — totalItems та totalPrice", () => {
  it("рахує загальну кількість одиниць", () => {
    const cart = [
      { id: "1", price: 85, quantity: 2 },
      { id: "2", price: 55, quantity: 3 },
    ];
    expect(calcTotalItems(cart)).toBe(5);
  });

  it("рахує загальну суму з урахуванням quantity", () => {
    const cart = [
      { id: "1", price: 85, quantity: 2 },
      { id: "2", price: 55, quantity: 1 },
    ];
    expect(calcTotalPrice(cart)).toBe(225);
  });

  it("повертає 0 для порожнього кошика", () => {
    expect(calcTotalItems([])).toBe(0);
    expect(calcTotalPrice([])).toBe(0);
  });
});
