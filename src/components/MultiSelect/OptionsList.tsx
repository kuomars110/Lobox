import React, { memo } from "react";
import { Option as OptionType } from "./types";
import Option from "./Option";

interface OptionsListProps {
  options: OptionType[];
  isSelected: (id: string) => boolean;
  onToggle: (option: OptionType) => void;
}

const OptionsList: React.FC<OptionsListProps> = ({
  options,
  isSelected,
  onToggle,
}) => {
  if (!options.length) {
    return <div className="multi-select__empty">No options available</div>;
  }

  return (
    <ul
      className="multi-select__options"
      role="listbox"
      aria-multiselectable="true"
    >
      {options.map((option) => (
        <Option
          key={option.id}
          option={option}
          isSelected={isSelected(option.id)}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

export default memo(OptionsList);
