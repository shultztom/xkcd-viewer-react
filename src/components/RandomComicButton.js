import React, { Component } from "react";

export class RandomComicButton extends Component {
  render() {
    //v1
    //let randomComic = 4;
    function getRandomInt(min, max) {
      let result = Math.floor(Math.random() * (max - min + 1)) + min;
      // No 404 comic, need catch here
      while (result === 404) {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      return result;
    }

    let min = 1;
    let max = this.props.maxNum;

    let randomComic = getRandomInt(min, max);
    if (this.props.loaded) {
      return (
        <button
          className="btn btn-info btn-responsive"
          onClick={() => this.props.fetchComic(randomComic)}
        >
          Random
        </button>
      );
    } else {
      return <div className="randomButtonPlaceHolder" />;
    }
  }
}

export default RandomComicButton;
