// Default demo users that we store once in localStorage.
export const users = [
  { username: "cust1", password: "123" },
  { username: "cust2", password: "123" },
  { username: "cust3", password: "123" },
  { username: "cust4", password: "123" },
  { username: "cust5", password: "123" }
];

export const staff = [
  { username: "staff1", password: "123" },
  { username: "staff2", password: "123" },
  { username: "staff3", password: "123" },
  { username: "staff4", password: "123" },
  { username: "staff5", password: "123" }
];

// Small helper so JSON.parse never crashes the app.
// If the key is missing OR the JSON is invalid, we always return the fallback value.
const safeParse = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (err) {
    return fallback;
  }
};

// This only seeds demo users once – it does NOT clear or reset other localStorage keys.
export const setLocalStorage = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  if (!localStorage.getItem("staff")) {
    localStorage.setItem("staff", JSON.stringify(staff));
  }
};

// Always returns arrays so AuthContext never breaks with null/undefined.
export const getLocalStorage = () => {
  const customer = safeParse("users", users);
  const staffData = safeParse("staff", staff);
  return { customer, staff: staffData };
};

// CART HELPERS
// Cart is stored as an array of items: { id, name, price, quantity }
export const getCartFromStorage = () => {
  // If nothing is stored yet we simply return an empty array instead of crashing.
  return safeParse("cart", []);
};

export const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ORDERS HELPERS
// Orders are stored as an array of order objects so we can show simple history.
export const getOrdersFromStorage = () => {
  return safeParse("orders", []);
};

export const saveOrdersToStorage = (orders) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

