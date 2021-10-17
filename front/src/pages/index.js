import React from "react";
import Layout from "./layout";
import MainPage from "./main-page";
import SEO from "../components/ui/seo"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Главная" />
      <MainPage />
    </Layout>
  );
};

export default IndexPage;
