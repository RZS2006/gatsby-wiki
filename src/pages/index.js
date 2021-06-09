import React from 'react';
import { graphql } from 'gatsby';
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
							<h2>Post - {article.id}</h2>
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
		allMarkdownRemark {
			nodes {
				html
				id
			}
		}
	}
`;
