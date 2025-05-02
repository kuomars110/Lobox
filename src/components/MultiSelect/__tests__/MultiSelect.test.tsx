import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiSelect from "../MultiSelect";
import { Option } from "../types";

describe("MultiSelect component", () => {
  const mockOptions: Option[] = [
    { id: "option1", label: "Option 1", emoji: "🔵" },
    { id: "option2", label: "Option 2", emoji: "🟠" },
    { id: "option3", label: "Option 3", emoji: "🟢" },
  ];

  const mockOnChange = jest.fn();
  const mockOnAddOption = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with placeholder when no options are selected", () => {
    render(
      <MultiSelect options={mockOptions} placeholder="Select an option" />
    );

    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("renders with selected option when an option is selected", () => {
    render(
      <MultiSelect
        options={mockOptions}
        initialSelectedOptions={[mockOptions[0]]}
      />
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("🔵")).toBeInTheDocument();
  });

  it("shows dropdown when trigger is clicked", () => {
    render(<MultiSelect options={mockOptions} />);

    // Dropdown should be closed initially
    const dropdown = screen.getByTestId("multi-select-dropdown");
    expect(dropdown).not.toHaveClass("open");

    // Click the trigger
    fireEvent.click(screen.getByRole("combobox"));

    // Dropdown should be open now
    expect(dropdown).toHaveClass("open");
    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("selects an option when clicked", async () => {
    render(<MultiSelect options={mockOptions} onChange={mockOnChange} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole("combobox"));

    // Click an option
    fireEvent.click(screen.getByText("Option 1"));

    // Check if onChange was called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith([mockOptions[0]]);
  });

  it("deselects an option when a selected option is clicked", async () => {
    render(
      <MultiSelect
        options={mockOptions}
        initialSelectedOptions={[mockOptions[0]]}
        onChange={mockOnChange}
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByRole("combobox"));

    // Click the already selected option
    fireEvent.click(screen.getByText("Option 1"));

    // Check if onChange was called with empty array
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it("allows adding a new option by pressing Enter", async () => {
    render(
      <MultiSelect
        options={mockOptions}
        allowAddNew={true}
        onAddOption={mockOnAddOption}
        onChange={mockOnChange}
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByRole("combobox"));

    // Find the input and type a new option
    const input = screen.getByPlaceholderText("Add new item...");
    fireEvent.change(input, { target: { value: "New Option" } });

    // Press Enter to add the option
    fireEvent.keyDown(input, { key: "Enter" });

    // Check if onAddOption was called with the new option
    expect(mockOnAddOption).toHaveBeenCalledWith(
      expect.objectContaining({
        label: "New Option",
      })
    );

    // Check if onChange was called to add the new option to selected options
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ label: "New Option" })])
    );
  });

  it("closes the dropdown when clicking outside", async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <MultiSelect options={mockOptions} />
      </div>
    );

    // Open the dropdown
    fireEvent.click(screen.getByRole("combobox"));

    // Dropdown should be open
    expect(screen.getByTestId("multi-select-dropdown")).toHaveClass("open");

    // Click outside
    fireEvent.mouseDown(screen.getByTestId("outside"));

    // Dropdown should be closed
    await waitFor(() => {
      expect(screen.getByTestId("multi-select-dropdown")).not.toHaveClass(
        "open"
      );
    });
  });

  it("disables the component when disabled prop is true", () => {
    render(
      <div data-testid="container">
        <MultiSelect options={mockOptions} disabled={true} />
      </div>
    );

    // The container should have a disabled component
    const container = screen.getByTestId("container");
    expect(container.querySelector(".multi-select")).toHaveAttribute(
      "aria-disabled",
      "true"
    );

    // Clicking the trigger should not open the dropdown
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeVisible();
  });
});
