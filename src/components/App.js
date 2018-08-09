import React, { Component, Fragment } from 'react';
import { WindowSize } from 'react-fns';
import styles from '../assets/sass/App.scss';
import Puzzle from '../utils/PuzzleLogic';

import Example from './Example';
import Board from './Board';
import ButtonBar from './ButtonBar';

import Unsplash, { toJson } from 'unsplash-js';
const unsplash = new Unsplash({
  applicationId: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_SECRET,
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      dimension: 4,
      size: 50,
      margin: 5,
      speed: 150,
      num_shuffles: 10,
      history: [],
      user: undefined,
      loaded: false,
      help: false,
      won: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchImage();
  }

  fetchImage(reload = false) {
    if (reload) {
      this.setState({
        history: [],
        user: undefined,
        loaded: false,
        help: false,
        won: false,
      });
    }
    unsplash.photos.getRandomPhoto({ orientation: 'squarish' })
      .then(toJson).then((json) => {
        const { user: { name, links: { html } }, urls: { small }, width, height } = json;
        const user = { name, width, height, profile: html, imgUrl: small };
        return user;
      })
      .then((user) => this.setState({ user, puzzle: Puzzle(this.state.dimension) }))
      .then(() => {
        const { dimension, size, margin } = this.state;
        let positioning = {};
        for (let i = 0; i < dimension; i++) {
          for (let j = 0; j < dimension; j++) {
            if (!(i === dimension - 1 && j === dimension - 1)) {
              const id = i * dimension + j + 1;
              const obj = {
                id: id,
                left: j * (size + margin),
                top: i * (size + margin),
                bLeft: j * (size + margin),
                bTop: i * (size + margin),
                width: size,
                height: size,
              };
              positioning[id] = obj;
            } 
          }
        }
        return positioning;
      })
      .then((positioning) => this.setState({ positioning }));
  }

  move(id, direction) {
    const { size, margin, positioning, puzzle: { Direction }} = this.state;
    let newPositioning = positioning;
    const distance = size + margin;
    switch (direction) {
      case Direction.LEFT:
        newPositioning[id].left -= distance;
        break;
      case Direction.RIGHT:
        newPositioning[id].left += distance;
        break;
      case Direction.UP:
        newPositioning[id].top -= distance;
        break;
      case Direction.DOWN:
        newPositioning[id].top += distance;
        break;
      default:
        break;
    }
    this.setState({ positioning: newPositioning });
  }

  randomMove(puzzle, lastMove) {
    const copy = this.state.history;
    const allowedMoves = puzzle.getAllowedMoves();
    let random;
    do {
      random = Math.floor(Math.random() * allowedMoves.length);
    } while (lastMove === allowedMoves[random]);
    
    const movingBlock = allowedMoves[random];
    copy.push(movingBlock)
    this.setState({ history: copy });
    const direction = puzzle.move(movingBlock);
    this.move(movingBlock, direction);
    return movingBlock;
  }

  shuffle(puzzle, times, lastMove) {
    if (times <= 0) return;
    const movedBlock = this.randomMove(puzzle, lastMove);
    setTimeout(() => {
      this.shuffle(puzzle, times - 1, movedBlock);
    }, this.state.speed);
  }

  solve(puzzle) {
    const copy = puzzle.slice();
    if (copy.length === 0) {
      return this.setState({ history: copy });
    }

    const movingBlock = copy.pop();
    const direction = this.state.puzzle.move(movingBlock);
    this.move(movingBlock, direction);

    setTimeout(() => {
      this.solve(copy);
    }, this.state.speed);
  }

  onLoad() {
    this.setState({ loaded: !this.state.loaded });
    // setTimeout(() => {
    //   this.shuffle(this.state.puzzle, this.state.num_shuffles);
    // }, (this.state.speed * 2));
  }

  handleClick(id) {
    const { puzzle, history } = this.state;
    const copy = history;
    const direction = puzzle.move(id);

    if (!!direction) {
      this.move(id, direction);
      if (copy.length > 0 && id === copy[copy.length - 1]) {
        copy.pop();
      } else {
        copy.push(id);
      }
      this.setState({ history: copy });
    }
    this.setState({ won: puzzle.isGoalState() });
  }

  renderGame() {
    const {
      loaded,
      user,
      positioning,
      size,
      margin,
      dimension,
      puzzle,
      num_shuffles,
      history,
      help,
    } = this.state;

    if (loaded) {
      return (
        <Fragment>
          <Board
            loaded={ loaded }
            positioning={ positioning }
            size={ size }
            margin={ margin }
            dimension={ dimension }
            help={ help }
            imgUrl={ this.state.user.imgUrl }
            imgSize={ (size + margin) * dimension }
            handleClick={ this.handleClick }
          />
          <ButtonBar
            shuffle={ () => this.shuffle(puzzle, num_shuffles) }
            solve={ () => this.solve(history) }
            disabled={ history.length === 0 ? true : false }
            help={ () => this.setState({ help: !help }) }
          />
        </Fragment>
      );
    } else if (user) {
      return (
        <Fragment>
          <p className={ styles.intro }>loading...</p>
          <div className={ styles.hide }>
            <img 
              src={ this.state.user.imgUrl }
              onLoad={ this.onLoad.bind(this) }
              alt={ this.state.user.profile }
            />
          </div>
        </Fragment>
      );
    } else {
      return <p className={ styles.intro }>loading...</p>;
    }
  }
  render() {
    return (
      <WindowSize render={(windowSize) => {
        return (
          <div className={ styles.App }>
            <div className={ styles.content }>
              <Example dimension={ this.state.dimension } windowSize={ windowSize }/>
              { this.renderGame() }
            </div>
            { this.state.won
              ? (<div>
                  <p className={ styles.intro }>Winner!</p>
                  <button onClick={ () => this.fetchImage(true) }>Reset</button>
                </div>)
              : null }
          </div>
        );
      }}
      />
    );
  }
}

export default App;
