import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import "./CartDrawer.css";
import { Rose } from "lucide-react";

const CartDrawer = () => {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen, totalPrice } =
    useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isCartOpen ? " cart-overlay--visible" : ""}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`cart-drawer${isCartOpen ? " cart-drawer--open" : ""}`}>
        <div className="cart-drawer__header">
          <h2>Корзинка</h2>
          <button className="cart-item__x" onClick={() => setIsCartOpen(false)}>
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer__empty">
            <Rose />
            <p>Тут поки порожньо</p>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__price">
                      {item.quantity} × {item.price} UAH
                    </p>
                  </div>
                  <button
                    className="cart-item__x"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <p className="cart-drawer__total">Разом: {totalPrice} UAH</p>
              <button
                className="cart-drawer__checkout"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/checkout");
                }}
              >
                Оформити замовлення
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
