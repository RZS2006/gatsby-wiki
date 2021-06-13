import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import * as styles from '../styles/404.module.css';

const NotFoundPage = () => {
	return (
		<Layout>
			<Seo title="404" />
			<div className="container">
				<h1>404</h1>
				<p>Page not found</p>
				<Link to="/" className={styles.link}>
					Go back to the homepage
				</Link>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
