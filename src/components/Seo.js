import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const Seo = ({ title, description }) => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
				}
			}
		}
	`);

	const seoTitle = title || data.site.siteMetadata.title;
	const seoDescription = description || data.site.siteMetadata.description;

	return (
		<Helmet
			htmlAttributes={{ lang: 'en' }}
			title={seoTitle}
			titleTemplate={
				title ? `%s | ${data.site.siteMetadata.title}` : null
			}
			meta={[
				{ name: 'description', content: seoDescription },
				{
					property: `og:title`,
					content: seoTitle,
				},
				{
					property: `og:description`,
					content: seoDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:title`,
					content: seoTitle,
				},
				{
					name: `twitter:description`,
					content: seoDescription,
				},
			]}
		/>
	);
};

export default Seo;
