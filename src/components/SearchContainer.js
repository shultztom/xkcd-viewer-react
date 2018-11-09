import React, { Component } from "react";
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

export class SearchContainer extends Component {
  render() {
    if (this.props.error) {
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
            <NavbarToggler onClick={this.props.toggle} />
            <Collapse isOpen={this.props.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Form
                    className="form-inline"
                    onSubmit={this.props.submitHandler}
                  >
                    <FormGroup>
                      <Input
                        type="number"
                        name="comicNum"
                        id="comicNum"
                        placeholder="Enter a comic number"
                        value={this.props.comicNum}
                        onChange={this.props.changeHandler}
                      />
                      <Button type="button" onClick={this.props.submitHandler}>
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
}

export default SearchContainer;
