import React, { Component } from "react";

export class PreviousComicButton extends Component {
  render() {
    let nextComic;

    if (this.props.loaded && 1 < this.props.num) {
      nextComic = this.props.num - 1;
      if (nextComic === 404) {
        nextComic--;
      }
      return (
        <button
          className="btn btn-info btn-responsive"
          onClick={() => this.props.fetchComic(nextComic)}
        >
          &lt; Prev
        </button>
      );
    } else if (this.props.loaded && this.props.num === 1) {
      return <button className="btn btn-info btn-responsive">&lt; Prev</button>;
    } else {
      nextComic = 1;
      return null;
    }
  }
}

export default PreviousComicButton;
