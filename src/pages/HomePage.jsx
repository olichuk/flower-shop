import { useFlowers } from "../hooks/useFlowers";
import FlowerCard from "../components/FlowerCard";

const HomePage = () => {
  const { flowers, loading, error } = useFlowers();

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌸 Flower Shop</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {flowers.map((flower) => (
          <FlowerCard key={flower.id} flower={flower} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
