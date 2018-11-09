import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import Content from "./components/Content";
import SearchContainer from "./components/SearchContainer";
import ButtonContainer from "./components/ButtonContainer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: null,
      month: null,
      year: null,
      title: null,
      img: null,
      alt: null,
      maxNum: null,
      loaded: false,
      error: false,
      isOpen: false,
      comicNum: "",
      errMessage: ""
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  submitHandler = e => {
    let comicNum = this.state.comicNum;
    let max = this.state.maxNum;
    if (comicNum >= 1 && comicNum <= max) {
      let intComicNum = parseInt(comicNum, 10);
      if (intComicNum === 404) {
        this.setState({
          day: null,
          month: null,
          year: null,
          errMessage: "404 - Comic Not Found",
          title: null,
          img: null,
          alt: null,
          loaded: false,
          error: true,
          num: comicNum
        });
      } else {
        this.fetchComic(this.state.comicNum);
      }
    } else {
      this.setState({
        day: null,
        month: null,
        year: null,
        title: null,
        errMessage: comicNum + " is not a valid comic",
        img: null,
        alt: null,
        loaded: false,
        error: true,
        num: comicNum
      });
    }

    this.setState({ comicNum: "" });
    e.preventDefault();
  };

  changeHandler = e => {
    this.setState({ comicNum: e.target.value });
  };

  fetchComic = comicNum => {
    this.setState({
      day: null,
      month: null,
      year: null,
      title: null,
      img: null,
      alt: null,
      num: null,
      loaded: false,
      maxNum: 1,
      error: false
    });
    let selectedComic = 0;
    if (typeof comicNum !== "undefined") {
      selectedComic = comicNum;
    }
    let apiStr = "https://xkcd-cors-api.herokuapp.com/api/" + selectedComic;
    axios
      .get(apiStr, {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(response => {
        //console.log(response.status);
        if (response.status === 200 && response.statusText === "OK") {
          this.setState({
            day: response.data.day,
            month: response.data.month,
            year: response.data.year,
            title: response.data.title,
            img: response.data.img,
            alt: response.data.alt,
            num: response.data.num,
            loaded: true,
            maxNum: response.data.maxNum,
            error: false,
            comicNum: ""
          });
        } else {
          this.setState({
            day: null,
            month: null,
            year: null,
            title: null,
            img: null,
            alt: null,
            loaded: false,
            maxNum: 1,
            error: true,
            comicNum: ""
          });
        }
      })
      .catch(error => {
        this.setState({
          day: null,
          month: null,
          year: null,
          title: null,
          img: null,
          alt: null,
          loaded: false,
          maxNum: 1,
          error: true,
          comicNum: ""
        });
      });
  };

  componentDidMount() {
    this.fetchComic();
  }

  render() {
    return (
      <div className="App">
        <SearchContainer
          error={this.state.error}
          toggle={this.toggle}
          isOpen={this.state.isOpen}
          submitHandler={this.submitHandler}
          comicNum={this.state.comicNum}
          changeHandler={this.changeHandler}
        />
        <Content
          day={this.state.day}
          month={this.state.month}
          year={this.state.year}
          title={this.state.title}
          img={this.state.img}
          alt={this.state.alt}
          num={this.state.num}
          loaded={this.state.loaded}
          error={this.state.error}
          errMessage={this.state.errMessage}
        />
        <ButtonContainer
          error={this.state.error}
          loaded={this.state.loaded}
          num={this.state.num}
          maxNum={this.state.maxNum}
          fetchComic={this.fetchComic}
        />
      </div>
    );
  }
}

export default App;
