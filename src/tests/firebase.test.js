import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Мокаємо Firebase повністю ──
vi.mock("../firebase", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
}));

import { collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";

// ── Тести ──
describe("Firebase — робота з замовленнями (mock)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getDocs викликається при завантаженні замовлень", async () => {
    // Stub — повертає фейкові дані
    getDocs.mockResolvedValue({
      docs: [
        { id: "1", data: () => ({ status: "new", total: 500 }) },
        { id: "2", data: () => ({ status: "done", total: 300 }) },
      ],
    });

    const snapshot = await getDocs();
    const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(orders).toHaveLength(2);
    expect(orders[0].status).toBe("new");
  });

  it("addDoc викликається при створенні замовлення", async () => {
    addDoc.mockResolvedValue({ id: "new-order-123" });

    const result = await addDoc(collection(), {
      status: "new",
      total: 850,
      firstName: "Оля",
    });

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(result.id).toBe("new-order-123");
  });

  it("deleteDoc викликається при видаленні замовлення", async () => {
    deleteDoc.mockResolvedValue(undefined);

    await deleteDoc("orders/order-1");

    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith("orders/order-1");
  });
});
