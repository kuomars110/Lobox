import { useState, useEffect, useCallback, useRef } from "react";
import { Option } from "./types";

interface UseMultiSelectProps {
  options: Option[];
  initialSelectedOptions?: Option[];
  onChange?: (selectedOptions: Option[]) => void;
  onAddOption?: (newOption: Option) => void;
}

export const useMultiSelect = ({
  options,
  initialSelectedOptions = [],
  onChange,
  onAddOption,
}: UseMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    initialSelectedOptions
  );
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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const toggleOption = useCallback(
    (option: Option) => {
      setSelectedOptions((prevSelected) => {
        const isSelected = prevSelected.some((item) => item.id === option.id);
        let updatedSelection;

        if (isSelected) {
          updatedSelection = prevSelected.filter(
            (item) => item.id !== option.id
          );
        } else {
          updatedSelection = [...prevSelected, option];
        }

        if (onChange) {
          onChange(updatedSelection);
        }

        return updatedSelection;
      });
    },
    [onChange]
  );

  const handleAddOption = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    },
    [newOptionText, onAddOption, toggleOption]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const isSelected = useCallback(
    (optionId: string) => {
      return selectedOptions.some((option) => option.id === optionId);
    },
    [selectedOptions]
  );

  return {
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
  };
};
