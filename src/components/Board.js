import React from 'react';
import _ from 'lodash';
import styles from '../assets/sass/App.scss';
import Tile from './Tile';

const Board = ({ loaded, positioning, help, imgUrl, imgSize, handleClick }) => (
	<div className={ styles.row }>
		<div className={ styles.puzzle } style={{ height: imgSize }}>{
			_.map(positioning, (img) => (
	      <Tile
	        imgUrl={ imgUrl }
	        imgSize={ imgSize }
	        help={ help }
	        img={ img }
	        key={ img.id }
	        handleClick={ handleClick }
	      />
	    ))
		}</div>
	</div>
);

export default Board;