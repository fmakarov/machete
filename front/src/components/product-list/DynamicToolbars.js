import React from "react";
import DescriptionContainer from "./DescriptionContainer";

export default function DynamicToolbar({ name, sortOptions, setSortOptions }) {
  return (
    <div className="flex space-x-5">
      <DescriptionContainer
        name={name}
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
      />
    </div>
  );
}
