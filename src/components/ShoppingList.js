import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Item from "./Item";
import Filter from "./Filter";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // ✅ Fetch items when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch items");
        return r.json();
      })
      .then((items) => setItems(items))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ✅ Add new item to state
  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  // ✅ Update existing item (PATCH)
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }

  // ✅ Delete an item (DELETE)
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  // ✅ Filter displayed items
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <h1>Shopping List</h1>
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
