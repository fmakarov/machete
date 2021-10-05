exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      products: allStrapiProduct {
        edges {
          node {
            art
            price
            slug
            title
            description
            strapiId
            variants {
              id
              len
              qty
              steel
              images {
                url
              }
            }
            image {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
      categories: allStrapiCategory {
        edges {
          node {
            slug
            strapiId
            name
            filterOptions {
              len {
                label
                checked
              }
              steel {
                label
                checked
              }
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

  const products = result.data.products.edges;
  const categories = result.data.categories.edges;
  const cats = result.data.cats.edges;

  products.forEach((product) => {
    createPage({
      path: `/cat/${product.node.category.slug}/${encodeURIComponent(
        product.node.slug
      )}`,
      component: require.resolve("./src/templates/ProductDetail.js"),
      context: {
        name: product.node.title,
        price: product.node.price,
        slug: product.node.slug,
        category: product.node.category,
        description: product.node.description,
        variants: product.node.variants,
        art: product.node.art,
        id: product.node.strapiId,
        product: product,
      },
    });
  });

  categories.forEach((category) => {
    createPage({
      path: `/cat/${category.node.slug}`,
      component: require.resolve("./src/templates/ProductList.js"),
      context: {
        name: category.node.name,
        id: category.node.strapiId,
        filterOptions: category.node.filterOptions,
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
