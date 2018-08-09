import React from 'react';
import classNames from 'classnames';
import sizeMe from 'react-sizeme';
import _ from 'lodash';
import styles from '../assets/sass/Example.scss';

import Tile from './ExampleTile';

const Example = ({ dimension, margin, size, windowSize, user }) => {
	console.log(size)
	const containerWidth = windowSize.height;
	const tileHeight = (size.width - 15) / dimension;

	const setContainerWidth = {
		maxWidth: `${containerWidth}px`,
	};


	const renderTiles = () => {
		const tester = new Array((dimension * dimension) - 1);
		return _.map(tester, (x, i) => (
			<Tile
				tileHeight={ tileHeight }
				key={ i }
				info={ i + 1 }
				user={ user }
				size={ size }
			/>
		));
	}

	return (
		<div
			className={ classNames(styles.row, styles.wafflePuzzle) }
			style={ setContainerWidth }
		>
			{ renderTiles() }
		</div>
	);
}
 
export default sizeMe({ monitorHeight: true })(Example);