import React, { memo } from "react";
import { AddOptionProps } from "./types";

const AddOption: React.FC<AddOptionProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  inputRef,
}) => {
  return (
    <div className="multi-select__input-container">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label="Add new option"
      />
    </div>
  );
};

export default memo(AddOption);
