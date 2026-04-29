import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Banknote, CreditCard, Rose } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import CartDrawer from '../components/CartDrawer'
import './CheckoutPage.css'
import { db } from '../services/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import rose from '../assets/red-rose.jpg'
import tulip from '../assets/pink-tulip.jpg'
import sunflower from '../assets/sunflower.jpg'
import bouquet from '../assets/bouquet.jpg'
import bouquet2 from '../assets/bouquet2.jpg'
import posthog from 'posthog-js'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, totalPrice } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [submitted, setSubmitted] = useState(false)
  const images = {
    'red-rose.jpg': rose,
    'pink-tulip.jpg': tulip,
    'bouquet.jpg': bouquet,
    'sunflower.jpg': sunflower,
    'bouquet2.jpg': bouquet2,
  }

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    recipientFirstName: '',
    recipientLastName: '',
    address: '',
    comment: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })
  useEffect(() => {
    posthog.capture('checkout_started', {
      items_count: cartItems.length,
      total_price: totalPrice,
    })
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addDoc(collection(db, 'orders'), {
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
      createdAt: serverTimestamp(),
      status: 'new',
    })
    posthog.capture('order_placed', {
      items_count: cartItems.length,
      total_price: totalPrice,
      payment_method: paymentMethod,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page">
        <div className="checkout-success">
          <div className="checkout-success__icon">
            <Rose />
          </div>
          <h2>Дякуємо за замовлення!</h2>
          <p>
            Ми зв'яжемось з вами найближчим часом, щоб узгодити деталі доставки.
          </p>
          <button
            className="checkout-success__btn"
            onClick={() => navigate('/')}
          >
            Повернутись на головну
          </button>
        </div>
        <CartDrawer />
      </div>
    )
  }

  return (
    <div className="page">
      {/* Navbar */}
      <nav className="navbar">
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-icon">
            <Rose />
          </span>
          F.LOVER
        </a>
      </nav>

      <div className="checkout-page">
        <div className="checkout-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Назад
          </button>
          <h1 className="checkout-title">Оформлення замовлення</h1>
          <p className="checkout-notice">Ваші дані захищені та зашифровані</p>

          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Блок 1 — Ваші дані */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">
                <span className="checkout-section__num">1</span>
                Ваші дані
              </h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Ім'я</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Оля"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Прізвище</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Гарник"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Номер телефону</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+380 00 000 0000"
                  required
                />
              </div>
            </div>

            {/* Блок 2 — Доставка */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">
                <span className="checkout-section__num">2</span>
                Дані доставки
              </h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Ім'я отримувача</label>
                  <input
                    name="recipientFirstName"
                    value={form.recipientFirstName}
                    onChange={handleChange}
                    placeholder="Якщо інша людина"
                  />
                </div>
                <div className="form-group">
                  <label>Прізвище отримувача</label>
                  <input
                    name="recipientLastName"
                    value={form.recipientLastName}
                    onChange={handleChange}
                    placeholder="Якщо інша людина"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Адреса доставки</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Вулиця, будинок, квартира"
                  required
                />
              </div>
              <div className="form-group">
                <label>Коментар до замовлення</label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Побажання, час доставки, листівка..."
                  rows={3}
                />
              </div>
            </div>

            {/* Блок 3 — Оплата */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">
                <span className="checkout-section__num">3</span>
                Спосіб оплати
              </h2>
              <div className="payment-options">
                <label
                  className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                  />
                  <div className="payment-option__content">
                    <span className="payment-option__icon">
                      <Banknote />
                    </span>
                    <div>
                      <p className="payment-option__title">Готівка</p>
                      <p className="payment-option__desc">
                        Оплата кур'єру при отриманні
                      </p>
                    </div>
                  </div>
                </label>

                <label
                  className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div className="payment-option__content">
                    <span className="payment-option__icon">
                      <CreditCard />
                    </span>
                    <div>
                      <p className="payment-option__title">Карта</p>
                      <p className="payment-option__desc">Visa, Mastercard</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Поля карти */}
              {paymentMethod === 'card' && (
                <div className="card-fields">
                  <div className="form-group">
                    <label>Номер карти</label>
                    <input
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Термін дії</label>
                      <input
                        name="cardExpiry"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        name="cardCvc"
                        value={form.cardCvc}
                        onChange={handleChange}
                        placeholder="•••"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-callback-notice">
              Ми передзвонимо вам для підтвердження та узгодження деталей
              доставки
            </div>

            <button type="submit" className="checkout-submit">
              Підтвердити замовлення
            </button>
          </form>
        </div>

        {/* Права колонка — підсумок */}
        <div className="checkout-right">
          <div className="order-summary">
            <h3 className="order-summary__title">Ваше замовлення</h3>

            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <img
                    src={images[item.imageUrl] || '<Rose/>'}
                    alt={item.name}
                    className="order-item__img"
                  />
                  <div className="order-item__info">
                    <p className="order-item__name">{item.name}</p>
                    <p className="order-item__qty">
                      Кількість: {item.quantity}
                    </p>
                  </div>
                  <p className="order-item__price">
                    {item.price * item.quantity} ₴
                  </p>
                </div>
              ))}
            </div>

            <div className="order-summary__divider" />

            <div className="order-summary__row">
              <span>Разом</span>
              <span>{totalPrice} ₴</span>
            </div>
            <div className="order-summary__row">
              <span>Доставка</span>
              <span className="order-summary__free">Уточнюється</span>
            </div>

            <div className="order-summary__divider" />

            <div className="order-summary__row order-summary__total">
              <span>До сплати</span>
              <span>{totalPrice} ₴</span>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer />
    </div>
  )
}
