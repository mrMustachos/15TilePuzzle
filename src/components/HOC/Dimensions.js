// import React, { Component } from 'react';
// import sizeMe from 'react-sizeme';
// import styles from '../assets/sass/Example.scss';
 
// class ExampleTile extends Component {
//   render() {
//     const { width, height } = this.props.size;
//     const setHeight = {'height': `${width}px`};
//     console.log(this.props)

//     return (
//     	<div className={ styles.tile } style={ setHeight }>
//         My size is {width || -1}px x {height || -1}px
//       </div>
//     );
//   }
// };

// export default sizeMe({ monitorHeight: true })(ExampleTile);

// // goes in the tile
// import Dimensions from './HOC/Dimensions';
// export default Dimensions(Main);


// creates HOC
import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';

// const DimensionsHOC = (WrappedComponent) => (
// 	class DimensionsHOC extends Component {
// 		render() {
// 			return (
//         <SizeMe
//           monitorHeight
//           render={({ size }) => <WrappedComponent { ...this.props }/>}
//         />
//       );
// 		}
// 	}
// );

const DimensionsHOC = (WrappedComponent) => (
  class DimensionsHOC extends Component {
    render() {
      return (
        <SizeMe
          monitorHeight
          render={({ size }) => <WrappedComponent { ...this.props }/>}
        />
      );
    }
  }
);

export default DimensionsHOC;