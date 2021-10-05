import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sort({ sortOptions, setSortOptions }) {
  const handleSort = (i) => {
    const newOptions = [...sortOptions];
    newOptions.map((option) => (option.active = false));
    newOptions[i].active = true;

    setSortOptions(newOptions);
  };

  return (
    <div className="justify-around">
      <div className="flex px-5 space-x-4">
        {sortOptions.map((option, i) => {
          return (
            <button
              className={classNames(
                option.active !== true
                  ? "text-gray-600 bg-gray-50 px-4 py-2"
                  : "text-black bg-gray-100 px-4 py-2"
              )}
              key={option.label}
              type="button"
              onClick={() => {
                handleSort(i);
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
