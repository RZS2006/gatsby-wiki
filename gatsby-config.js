module.exports = {
	siteMetadata: {
		title: 'Mersupedia',
		description:
			"An encyclopedia application named after Mercedes-Benz ('Mersu') C-Class, a great car",
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `wiki-articles`,
				path: `${__dirname}/src/wiki-articles/`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 1024,
						},
					},
				],
			},
		},
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
	],
};
