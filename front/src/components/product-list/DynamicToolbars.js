import React from "react";
import DescriptionContainer from "./DescriptionContainer";

export default function DynamicToolbar({ name, sortOptions, setSortOptions }) {
  return (
    <div className="md:flex md:space-x-5 hidden">
      <DescriptionContainer
        name={name}
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
      />
    </div>
  );
}
