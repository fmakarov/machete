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
            slug
            title
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

  goods.forEach((good) => {
    createPage({
      path: `/cat/${good.node.cat.slug}/${encodeURIComponent(
        good.node.slug
      )}`,
      component: require.resolve("./src/templates/ProductDetail.js"),
      context: {
        name: good.node.name,
        slug: good.node.slug,
        category: good.node.category,
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
        title: cat.node.title
      },
    });
  });
};
