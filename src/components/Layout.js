import React from 'react';
import Navbar from './Navbar';
import '../styles/global.css';

const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
