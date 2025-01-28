import React from 'react';

const GraphViz = (tracks, setGenres) => {
  // TODO: Implement the GraphViz component to visualize music listening data
  
  function genreLoop() {
    let genreArray = [];
    for (let i = 0; i < tracks.track.genres.length; i++) {
      genreArray.push(tracks.track.genres[i]);
    }
    setGenres(genreArray);
  }

  return (
    <>
    <br />
      <div>{tracks.track.name}</div>
      <div>{tracks.track.genres[0]}</div>
      <br />
    </>
  )
};

export default GraphViz;