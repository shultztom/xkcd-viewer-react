import React, { Component } from "react";
import FirstEverComicButton from "./FirstEverComicButton";
import PreviousComicButton from "./PreviousComicButton";
import RandomComicButton from "./RandomComicButton";
import NextComicButton from "./NextComicButton";
import MostRecentComicButton from "./MostRecentComicButton";

export class ButtonContainer extends Component {
  render() {
    if (!this.props.error) {
      return (
        <div className="buttonContainer">
          <FirstEverComicButton
            loaded={this.props.loaded}
            num={this.props.num}
            fetchComic={this.props.fetchComic}
          />
          <PreviousComicButton
            loaded={this.props.loaded}
            num={this.props.num}
            fetchComic={this.props.fetchComic}
          />
          <RandomComicButton
            loaded={this.props.loaded}
            num={this.props.num}
            fetchComic={this.props.fetchComic}
            maxNum={this.props.maxNum}
          />
          <NextComicButton
            loaded={this.props.loaded}
            num={this.props.num}
            fetchComic={this.props.fetchComic}
            maxNum={this.props.maxNum}
          />
          <MostRecentComicButton
            loaded={this.props.loaded}
            num={this.props.num}
            fetchComic={this.props.fetchComic}
            maxNum={this.props.maxNum}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ButtonContainer;
