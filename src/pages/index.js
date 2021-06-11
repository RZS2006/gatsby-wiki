import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import ArticleCard from '../components/ArticleCard';

const HomePage = ({ data }) => {
	const articles = data.allMarkdownRemark.nodes;

	return (
		<Layout>
			<div className="container">
				<h1>Homepage</h1>
				<p>Welcome to Mersupedia</p>
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
