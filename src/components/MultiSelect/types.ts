export interface Option {
  id: string;
  label: string;
  emoji?: string;
}

export interface MultiSelectProps {
  options: Option[];
  initialSelectedOptions?: Option[];
  placeholder?: string;
  onChange?: (selectedOptions: Option[]) => void;
  onAddOption?: (newOption: Option) => void;
  allowAddNew?: boolean;
  addNewPlaceholder?: string;
  maxHeight?: number;
  className?: string;
  disabled?: boolean;
}

export interface AddOptionProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement>;
}
