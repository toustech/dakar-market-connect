export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string; address: string };
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
  paymentMethod: "wave" | "orange-money" | "paydunya" | "cash";
  status: "en_attente" | "confirmee" | "livree" | "annulee";
};

const KEY = "marse-bi-orders";

export const getOrders = (): Order[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveOrder = (order: Order) => {
  const all = getOrders();
  all.unshift(order);
  localStorage.setItem(KEY, JSON.stringify(all));
};

export const updateOrderStatus = (id: string, status: Order["status"]) => {
  const all = getOrders().map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem(KEY, JSON.stringify(all));
};

export const newOrderId = () =>
  "MB-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
