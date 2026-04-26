import { describe, it, expect, vi } from "vitest";

// Сортування товарів
const sortByPrice = (items, order = "asc") => {
  return [...items].sort((a, b) =>
    order === "asc" ? a.price - b.price : b.price - a.price,
  );
};

// Пошук товару за id
const findById = (items, id) => items.find((i) => i.id === id) || null;

// Перевірка чи є товар в кошику
const isInCart = (cartItems, productId) =>
  cartItems.some((i) => i.id === productId);

// Отримання товарів по категорії
const getByCategory = (items, category) =>
  items.filter((i) => i.category === category);

const mockProducts = [
  { id: "1", name: "Троянда", category: "Троянди", price: 85 },
  { id: "2", name: "Тюльпан", category: "Тюльпани", price: 55 },
  { id: "3", name: "Соняшник", category: "Польові", price: 65 },
  { id: "4", name: "Піоноподібна троянда", category: "Троянди", price: 120 },
];

describe("Сортування товарів", () => {
  it("сортує за ціною від меншої до більшої", () => {
    const result = sortByPrice(mockProducts, "asc");
    expect(result[0].price).toBe(55);
    expect(result[result.length - 1].price).toBe(120);
  });

  it("сортує за ціною від більшої до меншої", () => {
    const result = sortByPrice(mockProducts, "desc");
    expect(result[0].price).toBe(120);
    expect(result[result.length - 1].price).toBe(55);
  });

  it("не мутує оригінальний масив", () => {
    const original = [...mockProducts];
    sortByPrice(mockProducts, "asc");
    expect(mockProducts).toEqual(original);
  });
});

describe("Пошук та фільтрація товарів", () => {
  it("знаходить товар за id", () => {
    const result = findById(mockProducts, "2");
    expect(result?.name).toBe("Тюльпан");
  });

  it("повертає null якщо товар не знайдено", () => {
    const result = findById(mockProducts, "999");
    expect(result).toBeNull();
  });

  it('отримує всі товари категорії "Троянди"', () => {
    const result = getByCategory(mockProducts, "Троянди");
    expect(result).toHaveLength(2);
  });
});

describe("Кошик — перевірка наявності товару", () => {
  const cart = [
    { id: "1", quantity: 1 },
    { id: "3", quantity: 2 },
  ];

  it("повертає true якщо товар є в кошику", () => {
    expect(isInCart(cart, "1")).toBe(true);
  });

  it("повертає false якщо товару немає в кошику", () => {
    expect(isInCart(cart, "2")).toBe(false);
  });

  // Mock — імітуємо виклик API для отримання товару
  it("викликає mock-функцію отримання товару з бази", () => {
    const mockGetFlower = vi.fn().mockReturnValue(mockProducts[0]);
    const flower = mockGetFlower("1");
    expect(mockGetFlower).toHaveBeenCalledWith("1");
    expect(flower.name).toBe("Троянда");
  });
});
