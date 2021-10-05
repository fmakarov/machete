import React from "react";
import Sort from "./Sort";

export default function DescriptionContainer({
  name,
  sortOptions,
  setSortOptions,
}) {
  return (
    <div className="flex flex-col">
      <div className="py-3 px-5">
        <div className="flex space-x-5 items-center">
          <div>Сортировка</div>
          <Sort sortOptions={sortOptions} setSortOptions={setSortOptions} />
        </div>
      </div>
      <div className="py-5">{name}</div>
    </div>
  );
}
