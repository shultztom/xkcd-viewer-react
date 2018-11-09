import React, { Component } from "react";

export class NextComicButton extends Component {
  render() {
    let max = this.props.maxNum;
    let nextComic;

    if (this.props.loaded && this.props.num < max) {
      nextComic = this.props.num + 1;
      if (nextComic === 404) {
        nextComic++;
      }
      return (
        <button
          className="btn btn-info btn-responsive"
          onClick={() => this.props.fetchComic(nextComic)}
        >
          Next &gt;
        </button>
      );
    } else if (this.props.loaded && this.props.maxNum >= this.props.num) {
      return <button className="btn btn-info btn-responsive">Next &gt;</button>;
    } else {
      nextComic = this.props.maxNum;
      return null;
    }
  }
}

export default NextComicButton;
