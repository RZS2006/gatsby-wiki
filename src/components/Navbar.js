import React from 'react';
import { Link } from 'gatsby';

const Navbar = () => {
	return (
		<nav>
			<span>Mersupedia</span>
			<div>
				<Link to="/">Home</Link>
				<Link to="/categories">Categories</Link>
			</div>
		</nav>
	);
};

export default Navbar;
