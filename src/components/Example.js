import React from 'react';
import classNames from 'classnames';
import sizeMe from 'react-sizeme';
import _ from 'lodash';
import styles from '../assets/sass/Example.scss';

import Tile from './ExampleTile';

const Example = (props) => {
	const { dimension, size, windowSize } = props;
	const maxWidth = windowSize.height - 25;
	const currentWidth = size.width - 20;
	
	const setTileHeight = {
		height: `${currentWidth / dimension}px`,
		lineHeight: `${currentWidth / dimension}px`,
		fontSize: `${(currentWidth / dimension) * .5}px`
	};
	const setContainerWidth = { maxWidth: `${maxWidth + 20}px` };

	const renderTiles = () => {
		const tester = new Array((dimension * dimension) - 1);
		return _.map(tester, (x, i) => (
			<Tile
				sizing={ setTileHeight }
				key={ i }
				info={ i + 1 }
			/>
		));
	}

	return (
		<div className={ classNames(styles.row, styles.wafflePuzzle) } style={ setContainerWidth }>
			{ renderTiles() }
		</div>
	);
}
 
export default sizeMe({ monitorHeight: true })(Example);