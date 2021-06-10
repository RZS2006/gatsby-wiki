import React from 'react';
import Layout from '../components/Layout';

const WikiArticlePage = () => {
	return (
		<Layout>
			<div className="container">
				<h1>Article Title</h1>
				<p>Article Description</p>
				<div dangerouslySetInnerHTML={{ __html: 'Article HTML' }}></div>
			</div>
		</Layout>
	);
};

export default WikiArticlePage;
