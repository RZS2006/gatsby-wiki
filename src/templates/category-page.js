import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import ArticleCard from '../components/ArticleCard';

const CategoryPage = ({ pageContext, data }) => {
	const { category } = pageContext;
	const articles = data.allMarkdownRemark.nodes;

	return (
		<Layout>
			<div className="container">
				<h1>{category}</h1>
				<div>
					{articles.map(
						article =>
							article.frontmatter.published && (
								<ArticleCard
									key={article.id}
									article={article}
								/>
							)
					)}
				</div>
			</div>
		</Layout>
	);
};

export default CategoryPage;

export const query = graphql`
	query WikiArticlesByCategory($category: String!) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___createdAt], order: DESC }
			filter: { frontmatter: { categories: { in: [$category] } } }
		) {
			nodes {
				frontmatter {
					title
					description
					slug
					coverImage {
						childImageSharp {
							gatsbyImageData(width: 140, aspectRatio: 1)
						}
					}
					published
				}
				excerpt
				id
			}
		}
	}
`;
