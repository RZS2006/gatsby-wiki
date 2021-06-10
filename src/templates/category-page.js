import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const CategoryPage = ({ pageContext, data }) => {
	const { category } = pageContext;
	const articles = data.allMarkdownRemark.nodes;

	return (
		<Layout>
			<div className="container">
				<h1>{category}</h1>
				<div>
					{articles.map(article => (
						<div key={article.id}>
							<Link to={`/articles/${article.frontmatter.slug}`}>
								<h2>{article.frontmatter.title}</h2>
							</Link>
							<p>{article.id}</p>
							<p
								dangerouslySetInnerHTML={{
									__html: article.html,
								}}
							></p>
						</div>
					))}
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
				}
				html
				id
			}
		}
	}
`;
