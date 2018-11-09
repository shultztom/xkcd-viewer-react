import React, { Component } from "react";

export class FirstEverComicButton extends Component {
  render() {
    if (this.props.loaded && this.props.num !== 1) {
      return (
        <button
          className="btn btn-info btn-responsive"
          onClick={() => this.props.fetchComic(1)}
        >
          |&lt;
        </button>
      );
    } else if (this.props.loaded && this.props.num === 1) {
      return <button className="btn btn-info btn-responsive">|&lt;</button>;
    } else {
      return <div className="randomButtonPlaceHolder" />;
    }
  }
}

export default FirstEverComicButton;
