import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import CategoryTag from '../components/CategoryTag';
import ArticleCard from '../components/ArticleCard';
import * as styles from '../styles/WikiArticlePage.module.css';

const WikiArticlePage = ({ data }) => {
	const article = data.markdownRemark;
	const {
		title,
		description,
		categories,
		coverImage,
		updatedAt,
	} = article.frontmatter;
	const relatedArticles = data.allMarkdownRemark.nodes;

	return (
		<Layout>
			<Seo
				title={title}
				description={description.trim() || article.excerpt}
			/>
			<div className="container">
				{coverImage && (
					<GatsbyImage
						image={getImage(coverImage)}
						alt={title}
						className={styles.image}
					/>
				)}
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.description}>
					{description.trim() || article.excerpt}
				</p>
				<div>
					{categories.map(category => (
						<CategoryTag
							key={category}
							to={`/categories/${category}`}
						>
							{category}
						</CategoryTag>
					))}
				</div>
				<p className={styles.date}>Last updated: {updatedAt}</p>
				<div
					dangerouslySetInnerHTML={{ __html: article.html }}
					className={styles.markdown}
				></div>

				{relatedArticles.length > 0 && (
					<div className={styles.relatedArticles}>
						<h2>Related Articles</h2>
						{relatedArticles.map(
							article =>
								article.frontmatter.published && (
									<ArticleCard
										key={article.id}
										article={article}
									/>
								)
						)}
					</div>
				)}
			</div>
		</Layout>
	);
};

export default WikiArticlePage;

export const query = graphql`
	query WikiArticleById($id: String!, $relatedArticleIndexes: [String!]!) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___createdAt], order: DESC }
			filter: { id: { in: $relatedArticleIndexes } }
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
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				description
				categories
				coverImage {
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.77)
					}
				}
				updatedAt(formatString: "ddd, D MMMM YYYY")
				published
			}
			excerpt
			html
			id
		}
	}
`;
