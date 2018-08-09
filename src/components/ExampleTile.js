import React from 'react';
import styles from '../assets/sass/Example.scss';

const ExampleTile = ({ info, tileHeight, user, size: { height, width } }) => {
	const left_offset = info % 4 !== 0 ? info % 4 : 4;
	const top_offest = info <= 4 ? 0 : info <= 8 ? 1 : info <= 12 ? 2 : info <= 16 ? 3 : undefined;

	const imgStyling = {
		width: `${width - 5}px`,
		height: `${height - 5}px`,
		left: `${-((tileHeight * left_offset) - tileHeight)}px`,
		top: `${-(tileHeight * top_offest)}px`,
	};

	const tileStyling = { height: `${tileHeight}px` };
	const spanStyling = { fontSize: `${tileHeight * .5}px` };

	return (
		<div className={ styles.tile } style={ tileStyling }>
			<img src={ user.imgUrl } alt={`Tile ${info}`} style={ imgStyling }/>
			<span style={ spanStyling }>{ info }</span>
		</div>
	);
}
 
export default ExampleTile;
