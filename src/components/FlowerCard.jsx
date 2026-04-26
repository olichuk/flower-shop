import { useNavigate } from "react-router-dom";
import rose from "../assets/red-rose.jpg";
import tulip from "../assets/pink-tulip.jpg";
import sunflower from "../assets/sunflower.jpg";
import bouquet from "../assets/bouquet.jpg";
import bouquet2 from "../assets/bouquet2.jpg";
import "./FlowerCard.css";
import { useCart } from "../hooks/useCart";
import { ShoppingBasket } from "lucide-react";

const FlowerCard = ({ flower }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const images = {
    "red-rose.jpg": rose,
    "pink-tulip.jpg": tulip,
    "bouquet.jpg": bouquet,
    "sunflower.jpg": sunflower,
    "bouquet2.jpg": bouquet2,
  };

  return (
    <div
      className="flower-card"
      onClick={() => navigate(`/product/${flower.id}`)}
    >
      <div className="flower-card__image-wrap">
        <img
          src={images[flower.imageUrl] || "<Rose/>"}
          alt={flower.name}
          className="flower-card__image"
        />
      </div>
      <div className="flower-card__body">
        <h3 className="flower-card__name">{flower.name}</h3>
        <div className="flower-card__footer">
          <span className="flower-card__price">{flower.price} UAH</span>
          <button
            className="flower-card__cart"
            aria-label="Buy"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(flower);
            }}
          >
            <ShoppingBasket />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowerCard;
