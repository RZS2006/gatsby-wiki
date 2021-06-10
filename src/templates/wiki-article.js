import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';

const WikiArticlePage = ({ data }) => {
	const article = data.markdownRemark;
	const {
		title,
		description,
		category,
		coverImage,
		updatedAt,
	} = article.frontmatter;

	return (
		<Layout>
			<div className="container">
				{coverImage && (
					<GatsbyImage image={getImage(coverImage)} alt={title} />
				)}
				<h1>{title}</h1>
				<p>{description}</p>
				<p>Category: {category}</p>
				<p>Last updated: {new Date(updatedAt).toLocaleDateString()}</p>
				<div dangerouslySetInnerHTML={{ __html: article.html }}></div>
			</div>
		</Layout>
	);
};

export default WikiArticlePage;

export const query = graphql`
	query WikiArticleById($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				description
				category
				coverImage {
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH)
					}
				}
				updatedAt
				published
			}
			html
			id
		}
	}
`;
