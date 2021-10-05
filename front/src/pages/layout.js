import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./header/header";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query GetCategories {
      allStrapiBrand {
        edges {
          node {
            brand
            images {
              name
              url
            }
            strapiId
          }
        }
      }
      allStrapiCategory {
        edges {
          node {
            name
            slug
            strapiId
          }
        }
      }
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
        categories={data.allStrapiCategory.edges}
        brands={data.allStrapiBrand.edges}
        cats={data.allStrapiCat.edges}
      />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
