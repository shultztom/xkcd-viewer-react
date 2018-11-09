import React, { Component } from "react";

export class MostRecentComicButton extends Component {
  render() {
    let nextComic = this.props.maxNum;

    if (this.props.loaded && this.props.num !== this.props.maxNum) {
      return (
        <button
          className="btn btn-info btn-responsive"
          onClick={() => this.props.fetchComic(nextComic)}
        >
          &gt;|
        </button>
      );
    } else if (this.props.loaded && this.props.num === this.props.maxNum) {
      return <button className="btn btn-info btn-responsive">&gt;|</button>;
    } else {
      return <div className="randomButtonPlaceHolder" />;
    }
  }
}

export default MostRecentComicButton;
