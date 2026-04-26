import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  query,
  deleteDoc,
} from "firebase/firestore";
import "./AdminPage.css";
import { Rose } from "lucide-react";

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

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
  };

  if (loading) return <div className="admin-page">Завантаження...</div>;
  const handleDelete = async (id) => {
    const confirm = window.confirm("Видалити замовлення?");
    if (!confirm) return;
    await deleteDoc(doc(db, "orders", id));
  };
  return (
    <div className="admin-page">
      <div className="admin-header">
        <Rose />
        <h1 className="admin-title">Замовлення</h1>
        <span className="admin-count">{orders.length} замовлень</span>
      </div>

      {orders.length === 0 && (
        <div className="admin-empty">Замовлень поки немає</div>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            {/* Шапка картки */}
            <div
              className="order-card__header"
              onClick={() =>
                setExpanded(expanded === order.id ? null : order.id)
              }
            >
              <div className="order-card__left">
                <span className="order-card__id">
                  #{order.id.slice(0, 6).toUpperCase()}
                </span>
                <div>
                  <p className="order-card__name">
                    {order.customer?.firstName} {order.customer?.lastName}
                  </p>
                  <p className="order-card__phone">{order.customer?.phone}</p>
                </div>
              </div>

              <div className="order-card__right">
                <span className="order-card__total">{order.totalPrice} ₴</span>
                <span className={`order-status ${STATUS_COLORS[order.status]}`}>
                  {STATUS_LABELS[order.status] || order.status}
                </span>
                <span className="order-card__arrow">
                  {expanded === order.id ? "▲" : "▼"}
                </span>
              </div>
            </div>

            {/* Деталі */}
            {expanded === order.id && (
              <div className="order-card__details">
                <div className="order-details-grid">
                  <div className="order-detail-block">
                    <p className="order-detail-label">Отримувач</p>
                    <p>
                      {order.recipient?.firstName} {order.recipient?.lastName}
                    </p>
                    <p>{order.recipient?.address}</p>
                  </div>
                  <div className="order-detail-block">
                    <p className="order-detail-label">Оплата</p>
                    <p>
                      {order.paymentMethod === "card" ? " Карта" : " Готівка"}
                    </p>
                  </div>
                  {order.comment && (
                    <div className="order-detail-block">
                      <p className="order-detail-label">Коментар</p>
                      <p>{order.comment}</p>
                    </div>
                  )}
                  <div className="order-detail-block">
                    <p className="order-detail-label">Дата</p>
                    <p>
                      {order.createdAt?.toDate().toLocaleString("uk-UA") || "—"}
                    </p>
                  </div>
                </div>

                {/* Товари */}
                <div className="order-items-list">
                  <p className="order-detail-label">Товари</p>
                  {order.items?.map((item, i) => (
                    <div key={i} className="order-item-row">
                      <span className="order-item-row__name">{item.name}</span>
                      <span className="order-item-row__qty">
                        x{item.quantity}
                      </span>
                      <span className="order-item-row__price">
                        {item.price * item.quantity} ₴
                      </span>
                    </div>
                  ))}
                </div>

                {/* Зміна статусу */}
                <div className="order-status-change">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(order.id)}
                  >
                    🗑 Видалити замовлення
                  </button>
                  <p className="order-detail-label">Змінити статус</p>
                  <div className="status-btns">
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        className={`status-btn ${order.status === key ? "status-btn--active" : ""}`}
                        onClick={() => handleStatus(order.id, key)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
