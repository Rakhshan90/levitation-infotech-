import React from 'react';

// Define the interface for options and props
interface Option {
  id: string;
  label: string;
}

interface MultiSelectDropdownProps {
  selectedOptions: string[]; // Array of selected option IDs
  onChange: (selectedOptions: string[]) => void; // Callback for when options change
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ selectedOptions, onChange }) => {
  // Sample options for the dropdown
  const options: Option[] = [
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' },
    { id: '4', label: 'Option 4' },
  ];

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // Handle selecting an option
  const handleSelect = (option: Option) => {
    let newSelectedOptions;

    // Toggle selection logic
    if (selectedOptions.includes(option.id)) {
      newSelectedOptions = selectedOptions.filter((id) => id !== option.id);
    } else {
      newSelectedOptions = [...selectedOptions, option.label];
    }

    // Pass the updated selection to the parent component
    onChange(newSelectedOptions);
  };

  return (
    <div className="relative">
      {/* Dropdown button */}
      <button
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Display selected options */}
        <span className="truncate">
          {selectedOptions.length > 0
            ? selectedOptions.map((id) => options.find((option) => option.label === id)?.label).join(', ')
            : 'Select options'}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div key={option.id} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedOptions.includes(option.label)}
                onChange={() => handleSelect(option)}
              />
              <span className="ml-2">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
