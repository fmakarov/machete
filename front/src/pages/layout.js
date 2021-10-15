import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Header from "../header/header";
import Footer from "../header/footer";

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
      <Header cats={data.allStrapiCat.edges} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
