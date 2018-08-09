import React from 'react';
import placementFunc from '../utils/placementFunc';
import styles from '../assets/sass/App.scss';

const Tile = ({ img, imgSize, imgUrl, help, handleClick }) => (
  <div
    style={ placementFunc(img, imgSize) }
    onClick={ () => handleClick(img.id) }
  >
    <img
      src={ imgUrl }
      alt={ `Tile ${img.id}` }
      style={ placementFunc(img, imgSize, imgUrl) }
    />
    <span className={ help ? styles.show : styles.hide }>
      { img.id }
    </span>
  </div>
);

export default Tile;