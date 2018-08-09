export default (img, imgSize, imgUrl = false) => {
  const { left, top, bLeft, bTop, width, height } = img;
  let style;
  if (imgUrl) {
    style = {
      top: `-${bTop}px`,
      left: `-${bLeft}px`,
      width: `${imgSize}px`,
      height: `${imgSize}px`,
    }
  } else {
    style = {
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
    }
  }
  return style;
};
