import { Search, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ value, onChange }) {
  const navigate = useNavigate();

  // SEARCH BAR:
  // Whenever the user types, we simply call onChange with the latest value.
  // The parent (Home) then filters items using Array.filter().
  const handleInputChange = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mt-[3vh] px-[4vw] pb-[1vw] gap-3">

      {/* SEARCH */}
      <div className="flex flex-1 bg-[#FFFFFF33] text-white rounded-lg overflow-hidden">

        <input
          type="text"
          placeholder="Search Item..."
          value={value}
          onChange={handleInputChange}
          className="flex-1 pl-4 py-2 text-[4vw] md:text-[1vw] outline-none text-white bg-transparent"
        />

        <button className="px-3 ">
          <Search size={20} strokeWidth={3} />
        </button>

      </div>

      {/* CART */}
      <div className="flex justify-end">
        <button onClick={() => {
          navigate('/cart');
        }} className="bg-[#FBA808] p-[2.5vw] md:p-[0.5vw] rounded-full hover:bg-white">
          <ShoppingCart size={24} strokeWidth={1} />
        </button>

      </div>

    </div>
  )
}

export default SearchBar
