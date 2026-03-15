import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import CartItemList from "../componet/Dashboard/userDash/cartItemList.jsx"
import { useNavigate } from 'react-router-dom';
import {
  getCartFromStorage,
  saveCartToStorage,
  getOrdersFromStorage,
  saveOrdersToStorage
} from "../utils/localstorage.jsx";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => getCartFromStorage());

  // Whenever cartItems change we keep localStorage in sync.
  useEffect(() => {
    // LOCALSTORAGE + CART:
    // We always store the latest cart as JSON so that
    // refreshing the page or reopening the app restores the cart.
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // TOTAL PRICE:
  // Simple reduce over all cart items: sum(price * quantity).
  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleConfirmOrder = () => {
    if (!cartItems.length) {
      return;
    }

    // ORDERS:
    // 1. Read existing orders from localStorage (fallback []).
    // 2. Append a new order with items, total and timestamp.
    // 3. Save back to localStorage and clear cart.
    const existingOrders = getOrdersFromStorage();
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
    };

    saveOrdersToStorage([...existingOrders, newOrder]);
    setCartItems([]);
  };

  return (
    <div>
      {/** nav */}
      <div className="bg-[#ffffff] flex items-center gap-4 pl-[4vw] h-[8dvh]  w-full shadow-sm ">
        <button onClick={() => {
          navigate(-1)
        }}> <ChevronLeft /></button>

        <h1 className="font-semibold tracking-wider text-[1.3vw]">My <span className="text-[#FBA808]">cart</span></h1>

      </div>
      {/** ;list containeer */}
      <div className="bg-[#eeeef1]">
        <div className="w-full h-[80dvh]  pt-[7vh]   pb-[7vh] gap-10  flex flex-col md:flex-row justify-center " >
          <div className="bg-[#ffffff] w-full md:w-4/12 flex flex-col items-center  gap-2 overflow-hidden overflow-y-scroll rounded-[1vw] pt-[3vh] shadow-md">
            {cartItems.map((item) => (
              <CartItemList
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))}
            {!cartItems.length && (
              <p className="text-gray-500 text-sm pb-4">Your cart is empty.</p>
            )}
          </div>

          {/** order details */}
          <div className="bg-[#ffffff] w-full md:w-4/12 mt-4 md:mt-0 flex flex-col items-center gap-3 rounded-[1vw] shadow-md ">
            <h1 className="text-[#666666] font-mono tracking-wider text-[1.3vw] pt-[3vh]">Bill Details</h1>
            <div className=" bg-[#ffffff] w-[28vw] rounded-[1vw] tracking-wider shadow-lg">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between p-[1.5vw] pb-[0.5vw] "
                >
                  <h1 className="text-[#666666]">
                    {item.name} x {item.quantity}
                  </h1>
                  <h1 className="text-[#2e2e2e]">₹{item.price * item.quantity}</h1>
                </div>
              ))}
              <hr className="w-[90%] mx-auto text-[#666666]" />
              <div className="flex justify-end gap-4 p-[1vw] pr-[1.5vw]">
                <h1 className="text-[#2e2e2e]" >Total</h1>
                <h1 className="text-[#2e2e2e]">₹{total}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** footer */}
      <div className="bg-[#ffffff] h-[12vh] flex items-center justify-center">
        <button
          onClick={handleConfirmOrder}
          className="bg-[#e31837] text-white w-[95%] p-[0.5vw] rounded-[0.6vw] tracking-wider font-medium "
        >
          Order confirm
        </button>
      </div>
    </div>
  )
}

export default Cart
