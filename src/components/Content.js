import React, { Component } from "react";

export class Content extends Component {
  render() {
    if (this.props.loaded && !this.props.error) {
      const month = this.props.month;
      const day = this.props.day;
      const year = this.props.year;
      const img = this.props.img;
      const alt = this.props.alt;
      const title = this.props.title;
      const num = this.props.num;

      return (
        <div className="content">
          <p>
            Comic Date: {month} / {day} /{year}
          </p>
          <div className="imageContainer">
            <img className="img-fluid" src={img} alt={alt} key={num} />
          </div>
          <div className="titleAndAltContainer">
            <h2>Title:</h2>
            <h4>{title}</h4>
            <br />
            <h5>Alt Text:</h5>
            <p>{alt}</p>
            <h5>Comic Number:</h5>
            <p>{num}</p>
          </div>
        </div>
      );
    } else if (!this.props.loaded && !this.props.error) {
      return (
        <div className="content">
          <h1>Loading...</h1>
        </div>
      );
    } else if (this.props.error) {
      return (
        <div className="content">
          <h1>Error</h1>
          <h4>{this.props.errMessage}</h4>
        </div>
      );
    }
  }
}

export default Content;
