import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./header/header";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query GetCats {
      allStrapiCat {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `);

  return (
    <div>
      <Header
        cats={data.allStrapiCat.edges}
      />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
