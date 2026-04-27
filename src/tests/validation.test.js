import { describe, it, expect } from "vitest";

// Валідація телефону
const isValidPhone = (phone) => {
  const cleaned = phone.replace(/\s/g, "");
  return /^\+380\d{9}$/.test(cleaned);
};

// Валідація номера карти
const isValidCard = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, "");
  return cleaned.length === 16 && /^\d+$/.test(cleaned);
};

// Валідація CVV
const isValidCvv = (cvv) => /^\d{3}$/.test(cvv);

// Розрахунок суми з доставкою
const calcTotalWithDelivery = (total, deliveryPrice = 0) =>
  total + deliveryPrice;

// Форматування ціни
const formatPrice = (price) => `${price} ₴`;

describe("Валідація телефону", () => {
  it("приймає коректний номер +380671234567", () => {
    expect(isValidPhone("+380671234567")).toBe(true);
  });

  it("відхиляє номер без +380", () => {
    expect(isValidPhone("0671234567")).toBe(false);
  });

  it("відхиляє надто короткий номер", () => {
    expect(isValidPhone("+38067123")).toBe(false);
  });
});

describe("Валідація карти", () => {
  it("приймає коректний 16-значний номер", () => {
    expect(isValidCard("1234 5678 9012 3456")).toBe(true);
  });

  it("відхиляє номер з літерами", () => {
    expect(isValidCard("1234 abcd 9012 3456")).toBe(false);
  });

  it("відхиляє номер коротший за 16 цифр", () => {
    expect(isValidCard("1234 5678")).toBe(false);
  });

  it("перевіряє CVV — 3 цифри", () => {
    expect(isValidCvv("123")).toBe(true);
    expect(isValidCvv("12")).toBe(false);
    expect(isValidCvv("abc")).toBe(false);
  });
});

describe("Розрахунки замовлення", () => {
  it("рахує суму без доставки", () => {
    expect(calcTotalWithDelivery(500)).toBe(500);
  });

  it("рахує суму з доставкою", () => {
    expect(calcTotalWithDelivery(500, 150)).toBe(650);
  });

  it("форматує ціну з символом гривні", () => {
    expect(formatPrice(85)).toBe("85 ₴");
    expect(formatPrice(0)).toBe("0 ₴");
  });
});
