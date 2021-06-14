const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const wikiArticleTemplate = path.resolve('src/templates/wiki-article.js');
	const categoryPageTemplate = path.resolve('src/templates/category-page.js');

	const result = await graphql(`
		query {
			allMarkdownRemark(
				sort: { fields: [frontmatter___createdAt], order: DESC }
			) {
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
		// Return three related articles that have the most matching categories

		const articlesFilteredCurrent = articles.filter(
			a => a.id !== article.id
		);
		const articlesMapAmountOfMatches = articlesFilteredCurrent.map(a => {
			let count = 0;

			article.frontmatter.categories.forEach(category => {
				if (a.frontmatter.categories.includes(category)) count++;
			});

			return count;
		});

		const articlesFilteredZeroMatches = articlesFilteredCurrent.filter(
			(_, i) => articlesMapAmountOfMatches[i] > 0
		);

		const articlesSortedByMatches = articlesFilteredZeroMatches.sort(
			(a, b) =>
				articlesMapAmountOfMatches[
					articlesFilteredZeroMatches.indexOf(b)
				] -
				articlesMapAmountOfMatches[
					articlesFilteredZeroMatches.indexOf(a)
				]
		);

		const articlesSlicedIndexes = articlesSortedByMatches
			.map(a => a.id)
			.slice(0, 3);

		createPage({
			path: `/articles/${article.frontmatter.slug}`,
			component: wikiArticleTemplate,
			context: {
				id: article.id,
				relatedArticleIndexes: articlesSlicedIndexes,
			},
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
