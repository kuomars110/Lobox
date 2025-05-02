import React, { forwardRef } from "react";
import { MultiSelectProps } from "./types";
import { useMultiSelect } from "./useMultiSelect";
import Trigger from "./Trigger";
import OptionsList from "./OptionsList";
import AddOption from "./AddOption";
import "../../styles/MultiSelect.scss";

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      initialSelectedOptions = [],
      placeholder = "Select options",
      onChange,
      onAddOption,
      allowAddNew = true,
      addNewPlaceholder = "Add new item...",
      maxHeight,
      className = "",
      disabled = false,
    },
    ref
  ) => {
    const {
      isOpen,
      selectedOptions,
      newOptionText,
      dropdownRef,
      inputRef,
      setNewOptionText,
      toggleOption,
      handleAddOption,
      toggleDropdown,
      isSelected,
    } = useMultiSelect({
      options,
      initialSelectedOptions,
      onChange,
      onAddOption,
    });

    const combinedRef = (node: HTMLDivElement) => {
      if (dropdownRef) {
        (dropdownRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
      }

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    return (
      <div
        className={`multi-select ${className} ${disabled ? "disabled" : ""}`}
        ref={combinedRef}
        aria-disabled={disabled}
        data-testid="multi-select-container"
      >
        <Trigger
          selectedOptions={selectedOptions}
          placeholder={placeholder}
          isOpen={isOpen}
          onClick={toggleDropdown}
          disabled={disabled}
        />

        <div
          className={`multi-select__dropdown ${isOpen ? "open" : ""}`}
          style={maxHeight ? { maxHeight: `${maxHeight}px` } : undefined}
          data-testid="multi-select-dropdown"
        >
          <OptionsList
            options={options}
            isSelected={isSelected}
            onToggle={!disabled ? toggleOption : () => {}}
          />

          {allowAddNew && !disabled && (
            <AddOption
              value={newOptionText}
              onChange={setNewOptionText}
              onKeyDown={handleAddOption}
              placeholder={addNewPlaceholder}
              inputRef={inputRef as React.RefObject<HTMLInputElement>}
            />
          )}
        </div>
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
