import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

const NotFoundPage = () => {
	return (
		<Layout>
			<div className="container">
				<h1>404</h1>
				<p>Page not found</p>
				<Link to="/">Go back to the homepage</Link>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
