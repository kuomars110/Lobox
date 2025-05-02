import React, { useState, useRef, useEffect } from "react";
import "../styles/MultiSelect.scss";

export interface Option {
  id: string;
  label: string;
  emoji?: string;
}

interface MultiSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (selectedOptions: Option[]) => void;
  onAddOption?: (newOption: Option) => void;
  allowAddNew?: boolean;
  addNewPlaceholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = "Select options",
  onChange,
  onAddOption,
  allowAddNew = true,
  addNewPlaceholder = "Add new item...",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [newOptionText, setNewOptionText] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (option: Option) => {
    let updatedSelection;

    if (selectedOptions.some((item) => item.id === option.id)) {
      updatedSelection = selectedOptions.filter(
        (item) => item.id !== option.id
      );
    } else {
      updatedSelection = [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelection);

    if (onChange) {
      onChange(updatedSelection);
    }
  };

  const handleAddOption = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newOptionText.trim() !== "") {
      const newOption: Option = {
        id: `new-${Date.now()}`,
        label: newOptionText.trim(),
      };

      if (onAddOption) {
        onAddOption(newOption);
      }

      toggleOption(newOption);
      setNewOptionText("");
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    if (!isOpen && allowAddNew) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const isSelected = (optionId: string) => {
    return selectedOptions.some((option) => option.id === optionId);
  };

  const getTriggerText = () => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }

    if (selectedOptions.length === 1) {
      const selected = selectedOptions[0];
      return (
        <div className="selected-option">
          {selected.emoji && <span className="emoji">{selected.emoji}</span>}
          {selected.label}
        </div>
      );
    }

    return `${selectedOptions.length} selected`;
  };

  return (
    <div className="multi-select" ref={dropdownRef}>
      <div className="multi-select__trigger" onClick={toggleDropdown}>
        <div className="trigger-content">{getTriggerText()}</div>
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>

      <div className={`multi-select__dropdown ${isOpen ? "open" : ""}`}>
        <ul className="multi-select__options">
          {options.map((option) => (
            <li
              key={option.id}
              className={`multi-select__option ${
                isSelected(option.id) ? "selected" : ""
              }`}
              onClick={() => toggleOption(option)}
            >
              {option.emoji && <span className="emoji">{option.emoji}</span>}
              {option.label}
              <span className="checkmark">✓</span>
            </li>
          ))}
        </ul>

        {allowAddNew && (
          <div className="multi-select__input-container">
            <input
              ref={inputRef}
              type="text"
              value={newOptionText}
              onChange={(e) => setNewOptionText(e.target.value)}
              onKeyDown={handleAddOption}
              placeholder={addNewPlaceholder}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
