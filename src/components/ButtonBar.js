import React from 'react';
import styles from '../assets/sass/App.scss';

const ButtonBar = ({ shuffle, solve, disabled, help }) => (
  <div className={ styles.btnBar }>
    <button onClick={ shuffle }>Shuffle</button>
    {'   '}
    <button onClick={ solve } disabled={ disabled }>Solve</button>
    {'   '}
    <button onClick={ help }>Help</button>
  </div>
);

export default ButtonBar;