import React from "react";
import Filter from "./Filter";

export default function FunctionContainer({ filterOptions, setFilterOptions }) {
  return (
    <div className="bg-gray-100 min-w-max hidden md:block">
      <div className="px-5 py-3 bg-main text-gray-100 font-header font-semibold">
        Фильтр
      </div>
      <div className="py-5 px-4 ">
        <Filter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </div>
    </div>
  );
}
