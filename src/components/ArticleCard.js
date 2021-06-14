import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from '../styles/ArticleCard.module.css';

const ArticleCard = ({ article }) => {
	const { title, description, slug, coverImage } = article.frontmatter;

	return (
		<Link to={`/articles/${slug}`}>
			<div className={styles.articleCard}>
				{coverImage && (
					<GatsbyImage
						image={getImage(coverImage)}
						alt={title}
						className={styles.image}
					/>
				)}
				<div className={styles.cardContent}>
					<h2 className={styles.title}>{title}</h2>
					<p className={styles.description}>
						{description.trim() || article.excerpt}
					</p>
				</div>
			</div>
			<span>{article.id}</span>
		</Link>
	);
};

export default ArticleCard;
