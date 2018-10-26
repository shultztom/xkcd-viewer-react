import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";

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
      comicNum: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  submitHandler(e) {
    let comicNum = this.state.comicNum;
    let max = this.state.maxNum;
    if (comicNum >= 1 && comicNum <= max) {
      let intComicNum = parseInt(comicNum, 10);
      if (intComicNum === 404) {
        this.setState({
          day: null,
          month: null,
          year: null,
          title: "404 - Comic Not Found",
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
        title: comicNum + " is not a valid comic",
        img: null,
        alt: null,
        loaded: false,
        error: true,
        num: comicNum
      });
    }

    this.setState({ comicNum: "" });
    e.preventDefault();
  }

  changeHandler(e) {
    this.setState({ comicNum: e.target.value });
  }

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
        console.log(response.status);
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

  Content(props) {
    if (props.loaded && !props.error) {
      const month = props.month;
      const day = props.day;
      const year = props.year;
      const img = props.img;
      const alt = props.alt;
      const title = props.title;
      const num = props.num;

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
    } else if (!props.loaded && !props.error) {
      return (
        <div className="content">
          <h1>Loading...</h1>
        </div>
      );
    } else if (props.error) {
      return (
        <div className="content">
          <h1>Error</h1>
          <h4>{props.title}</h4>
        </div>
      );
    }
  }

  FirstEverComicButton(loaded, num) {
    if (loaded && num !== 1) {
      return (
        <button
          className="btn btn-info btn-responsive"
          onClick={() => this.fetchComic(1)}
        >
          |&lt;
        </button>
      );
    } else if (loaded && num === 1) {
      return <button className="btn btn-info btn-responsive">|&lt;</button>;
    } else {
      return <div className="randomButtonPlaceHolder" />;
    }
  }

  PreviousComicButton(loaded, maxNum, num) {
    let nextComic;

    if (loaded && 1 < num) {
      nextComic = num - 1;
      if (nextComic === 404) {
        nextComic--;
      }
      return (
        <button
          className="btn btn-info btn-responsive"
          onClick={() => this.fetchComic(nextComic)}
        >
          &lt; Prev
        </button>
      );
    } else if (loaded && num === 1) {
      return <button className="btn btn-info btn-responsive">&lt; Prev</button>;
    } else {
      nextComic = 1;
    }
  }

  RandomComicButton(loaded, maxNum) {
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
    let max = maxNum;

    let randomComic = getRandomInt(min, max);
    if (loaded) {
      return (
        <button
          className="btn btn-info btn-responsive"
          onClick={() => this.fetchComic(randomComic)}
        >
          Random
        </button>
      );
    } else {
      return <div className="randomButtonPlaceHolder" />;
    }
  }

  NextComicButton(loaded, maxNum, num) {
    let max = maxNum;
    let nextComic;

    if (loaded && num < max) {
      nextComic = num + 1;
      if (nextComic === 404) {
        nextComic++;
      }
      return (
        <button
          className="btn btn-info btn-responsive"
          onClick={() => this.fetchComic(nextComic)}
        >
          Next &gt;
        </button>
      );
    } else if (loaded && maxNum >= num) {
      return <button className="btn btn-info btn-responsive">Next &gt;</button>;
    } else {
      nextComic = maxNum;
    }
  }

  MostRecentComicButton(loaded, maxNum, num) {
    let nextComic = maxNum;

    if (loaded && num !== maxNum) {
      return (
        <button
          className="btn btn-info btn-responsive"
          onClick={() => this.fetchComic(nextComic)}
        >
          &gt;|
        </button>
      );
    } else if (loaded && num === maxNum) {
      return <button className="btn btn-info btn-responsive">&gt;|</button>;
    } else {
      return <div className="randomButtonPlaceHolder" />;
    }
  }

  SearchContainer(error) {
    if (error) {
      return (
        <div className="searchContainer">
          <Navbar color="light" light expand="md">
            <NavbarBrand onClick={() => window.location.reload()}>
              Home
            </NavbarBrand>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div className="searchContainer">
          <Navbar color="light" light expand="md">
            <NavbarBrand onClick={() => window.location.reload()}>
              Home
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Form className="form-inline" onSubmit={this.submitHandler}>
                    <FormGroup>
                      <Input
                        type="number"
                        name="comicNum"
                        id="comicNum"
                        placeholder="Enter a comic number"
                        value={this.state.comicNum}
                        onChange={this.changeHandler}
                      />
                      <Button type="button" onClick={this.submitHandler}>
                        Submit
                      </Button>
                    </FormGroup>
                  </Form>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        {this.SearchContainer(this.state.error)}
        <this.Content
          day={this.state.day}
          month={this.state.month}
          year={this.state.year}
          title={this.state.title}
          img={this.state.img}
          alt={this.state.alt}
          num={this.state.num}
          loaded={this.state.loaded}
          error={this.state.error}
        />
        <div className="buttonContainer">
          {this.FirstEverComicButton(this.state.loaded, this.state.num)}
          {this.PreviousComicButton(
            this.state.loaded,
            this.state.maxNum,
            this.state.num
          )}
          {this.RandomComicButton(this.state.loaded, this.state.maxNum)}
          {this.NextComicButton(
            this.state.loaded,
            this.state.maxNum,
            this.state.num
          )}
          {this.MostRecentComicButton(
            this.state.loaded,
            this.state.maxNum,
            this.state.num
          )}
        </div>
      </div>
    );
  }
}

export default App;
