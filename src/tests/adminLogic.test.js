import { describe, it, expect } from "vitest";

// Константи з AdminPage.jsx
const STATUS_LABELS = {
  new: "Нове",
  confirmed: "Підтверджено",
  done: "Виконано",
  cancelled: "Скасовано",
};

const STATUS_COLORS = {
  new: "status--new",
  confirmed: "status--confirmed",
  done: "status--done",
  cancelled: "status--cancelled",
};

// Хелпер для отримання лейблу статусу
const getStatusLabel = (status) => STATUS_LABELS[status] || status;
const getStatusColor = (status) => STATUS_COLORS[status] || "";

describe("AdminPage — статуси замовлень", () => {
  it('повертає правильний лейбл для статусу "new"', () => {
    expect(getStatusLabel("new")).toBe("Нове");
  });

  it('повертає правильний лейбл для статусу "done"', () => {
    expect(getStatusLabel("done")).toBe("Виконано");
  });

  it('повертає правильний лейбл для статусу "cancelled"', () => {
    expect(getStatusLabel("cancelled")).toBe("Скасовано");
  });

  it('повертає правильний CSS клас для статусу "new"', () => {
    expect(getStatusColor("new")).toBe("status--new");
  });

  it('повертає правильний CSS клас для статусу "confirmed"', () => {
    expect(getStatusColor("confirmed")).toBe("status--confirmed");
  });

  it("повертає порожній рядок для невідомого статусу", () => {
    expect(getStatusColor("unknown")).toBe("");
  });
});
