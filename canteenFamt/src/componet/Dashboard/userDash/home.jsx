import { useMemo, useState } from "react";
import ItemList from "./itemList.jsx"
import HomeNav from "./homeNav.jsx"
import SearchBar from './searchBar.jsx';

// Simple in-memory menu list used for search/filter and cart.
const MENU_ITEMS = [
  { id: 1, name: "Misal Pav", price: 25 },
  { id: 2, name: "Fried Rice", price: 40 },
  { id: 3, name: "Veg Sandwich", price: 30 },
  { id: 4, name: "Cheese Sandwich", price: 35 },
  { id: 5, name: "Samosa", price: 15 },
  { id: 6, name: "Tea", price: 10 },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // SEARCH LOGIC:
  // We use simple JavaScript filter() to match items by name.
  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return MENU_ITEMS;
    return MENU_ITEMS.filter((item) =>
      item.name.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className=" w-full  bg-[#0F6657]">
      {/* FIXED TOP — using your design */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0F6657]">
        <HomeNav />
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* ADD SPACE so content not hide */}
      <div className="mt-[20vh] bg-[#EDEEEF]  p-[3.5vw] min-h-[75vh] flex gap-3 flex-wrap justify-center">
        {filteredItems.map((item) => (
          <ItemList key={item.id} item={item} />
        ))}
      </div>
    </div >
  )
}

export default Home
