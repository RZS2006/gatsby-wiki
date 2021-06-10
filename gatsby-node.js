const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const wikiArticleTemplate = path.resolve('src/templates/wiki-article.js');

	const result = await graphql(`
		query {
			allMarkdownRemark {
				nodes {
					frontmatter {
						slug
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
};
