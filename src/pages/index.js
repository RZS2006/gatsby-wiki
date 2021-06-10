import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const HomePage = ({ data }) => {
	const articles = data.allMarkdownRemark.nodes;

	return (
		<Layout>
			<div className="container">
				<h1>Homepage</h1>
				<p>Welcome to Mersupedia</p>
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

export default HomePage;

export const query = graphql`
	query {
		allMarkdownRemark(
			sort: { fields: [frontmatter___createdAt], order: DESC }
		) {
			nodes {
				frontmatter {
					title
					description
					slug
					categories
					published
				}
				html
				id
			}
		}
	}
`;
