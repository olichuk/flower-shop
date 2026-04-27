import { describe, it, expect } from "vitest";

const filterFlowers = (flowers, activeTab, search) => {
  return flowers.filter((f) => {
    const matchesTab =
      activeTab === "Усі" ||
      f.category?.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      !search || f.name?.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });
};

const mockFlowers = [
  { id: "1", name: "Червона троянда", category: "Троянди", price: 85 },
  { id: "2", name: "Рожевий тюльпан", category: "Тюльпани", price: 55 },
  { id: "3", name: "Соняшник", category: "Польові", price: 65 },
  { id: "4", name: "Букет Ніжний ранок", category: "Букети", price: 420 },
];

describe("Фільтрація каталогу", () => {
  it('показує всі квіти при табі "Усі"', () => {
    const result = filterFlowers(mockFlowers, "Усі", "");
    expect(result).toHaveLength(4);
  });

  it('фільтрує по категорії "Троянди"', () => {
    const result = filterFlowers(mockFlowers, "Троянди", "");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Червона троянда");
  });

  it("фільтрує по пошуку без урахування регістру", () => {
    const result = filterFlowers(mockFlowers, "Усі", "соняшник");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("повертає порожній масив якщо нічого не знайдено", () => {
    const result = filterFlowers(mockFlowers, "Усі", "орхідея");
    expect(result).toHaveLength(0);
  });

  it("комбінує фільтр категорії і пошук", () => {
    const result = filterFlowers(mockFlowers, "Букети", "ніжний");
    expect(result).toHaveLength(1);
  });
});
