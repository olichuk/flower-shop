import { useState } from "react";
import { useFlowers } from "../hooks/useFlowers";
import FlowerCard from "../components/FlowerCard";
import "./HomePage.css";
import { Rose, ShoppingBasket, Van, Leaf, Gift, Search } from "lucide-react";
import { useCart } from "../hooks/useCart";
import CartDrawer from "../components/CartDrawer";

const TABS = [" Усі", "Букети", "Троянди", "Тюльпани", "Польові"];

const HomePage = () => {
  const { flowers, loading, error } = useFlowers();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const { totalItems, setIsCartOpen } = useCart();

  const filtered = flowers.filter((f) => {
    const matchesTab =
      activeTab === "All" ||
      f.category?.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      !search || f.name?.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="page">
      {/* ── Navbar ── */}
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

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <span className="hero__label">Premium Floristry</span>
          <h1 className="hero__title">
            Свіжі квіти
            <br />
            для будь-якої
            <br />
            нагоди
          </h1>
          <p className="hero__subtitle">
            Доставка в той самий день. Зібрані з любов'ю професійними ручками.
          </p>
          <a href="/catalog" className="hero__cta">
            Buy now
          </a>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <div className="feature-item">
          <div className="feature-item__icon feature-item__icon--green">
            <Van />
          </div>
          <div>
            <p className="feature-item__title">Швидка доставка</p>
            <p className="feature-item__desc">
              Менше 90 хвилин і квіти вже у вас в руках!
            </p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-item__icon feature-item__icon--pink">
            <Leaf />
          </div>
          <div>
            <p className="feature-item__title">Щоденна свіжість</p>
            <p className="feature-item__desc">
              Квіти, ніби тільки що
              <br />
              зрізали з сусідської клумби!
            </p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-item__icon feature-item__icon--sage">
            <Gift />
          </div>
          <div>
            <p className="feature-item__title">Додаткові послуги</p>
            <p className="feature-item__desc">
              Привітання бабусі, вибачення перед коханою людиною,
              <br />
              милий ведмідь усе в нас є!
            </p>
          </div>
        </div>
      </section>

      {/* ── Catalog ── */}
      <section className="catalog">
        <div className="catalog__header">
          <h2 className="catalog__title">Наш каталог</h2>
          <p className="catalog__subtitle">Дослідіть наші сезонні добірки</p>

          <div className="search-bar">
            <span className="search-bar__icon">
              <Search />
            </span>
            <input
              className="search-bar__input"
              type="text"
              placeholder="Пошукай свою улюблену квітку.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`filter-tab${activeTab === tab ? " filter-tab--active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="status-message">Завантаження...</p>}
        {error && <p className="status-message">Помилка: {error}</p>}

        {!loading && !error && (
          <div className="catalog__grid">
            {filtered.map((flower) => (
              <FlowerCard key={flower.id} flower={flower} />
            ))}
          </div>
        )}
      </section>

      <CartDrawer />
    </div>
  );
};

export default HomePage;
