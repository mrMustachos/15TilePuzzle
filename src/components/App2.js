import React, { Component } from 'react';
import { withWindowSize } from 'react-fns';
import Unsplash, { toJson } from 'unsplash-js';
import _ from 'lodash';

import Loader from './Loader';
import Game from './Game';

import styles from '../assets/sass/App2.scss';

const unsplash = new Unsplash({
	applicationId: process.env.REACT_APP_API_KEY,
	secret: process.env.REACT_APP_SECRET,
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			hasErrored: false,
			isLoading: false,
			dimension: 4,
			margin: 5,
		};

		this.onLoad = this.onLoad.bind(this);
	}

	fetchImage() {
		this.setState({ isLoading: 'user' });
		unsplash.photos.getRandomPhoto({ orientation: 'squarish' })
			.then(toJson)
			.then((json) => {
				// const { user: { name, links: { html } }, urls: { regular }, width, height } = json;
				// const user = { name, width, height, profile: html, imgUrl: regular };
				const { user: { name, links: { html } }, urls: { regular } } = json;
				const user = { name, profile: html, imgUrl: regular };
				return user;
			})
			.then((user) => {
				const { dimension } = this.state;
				const { imgUrl, name, profile } = user;
				let result = [];

				for (let offsetTop = 0; offsetTop < dimension; offsetTop++) {
					for (let offsetLeft = 0; offsetLeft < dimension; offsetLeft++) {
						let obj = {};
						if (result.length === dimension * dimension - 1) {
							obj.blank = true;
						} else {
							obj.image = { offsetLeft, offsetTop, imgUrl };
							obj.user = { name, profile };
						}
						result.push(obj);
					}
				}
				this.setState({ user, isLoading: 'image', board: result })
			})
			.catch(() => this.setState({ hasErrored: true })
		);
	}

	onLoad() {
		this.setState({ isLoading: false });
	}

	setBoardSize = ({ width, height }) => {
		this.setState({ boardSize: { width, height } });
  }

  // setBoardSize = ({ width, height }) => {
		// const { margin, dimension } = this.state;
  updateTileSize = () => {
		const { margin, dimension, boardSize: { width } } = this.state;
		const tileSize = (width - (margin * (dimension - 1))) / dimension;
		const offsetCalc = (num) => tileSize * num === 0 ? 0 : -(tileSize * num);

		const tileSizing = _.map(this.state.board, (tile, i) => {
			if (!tile.blank) {
				return (
					_.merge({}, tile, {
				    image: {
			        size: width,
			        bgLeft: offsetCalc(tile.image.offsetLeft),
			        bgTop: offsetCalc(tile.image.offsetTop),
				    },
				    tile: {
							height: tileSize,
							fontSize: tileSize * .5,
						}
					})
				);
			}
			return tile;
		});

		// console.log(tileSizing);
		// this.setState({ boardSize: { width, height } });
		this.setState({ board: tileSizing });
  }

	componentDidMount() {
		this.fetchImage();
	}

	componentDidUpdate(prevProps, prevState) {
		const nextStateWidth = () => !!this.state.boardSize && !!this.state.boardSize.width ? this.state.boardSize.width : false;
		const prevStateWidth = () => !!prevState.boardSize && !!prevState.boardSize.width ? prevState.boardSize.width : false;

	  if (nextStateWidth() !== prevStateWidth()) {
	    this.updateTileSize();
	  }
	}

	renderGame() {
		const { hasErrored, isLoading, user, board } = this.state;
		if (hasErrored) return <p>Sorry! There was an error loading the page :(</p>;
		if (!!isLoading) return <Loader { ...user } isLoading={ isLoading } onLoad={ this.onLoad } />;
		return <Game boardWidth={{ maxWidth: `${this.props.height}px` }} board={ board } onSize={ this.setBoardSize } />;
	}

	render() {
		return (
			<div className={ styles.App }>
				<div className={ styles.content }>
					{ this.renderGame() }
				</div>
			</div>
		);
	}
}

export default withWindowSize(App);