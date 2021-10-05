import React from "react";
import Layout from "./layout";
import MainPage from "./main-page";
import SEO from "./ui/seo";

const IndexPage = () => {
  return (
      <Layout>
        <SEO title="Main" />
        <MainPage />
      </Layout>
  );
};

export default IndexPage;
