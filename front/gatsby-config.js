require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Интернет-магазин строительных материалов в Казани. Купить онлайн строительные материалы с доставкой`,
    description: `Интернет магазин экспресс доставки строительных материалов`,
    author: `fedro`,
    keywords: ["строительный магазин"],
    siteUrl: `https://alifko.ru`,
    defaultImage: ""
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        // apiURL: "http://localhost:1337",
        apiURL: process.env.GATSBY_STRAPI_URL,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [`cat`, `good`, `type`, `service`],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("tailwindcss")],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
  ],
};
