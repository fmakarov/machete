import { Link } from "gatsby";
import React from "react";

export default function SecondNav({ cats }) {
  return (
    <div className="flex items-center text-sm space-x-5 font-header font-semibold">
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
