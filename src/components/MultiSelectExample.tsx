import React, { useState } from "react";
import MultiSelect, { Option } from "./MultiSelect/index";

const MultiSelectExample: React.FC = () => {
  const [categories, setCategories] = useState<Option[]>([
    { id: "science", label: "Science", emoji: "🔬" },
    { id: "education", label: "Education", emoji: "🎓" },
    { id: "art", label: "Art", emoji: "🎨" },
    { id: "sport", label: "Sport", emoji: "⚽" },
    { id: "games", label: "Games", emoji: "🎮" },
    { id: "health", label: "Health", emoji: "🏥" },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<Option[]>([
    { id: "education", label: "Education", emoji: "🎓" },
  ]);

  const handleSelectionChange = (selected: Option[]) => {
    setSelectedCategories(selected);
  };

  const handleAddCategory = (newCategory: Option) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  return (
    <div
      className="example-container"
      style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}
    >
      <h2>Select Categories</h2>
      <MultiSelect
        options={categories}
        initialSelectedOptions={selectedCategories}
        placeholder="Select a category"
        onChange={handleSelectionChange}
        onAddOption={handleAddCategory}
        allowAddNew={true}
        addNewPlaceholder="Add new category..."
      />

      <div style={{ marginTop: "20px" }}>
        <h3>Selected Categories:</h3>
        <ul>
          {selectedCategories.map((category) => (
            <li key={category.id}>
              {category.emoji && <span>{category.emoji} </span>}
              {category.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelectExample;
