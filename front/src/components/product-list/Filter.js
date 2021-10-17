import React from "react";

export default function Filter({ filterOptions, setFilterOptions }) {
  const handleFilter = (option, i) => {
    const newFilters = { ...filterOptions };
    newFilters[option][i].checked = !newFilters[option][i].checked;
    setFilterOptions(newFilters);
  };
  return (
    <div className="justify-around">
      <div className="flex-col px-5 space-y-4">
        {Object.keys(filterOptions)
          .filter((option) => filterOptions[option] !== null)
          .map((option) => {
            const titles = () => {
              switch (option) {
                case "brand":
                  return "Марка";
                case "color_palitre":
                  return "Цветовая палитра";
                case "material_main":
                  return "Основной материал";
                case "product_type":
                  return "Тип продукта";
                case "size_fraction":
                  return "Размер фракции (мм)";
                default:
                  return "Тип";
              }
            };
            return (
              <div key={option} className="flex flex-col">
                <div>
                  <span className="bg-gray-100 font-header font-semibold">
                    {titles()}
                  </span>
                </div>
                <div>
                  {filterOptions[option].map(({ label, checked }, i) => {
                    return (
                      <div key={label} className="row space-x-3">
                        <input
                          type="checkbox"
                          value={option}
                          checked={checked}
                          onChange={() => handleFilter(option, i)}
                        />
                        <label>{label}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
