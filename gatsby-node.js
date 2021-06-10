const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const wikiArticleTemplate = path.resolve('src/templates/wiki-article.js');
	const categoryPageTemplate = path.resolve('src/templates/category-page.js');

	const result = await graphql(`
		query {
			allMarkdownRemark {
				nodes {
					frontmatter {
						slug
						categories
					}
					id
				}
			}
		}
	`);

	const articles = result.data.allMarkdownRemark.nodes;

	articles.forEach(article => {
		createPage({
			path: `/articles/${article.frontmatter.slug}`,
			component: wikiArticleTemplate,
			context: { id: article.id },
		});
	});

	const uniqueCategories = new Set();

	articles.forEach(article => {
		article.frontmatter.categories.forEach(category => {
			uniqueCategories.add(category);
		});
	});

	Array.from(uniqueCategories).forEach(category => {
		createPage({
			path: `/categories/${category}`,
			component: categoryPageTemplate,
			context: { category },
		});
	});
};
