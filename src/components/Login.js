import React, { Component } from "react";
import { Button,Form } from "react-bootstrap";
import {  Redirect } from 'react-router-dom';
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobileNo: "",
      redirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleChange = this.handleChange.bind(this);
  }
//   handleChange(event) {
//     this.setState({
//       value: event.target.value
//     });
//   }
  onNameChange(event) {
    this.setState({ name: event.target.value })
    console.log("name",this.state.name);
  }
  onMobileNoChange(event) {
    this.setState({ mobileNo: event.target.value })
    console.log("mobile",this.state.mobileNo);
  }
  handleSubmit(event) {
    event.preventDefault();
      console.log("name",this.state.name, this.state.mobileNo);
    if (this.state.name.length > 0 && this.state.mobileNo.length > 0 ) {
     this.setState({ redirect: true });
     console.log("redirect",this.state.redirect);
    } else {
      alert("Please Enter the Details");
      console.log("Please Enter the Details");
    }
  }
  
  render() { 
    const { redirect } = this.state;

  if (redirect) {
    console.log("redirect1",this.state.redirect);
    return <Redirect to='/home'/>;
  }
    return (
      <div>
      <center>
        <div className="Login">
          <Form onSubmit={this.handleSubmit}>

            <div className="form-group text-left">
              <label>Enter Your Name</label><br />
              <input type="text" className="form-control" aria-describedby="text"
                value={this.state.name}
                placeholder="Enter your name"
                onChange={this.onNameChange.bind(this)}
              />
            </div>
            <div className="form-group text-left ">
              <label >Enter your Mobile No.</label><br />
              <input type="number"
                className="form-control"
                id="number"
                aria-describedby="number"
                value={this.state.mobileNo}
                placeholder="Enter your mobile number"
                onChange={this.onMobileNoChange.bind(this)}
              />
            </div>
            <Button
              className="btn btn-primary"
              type="submit"
            >
              Submit
          </Button><br />
          </Form>
        </div>
      </center>
      </div>
    );
  }
}
