// import React from 'react';
import React, { Component } from 'react';
import classNames from 'classnames';
import sizeMe from 'react-sizeme';
import _ from 'lodash';
import styles from '../assets/sass/Example.scss';

import Tile from './ExampleTile';

class Example extends Component {
	constructor() {
    super();
    this.state = {
      containerWidth: undefined,
      tileHeight: undefined,
      maxWidth: undefined,
    }
  }

  componentDidMount() {
		this.buildArr();
  }

  // componentDidUpdate() {}

  buildArr() {
  	const { dimension, margin, windowSize, size: { width }, user: { imgUrl, name, profile }} = this.props;
  	const containerWidth = windowSize.height;
		const tileHeight = (width - (margin * (dimension - 1))) / dimension;

		let result = [];
		let total = dimension * dimension - 1;
		const mogMaker = (i) => i % dimension;		

		for (let i = 1; i <= total; i++) {
			const left_offset = mogMaker(i) !== 0 ? mogMaker(i) - 1 : dimension - 1;
			const top_offest = i <= 4 ? 0 : i <= 8 ? 1 : i <= 12 ? 2 : 3;
			const boardSize = width - margin;
			const obj = {
				image: {
					imgUrl,
					width: boardSize,
					height: boardSize,
					left: -(tileHeight * left_offset),
					top: -(tileHeight * top_offest),
				},
				tile: {
					height: tileHeight,
					fontSize: tileHeight * .5,
				},
				user: { name, profile },
			};
			result.push(obj);
		}
		this.setState({ board: result });
		// return result;
  }

	render() {
		return <div>xxx</div>
	}
}
// const Example = ({ dimension, margin, windowSize, size: { width, height }, user: { imgUrl, name, profile }}) => {

// const Example = ({ dimension, margin, windowSize, size, user: { imgUrl, name, profile }}) => {
// 	const containerWidth = windowSize.height;
// 	const tileHeight = (size.width - (margin * (dimension - 1))) / dimension;

// 	const setContainerWidth = {
// 		maxWidth: `${containerWidth}px`,
// 	};

// 	const buildArr = () => {
// 		let result = [];
// 		let total = dimension * dimension - 1;
// 		const mogMaker = (i) => i % dimension;		

// 		for (let i = 1; i <= total; i++) {
// 			const left_offset = mogMaker(i) !== 0 ? mogMaker(i) - 1 : dimension - 1;
// 			const top_offest = i <= 4 ? 0 : i <= 8 ? 1 : i <= 12 ? 2 : 3;
// 			const boardSize = size.width - margin;
// 			const obj = {
// 				image: {
// 					imgUrl,
// 					width: boardSize,
// 					height: boardSize,
// 					left: -(tileHeight * left_offset),
// 					top: -(tileHeight * top_offest),
// 				},
// 				tile: {
// 					height: tileHeight,
// 					fontSize: tileHeight * .5,
// 				},
// 				user: { name, profile },
// 			};
// 			result.push(obj);
// 		}
// 		return result;
// 	}

// 	buildArr()

// 	const renderTiles = () => {
// 		// const tester = new Array((dimension * dimension) - 1);
// 		const tester = buildArr();
// 		return _.map(tester, (x, i) => (
// 			<Tile
// 				tileHeight={ tileHeight }
// 				key={ i }
// 				info={ i + 1 }
// 				imgUrl={ imgUrl }
// 				size={ size }
// 				pooper={ x }
// 			/>
// 		));
// 	}

// 	return (
// 		<div
// 			className={ classNames(styles.row, styles.wafflePuzzle) }
// 			style={ setContainerWidth }
// 		>
// 			{ renderTiles() }
// 		</div>
// 	);
// }
 
export default sizeMe({ monitorHeight: true })(Example);