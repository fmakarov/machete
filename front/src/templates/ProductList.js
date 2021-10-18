import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import ReactPaginate from "react-paginate";

import DynamicToolbar from "../components/product-list/DynamicToolbars";
import FunctionContainer from "../components/product-list/FunctionContainer";
import ListOfProducts from "../components/product-list/ListOfProducts";
import Layout from "../pages/layout";
import { alphabetic, price } from "../components/product-list/SortFunctions";

export default function ProductList({
  pageContext: { filterOptions: options, name },
  data: {
    allStrapiGood: { edges: goods },
  },
}) {
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState(options);
  const [sortOptions, setSortOptions] = useState([
    {
      label: "А-Я",
      active: true,
      function: (params) => alphabetic(params, "asc"),
    },
    {
      label: "Я-А",
      active: false,
      function: (params) => alphabetic(params, "desc"),
    },
    {
      label: "Цена ↑",
      active: false,
      function: (params) => price(params, "asc"),
    },
    {
      label: "Цена ↓",
      active: false,
      function: (params) => price(params, "desc"),
    },
  ]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    setPage(selected + 1);
  };

  let content = [];
  const selectedSort = sortOptions.filter((option) => option.active)[0];
  const sortedProducts = selectedSort.function(goods);

  sortedProducts.map((good, i) => {
    return good.node.types.map((type) =>
      content.push({ good: i, type })
    );
  });

  let isFiltered = false;
  let filters = {};
  let filteredProducts = [];

  Object.keys(filterOptions)
    .filter((option) => filterOptions[option] !== null)
    .map((option) => {
      return filterOptions[option].forEach((value) => {
        if (value.checked) {
          isFiltered = true;

          if (typeof filters[option] === "undefined") {
            filters[option] = [];
          }

          if (!filters[option].includes(value)) {
            filters[option].push(value);
          }

          content.forEach((item) => {
            if (option === "size") {
              if (
                item.type.size === value.label &&
                !filteredProducts.includes(item)
              ) {
                filteredProducts.push(item);
              }
            } else if (
              item.type[option.toLocaleLowerCase()] === value.label &&
              !filteredProducts.includes(item)
            ) {
              filteredProducts.push(item);
            }
          });
        }
      });
    });

  Object.keys(filters).forEach((filter) => {
    return filteredProducts = filteredProducts.filter((item) => {
      let valid;
      filters[filter].some((value) => {
        if (filter === "size") {
          if (item.type.size === value.label) {
            valid = item;
          }
        } else if (item.type[filter.toLocaleLowerCase()] === value.label) {
          valid = item;
        }
      });
      return valid;
    });
  });

  if (isFiltered) {
    content = filteredProducts;
  }

  const productsPerPage = 5;
  const numPages = Math.ceil(content.length / productsPerPage);

  useEffect(() => {
    setPage(1);
  }, [filterOptions]);

  return (
    <Layout>
      <div className="mx-auto container">
        <div className="md:flex md:flex-row md:space-x-5 flex-col py-10">
          <FunctionContainer
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
          <div className="flex flex-col">
            <DynamicToolbar
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              name={name}
              sortOptions={sortOptions}
              setSortOptions={setSortOptions}
            >
              {name}
            </DynamicToolbar>
            <ListOfProducts
              filterOptions={filterOptions}
              page={page}
              productsPerPage={productsPerPage}
              goods={goods}
              content={content}
            />
            <div className="flex flex-row py-5">
              <ReactPaginate
                pageCount={numPages}
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName={"pagination"}
                activeClassName={"active"}
                onPageChange={handlePageClick}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query GetCategoryGoods($id: String) {
    allStrapiGood(filter: { cat: { id: { eq: $id } } }) {
      edges {
        node {
          types {
            color
            id
            material
            brand
            color_palitre
            material_main
            product_type
            size_fraction
            price
            qty
            size
            images {
              url
            }
          }
          art
          slug
          name
          strapiId
          cat {
            slug
            title
          }
        }
      }
    }
  }
`;
