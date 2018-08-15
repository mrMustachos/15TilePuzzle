import React, { Fragment } from 'react';
import styles from '../assets/sass/App.scss';

const Loader = ({ isLoading, onLoad, imgUrl, profile, name }) => (
	<Fragment>
		<p>Loading…</p>
		{ isLoading === 'image'
			? <img className={ styles.imgLoader } src={ imgUrl } alt={`${name} - ${profile}`} onLoad={ onLoad } />
			: null
		}
	</Fragment>
);

export default Loader;