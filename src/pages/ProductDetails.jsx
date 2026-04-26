import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Rose,
  ShoppingBasket,
  Ruler,
  Leaf,
  BookHeart,
  DropletIcon,
  Package,
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import CartDrawer from "../components/CartDrawer";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./ProductDetails.css";
import rose from "../assets/red-rose.jpg";
import tulip from "../assets/pink-tulip.jpg";
import sunflower from "../assets/sunflower.jpg";
import bouquet from "../assets/bouquet.jpg";
import bouquet2 from "../assets/bouquet2.jpg";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems, setIsCartOpen } = useCart();
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const images = {
    "red-rose.jpg": rose,
    "pink-tulip.jpg": tulip,
    "bouquet.jpg": bouquet,
    "sunflower.jpg": sunflower,
    "bouquet2.jpg": bouquet2,
  };

  useEffect(() => {
    const fetchFlower = async () => {
      const docRef = doc(db, "flowers", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFlower({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };
    fetchFlower();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(flower);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(flower);
    }
    navigate("/checkout");
  };

  if (loading) return <div className="product-page">Завантаження...</div>;
  if (!flower) return <div className="product-page">Товар не знайдено</div>;

  return (
    <div className="page">
      {/* ── Navbar (з HomePage) ── */}
      <nav className="navbar">
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-icon">
            <Rose />
          </span>
          F.LOVER
        </a>
        <div className="navbar__actions">
          <button
            className="navbar__btn navbar__cart-badge"
            aria-label="Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBasket />
            <span className="navbar__cart-count">{totalItems}</span>
          </button>
        </div>
      </nav>

      {/* ── Контент сторінки ── */}
      <div className="product-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Назад
        </button>

        <div className="product-top">
          {/* Галерея */}
          <div className="product-gallery">
            <img
              className="product-main-image"
              src={images[flower.imageUrl] || "<Rose/>"}
              alt={flower.name}
            />
            {images.length > 1 && (
              <div className="product-thumbnails">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className={`product-thumb ${i === activeThumb ? "active" : ""}`}
                    onClick={() => setActiveThumb(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Інфо */}
          <div className="product-info">
            <span className="product-category">{flower.category}</span>
            <h1 className="product-name">{flower.name}</h1>
            <p className="product-price">{flower.price} ₴</p>
            <p className="product-description">
              {flower.description || "Чудова квітка для будь-якого випадку."}
            </p>

            {flower.tags?.length > 0 && (
              <div className="product-tags">
                {flower.tags.map((tag, i) => (
                  <span key={i} className="product-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {/* Характеристики */}
            <div className="product-specs">
              {flower.stemHeight && (
                <div className="product-spec">
                  <span className="spec-label">
                    <Ruler className="spec-label-icon" /> Висота стебла
                  </span>
                  <span className="spec-value">{flower.stemHeight}</span>
                </div>
              )}
              {flower.freshDays && (
                <div className="product-spec">
                  <span className="spec-label">
                    <Leaf className="spec-label-icon" />
                    Тримається свіжою
                  </span>
                  <span className="spec-value">{flower.freshDays} днів</span>
                </div>
              )}
            </div>

            {/* Кількість */}
            <div className="quantity-row">
              <span className="quantity-label">Кількість</span>
              <div className="quantity-control">
                <button
                  className="q-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="q-value">{quantity}</span>
                <button
                  className="q-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Дві кнопки */}
            <div className="product-actions">
              <button
                className={`add-btn ${added ? "success" : ""}`}
                onClick={handleAddToCart}
              >
                {added ? "✓ Додано" : "Додати до кошика"}
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Купити зараз
              </button>
            </div>
          </div>
        </div>

        {/* Інфо картки */}
        <div className="info-cards">
          <div className="info-card">
            <div className="info-card-title">
              <BookHeart /> Нотатки флориста
            </div>
            <p className="info-card-text">
              {flower.floristNote ||
                "Кожна квітка ретельно відібрана на піку цвітіння."}
            </p>
          </div>
          <div className="info-card">
            <div className="info-card-title">
              <DropletIcon /> Догляд
            </div>
            <ul className="info-card-list">
              <li>Підрізайте стебла під кутом 45°</li>
              <li>Міняйте воду кожні 24 години</li>
              <li>Тримайте подалі від прямого сонця</li>
            </ul>
          </div>
          <div className="info-card">
            <div className="info-card-title">
              <Package /> Доставка
            </div>
            <p className="info-card-text">
              Доставляємо пн–сб з 9:00 до 17:00. Підпис при отриманні
              обов'язковий.
            </p>
          </div>
        </div>

        {/* Банер */}
        <div className="promo-banner">
          <div>
            <h2>Приєднуйся до клубу</h2>
            <p>
              Отримуй сезонні букети щомісяця та знижку 15% на всі замовлення.
            </p>
            <button className="promo-banner-btn">Дізнатись більше</button>
          </div>
        </div>
      </div>

      <CartDrawer />
    </div>
  );
}
