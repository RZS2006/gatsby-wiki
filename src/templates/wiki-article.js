import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';

const WikiArticlePage = ({ data }) => {
	const article = data.markdownRemark;

	console.log(article.frontmatter.coverImage);

	return (
		<Layout>
			<div className="container">
				<GatsbyImage
					image={
						article.frontmatter.coverImage.childImageSharp
							.gatsbyImageData
					}
					alt="Article Cover Image"
				/>
				<h1>{article.frontmatter.title}</h1>
				<p>{article.frontmatter.description}</p>
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
				slug
				category
				coverImage {
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH)
					}
				}
				published
			}
			html
			id
		}
	}
`;
