import React from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/CategoryTag.module.css';

const CategoryTag = ({ to, children }) => {
	return (
		<Link to={to} className={styles.tag}>
			{children}
		</Link>
	);
};

export default CategoryTag;
