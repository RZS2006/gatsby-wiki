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
						published
					}
					id
				}
			}
		}
	`);

	const articles = result.data.allMarkdownRemark.nodes.filter(
		article => article.frontmatter.published
	);

	articles.forEach(article => {
		const articleWithoutCurrent = articles.filter(a => a.id !== article.id);
		const relatedArticleIndexes = articleWithoutCurrent.filter(a =>
			a.frontmatter.categories.some(category =>
				article.frontmatter.categories.includes(category)
			)
		);
		const slicedArticles = relatedArticleIndexes.map(a => a.id).slice(0, 3);

		createPage({
			path: `/articles/${article.frontmatter.slug}`,
			component: wikiArticleTemplate,
			context: { id: article.id, relatedArticleIndexes: slicedArticles },
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
