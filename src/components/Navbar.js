import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import * as styles from '../styles/Navbar.module.css';

const Navbar = () => {
	const data = useStaticQuery(graphql`
		query SiteTitle {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	const { title } = data.site.siteMetadata;

	return (
		<nav className={styles.nav}>
			<div className="container">
				<div className={styles.navContainer}>
					<span className={styles.appName}>{title}</span>
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
