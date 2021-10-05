import React from "react";
import Nav from "./nav";
import SecondNav from "./secondNav";

const Header = ({ categories, brands, cats }) => {
  return (
    <header>
      <div className="fac">
        <div className="container mx-auto py-2">
          <Nav categories={categories} brands={brands} />
        </div>
      </div>
      <div className="bg-gray-100 py-3">
        <div className="mx-auto max-w-7xl">
          <SecondNav cats={cats} />
        </div>
      </div>
    </header>
  );
};

export default Header;
