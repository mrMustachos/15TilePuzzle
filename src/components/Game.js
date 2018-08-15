import React from 'react';
import sizeMe from 'react-sizeme'
// import cn from 'classnames';

import styles from '../assets/sass/App.scss';

const Game = ({ boardWidth, board }) => (
	<div className={ styles.container } style={ boardWidth }>
		{
			board.map((tile, i) => {
				if (!tile.blank && !!board[i].tile) {
					const {
						user: { name, profile },
						image: { size, bgLeft, bgTop, imgUrl },
						tile: { height, fontSize },
					} = tile;

					const imgStyling = {
						width: `${size}px`,
						height: `${size}px`,
						left: `${bgLeft}px`,
						top: `${bgTop}px`,
					};
					const tileStyling = { height: `${height}px` };
					const spanStyling = { fontSize: `${fontSize}px` };

					return (
						<div
							key={ i }
							index={ i }
							className={ styles.tile }
							style={ tileStyling }
						>
							<img
								src={ imgUrl }
								alt={`${name} - ${profile}`}
								style={ imgStyling }
							/>
							<span style={ spanStyling }>{ i + 1 }</span>
						</div>
					);
				}
				return <div key={ i } index={ i } className={ styles.dead }></div>
			})
		}
	</div>
);

export default sizeMe({ monitorHeight: true })(Game);