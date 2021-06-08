import React from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={styles.nav}>
			<div className="container">
				<div className={styles.navContainer}>
					<span class={styles.appName}>Mersupedia</span>
					<div className={styles.linkContainer}>
						<Link to="/" className={styles.link}>
							Home
						</Link>
						<Link to="/categories" className={styles.link}>
							Categories
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
