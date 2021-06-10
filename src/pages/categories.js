import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const CategoriesPage = ({ data }) => {
	const categories = data.allMarkdownRemark.group;

	return (
		<Layout>
			<div className="container">
				<h1>Categories</h1>
				<p>Browse many categories</p>
				<div>
					{categories.map(category => (
						<Link to={`/categories/${category.fieldValue}`}>
							{category.fieldValue} ({category.totalCount})
						</Link>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default CategoriesPage;

export const query = graphql`
	query {
		allMarkdownRemark {
			group(field: frontmatter___categories) {
				fieldValue
				totalCount
			}
		}
	}
`;
