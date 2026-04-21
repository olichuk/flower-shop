import { useNavigate } from "react-router-dom";
import rose from "../assets/red-rose.jpg";
import tulip from "../assets/pink-tulip.jpg";
import sunflower from "../assets/sunflower.jpg";
import bouquet from "../assets/bouquet.jpg";

const FlowerCard = ({ flower }) => {
  const navigate = useNavigate();

  const images = {
    "red-rose.jpg": rose,
    "pink-tulip.jpg": tulip,
    "bouquet.jpg": bouquet,
    "sunflower.jpg": sunflower,
  };

  return (
    <div
      onClick={() => navigate(`/product/${flower.id}`)}
      style={{
        cursor: "pointer",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
      }}
    >
      <img
        src={images[flower.imageUrl] || "🌸"}
        alt={flower.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />
      <h3>{flower.name}</h3>
      <p>{flower.price} грн</p>
    </div>
  );
};

export default FlowerCard;
