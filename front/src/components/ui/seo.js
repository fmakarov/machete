import React from "react";
import propTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, meta, title, lang, image, imageAlt }) {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
            title
            keywords
            author
            siteUrl
            defaultImage
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const canonical = `${site.siteMetadata.siteUrl}${pathname}`;
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={[{ rel: "canonical", href: canonical }]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: "keywords",
          content: site.siteMetadata.keywords.join(),
        },
        {
          property: `og:title`,
          content: `${title} | ${site.siteMetadata.title}`,
        },
        {
          property: `og:url`,
          content: canonical,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: image || site.siteMetadata.defaultImage,
        },
        {
          property: `og:image:type`,
          content: `image/png`,
        },
        {
          property: `og:image:width`,
          content: `1200`,
        },
        {
          property: `og:image:height`,
          content: `630`,
        },
        {
          property: `og:image:alt`,
          content: imageAlt || title,
        },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: propTypes.string,
  lang: propTypes.string,
  title: propTypes.string.isRequired,
  meta: propTypes.arrayOf(propTypes.object),
  pathname: propTypes.string
};

export default SEO;
