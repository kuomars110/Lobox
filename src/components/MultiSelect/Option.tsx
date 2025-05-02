import React, { memo } from "react";
import { Option as OptionType } from "./types";

interface OptionProps {
  option: OptionType;
  isSelected: boolean;
  onToggle: (option: OptionType) => void;
}

const Option: React.FC<OptionProps> = ({ option, isSelected, onToggle }) => {
  const handleClick = () => {
    onToggle(option);
  };

  return (
    <li
      className={`multi-select__option ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {option.emoji && (
        <span className="emoji" aria-hidden="true">
          {option.emoji}
        </span>
      )}
      {option.label}
      <span className="checkmark" aria-hidden="true">
        ✓
      </span>
    </li>
  );
};

export default memo(Option);
