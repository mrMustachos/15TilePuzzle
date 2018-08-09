import React from 'react';
import styles from '../assets/sass/Example.scss';

const ExampleTile = ({ info, sizing }) => (
	<div className={ styles.tile } style={ sizing }>{ info }</div>
);
 
export default ExampleTile;
