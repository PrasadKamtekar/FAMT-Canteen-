import { getCartFromStorage, saveCartToStorage } from "../../../utils/localstorage";

function ItemList({ item }) {
  const handleAddToCart = () => {
    // CART LOGIC (ADD ITEM):
    // 1. Read current cart from localStorage (fallback to []).
    // 2. If item exists, increase quantity; otherwise push new item with quantity 1.
    // 3. Save the updated cart back to localStorage.
    const cart = getCartFromStorage();
    const existingIndex = cart.findIndex((c) => c.id === item.id);

    if (existingIndex >= 0) {
      const updated = [...cart];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1,
      };
      saveCartToStorage(updated);
    } else {
      const nextCart = [
        ...cart,
        { id: item.id, name: item.name, price: item.price, quantity: 1 },
      ];
      saveCartToStorage(nextCart);
    }
  };

  return (
    <div className="w-full sm:w-[30vw] h-[20vh] bg-white rounded-[1vw] p-[2vh] flex">
      <div className="w-8/20">
        <img
          src="https://thumbs.dreamstime.com/b/misal-pav-buns-smeared-butter-served-spicy-sprouts-curry-trail-mixture-chopped-onions-chilli-lemons-bun-indian-starter-171494146.jpg?w=768"
          className="h-[16vh] w-[9vw] rounded-[0.8vw]"
        />
      </div>

      <div className=" w-12/20 pl-[2vh] flex flex-col justify-evenly">
        <h1 className="font-semibold tracking-wider">
          {item.name} <br />
          <span>₹ {item.price}</span>
        </h1>

        <button
          onClick={handleAddToCart}
          className="bg-[#E6F7F3] w-full rounded-[0.5vw] text-[#00AD8F] p-[0.4vw] text-[0.9vw]"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ItemList