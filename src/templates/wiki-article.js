import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const WikiArticlePage = ({ data }) => {
	const article = data.markdownRemark;

	return (
		<Layout>
			<div className="container">
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
				published
			}
			html
			id
		}
	}
`;
