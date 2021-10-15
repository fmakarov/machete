import { Link } from "gatsby";
import React from "react";

export default function SecondNav({ cats }) {
  return (
    <div className="md:flex md:flex-row flex-col items-center text-sm md:space-x-5 space-y-1 font-roboto font-medium px-5">
      {cats.map((route) => {
        return (
          <Link
            key={route.node.slug}
            to={`/cat/${route.node.slug}`}
            className="flex hover:underline"
          >
            {route.node.title}
          </Link>
        );
      })}
    </div>
  );
}
