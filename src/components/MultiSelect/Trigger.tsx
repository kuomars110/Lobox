import React, { memo } from "react";
import { Option } from "./types";

interface TriggerProps {
  selectedOptions: Option[];
  placeholder: string;
  isOpen: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Trigger: React.FC<TriggerProps> = ({
  selectedOptions,
  placeholder,
  isOpen,
  onClick,
  disabled = false,
}) => {
  const getTriggerText = () => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }

    if (selectedOptions.length === 1) {
      const selected = selectedOptions[0];
      return (
        <div className="selected-option">
          {selected.emoji && (
            <span className="emoji" aria-hidden="true">
              {selected.emoji}
            </span>
          )}
          {selected.label}
        </div>
      );
    }

    return `${selectedOptions.length} selected`;
  };

  return (
    <div
      className={`multi-select__trigger ${disabled ? "disabled" : ""}`}
      onClick={disabled ? undefined : onClick}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      role="combobox"
      aria-controls="multi-select-options"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (
          (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") &&
          !disabled
        ) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="trigger-content">{getTriggerText()}</div>
      <span className={`arrow ${isOpen ? "open" : ""}`} aria-hidden="true">
        ▼
      </span>
    </div>
  );
};

export default memo(Trigger);
