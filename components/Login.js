import React, { Component } from "react";
import { Button,Form } from "react-bootstrap";
import {  Redirect } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import Logo from './images/logo.svg';
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custname: "",
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
    this.setState({ custname: event.target.value })
    console.log("name",this.state.custname);
  }
  onMobileNoChange(event) {
    this.setState({ mobileNo: event.target.value })
    console.log("mobile",this.state.mobileNo);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("name",this.state.custname, this.state.mobileNo);
    if (this.state.custname.length > 0 && this.state.mobileNo.length > 0 ) {
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
    return <Redirect
              to={{
              pathname: "/home",
              state: { custname: this.state.custname, mobileNo: this.state.mobileNo }
              }}
          />
    
    //<Redirect to='/home'/>;
  }
    return (
      <div>
      <center>
        <div>
            <Image src={Logo}style={{width:"150px",height:"110px"}}></Image>
            <br></br>
            <p><b>Welcome</b></p>
        </div>
        <div className="Login">
          <Form onSubmit={this.handleSubmit}>
            <div className="form-group text-left">
              <input type="text" className="form-control" aria-describedby="text"
                value={this.state.custname}
                placeholder="Enter your name"
                onChange={this.onNameChange.bind(this)}
              />
            </div>
            <div className="form-group text-left ">
              <input type="number"
                className="form-control"
                id="number"
                aria-describedby="number"
                value={this.state.mobileNo}
                placeholder="Enter your mobile number"
                onChange={this.onMobileNoChange.bind(this)}
              />
              <br></br>
            </div>
            <Button
              className="btn btn-primary"
              type="submit"
              style={{backgroundColor:"rgba(10,10,10,0.8)", borderColor:"rgba(10,10,10,0.8)"}}
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
