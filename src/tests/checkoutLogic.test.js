import { describe, it, expect } from "vitest";

// Логіка з CheckoutPage.jsx — підготовка даних замовлення
const buildOrderData = (form, cartItems, totalPrice, paymentMethod) => ({
  customer: {
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone,
  },
  recipient: {
    firstName: form.recipientFirstName,
    lastName: form.recipientLastName,
    address: form.address,
  },
  comment: form.comment,
  paymentMethod,
  items: cartItems,
  totalPrice,
  status: "new",
});

// Перевірка чи форма заповнена (мінімальні поля)
const isFormValid = (form) => {
  return !!(form.firstName && form.lastName && form.phone && form.address);
};

const mockForm = {
  firstName: "Оля",
  lastName: "Гарнік",
  phone: "+380671234567",
  recipientFirstName: "Оля",
  recipientLastName: "Гарнік",
  address: "вул. Франка, 10",
  comment: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

const mockCart = [{ id: "1", name: "Троянда", price: 85, quantity: 2 }];

describe("CheckoutPage — формування замовлення", () => {
  it("формує коректну структуру замовлення", () => {
    const order = buildOrderData(mockForm, mockCart, 170, "cash");
    expect(order.status).toBe("new");
    expect(order.customer.firstName).toBe("Оля");
    expect(order.recipient.address).toBe("вул. Франка, 10");
    expect(order.paymentMethod).toBe("cash");
  });

  it("передає список товарів і загальну суму", () => {
    const order = buildOrderData(mockForm, mockCart, 170, "cash");
    expect(order.items).toHaveLength(1);
    expect(order.totalPrice).toBe(170);
  });

  it("підтримує оплату карткою", () => {
    const order = buildOrderData(mockForm, mockCart, 170, "card");
    expect(order.paymentMethod).toBe("card");
  });
});

describe("CheckoutPage — валідація форми", () => {
  it("повертає true для повністю заповненої форми", () => {
    expect(isFormValid(mockForm)).toBe(true);
  });

  it("повертає false якщо немає імені", () => {
    expect(isFormValid({ ...mockForm, firstName: "" })).toBe(false);
  });

  it("повертає false якщо немає адреси", () => {
    expect(isFormValid({ ...mockForm, address: "" })).toBe(false);
  });

  it("повертає false якщо немає телефону", () => {
    expect(isFormValid({ ...mockForm, phone: "" })).toBe(false);
  });
});
