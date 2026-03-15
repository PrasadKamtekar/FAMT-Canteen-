import { X } from 'lucide-react';

function CartItemList({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="w-[30vw] h-[20vh] bg-white rounded-[1vw] p-[2vh] flex shadow-md">
      <div className="w-8/20">
        <img
          src="https://thumbs.dreamstime.com/b/misal-pav-buns-smeared-butter-served-spicy-sprouts-curry-trail-mixture-chopped-onions-chilli-lemons-bun-indian-starter-171494146.jpg?w=768"
          className="h-[16vh] w-[9vw] rounded-[0.8vw]"
        />
      </div>

      <div className=" w-12/20 pl-[2vh] flex flex-col justify-evenly">
        <div className="flex justify-between">
          <h1 className="font-medium tracking-wider">
            {item.name} <br />
            <span>₹ {item.price}</span>
          </h1>
          <button
            onClick={() => onRemove?.(item.id)}
            className="text-[#e31837]"
          >
            <X strokeWidth={1.25} size={24} />
          </button>
        </div>

        {/* counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDecrease?.(item.id)}
            className="bg-[#E6F7F3] w-[2vw] rounded-[0.5vw] text-[#00AD8F] p-[0.2vw] text-[1vw] font-medium"
          >
            -
          </button>
          <h1>
            {item.quantity}
          </h1>
          <button
            onClick={() => onIncrease?.(item.id)}
            className="bg-[#E6F7F3] w-[2vw] rounded-[0.5vw] text-[#00AD8F] p-[0.2vw] text-[1vw] font-medium"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItemList
