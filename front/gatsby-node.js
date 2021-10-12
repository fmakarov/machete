exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      goods: allStrapiGood {
        edges {
          node {
            art
            name
            slug
            strapiId
            types {
              size
              material
              color
              price
              qty
              images {
                url
              }
            }
            cat {
              title
              slug
            }
          }
        }
      }
      cats: allStrapiCat {
        edges {
          node {
            filterOptions {
              material {
                checked
                label
              }
              size {
                checked
                label
              }
            }
            slug
            title
            strapiId
          }
        }
      }
      services: allStrapiService {
        edges {
          node {
            name
            slug
            strapiId
            description
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const goods = result.data.goods.edges;
  const cats = result.data.cats.edges;
  const services = result.data.services.edges;

  services.forEach((service) => {
    createPage({
      path: `/services/${encodeURIComponent(service.node.slug)}`,
      component: require.resolve("./src/templates/ServicePages.js"),
      context: {
        name: service.node.name,
        slug: service.node.slug,
        description: service.node.description,
      },
    });
  });

  goods.forEach((good) => {
    createPage({
      path: `/cat/${good.node.cat.slug}/${encodeURIComponent(good.node.slug)}`,
      component: require.resolve("./src/templates/ProductDetail.js"),
      context: {
        name: good.node.name,
        slug: good.node.slug,
        cat: good.node.cat,
        types: good.node.types,
        art: good.node.art,
        id: good.node.strapiId,
        good: good,
      },
    });
  });

  cats.forEach((cat) => {
    createPage({
      path: `/cat/${cat.node.slug}`,
      component: require.resolve("./src/templates/ProductList.js"),
      context: {
        name: cat.node.name,
        id: cat.node.strapiId,
        filterOptions: cat.node.filterOptions,
      },
    });
  });
};
