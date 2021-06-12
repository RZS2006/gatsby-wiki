import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import CategoryTag from '../components/CategoryTag';

const CategoriesPage = ({ data }) => {
	const categories = data.allMarkdownRemark.group;
	const sortedCategories = categories
		.sort((a, b) => a.totalCount - b.totalCount)
		.reverse();

	return (
		<Layout>
			<div className="container">
				<h1>Categories</h1>
				<p>Browse many categories</p>
				<div>
					{sortedCategories.map(category => (
						<CategoryTag
							key={category}
							to={`/categories/${category.fieldValue}`}
						>
							{category.fieldValue} ({category.totalCount})
						</CategoryTag>
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
