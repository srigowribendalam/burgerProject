import React, { Component } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link, Redirect, Router } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import '../App.css';

import CartIcon from './images/1603110268151nachos.jpg';
import Logo from './images/logo.svg';
import Image from 'react-bootstrap/Image'


export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items:JSON.parse(this.props.location.state.selectedItems),
            custname:this.props.location.state.custname,
            mobileNo:this.props.location.state.mobileNo,
            redirect:false
        }
        console.log(this.state.items);
        
        // this.setState({
        //     items: this.props.location.state.selectedItems,
        //     custname: this.props.location.state.custname,
        //     mobileNo: this.props.location.state.mobileNo
        //     }
        // )

    }

    displayDate(){
        let dt = new Date();
        var d = dt.getDate();
        var m = dt.getMonth()+1;
        var y = dt.getFullYear();
        return  d + '-' + m + '-' + y;
    }

    componentDidMount(){
        this.state.custname = this.props.location.state.custname;
        this.state.mobileNo = this.props.location.state.mobileNo;
        this.state.items = JSON.parse(this.props.location.state.selectedItems);
    }
    handleBack = () => {
        this.setState({
            redirect: true
            })
      
    }

    submitHandler(){
        alert("Payment Successfully Completed");
    }
    totalPrice = () =>
    this.state.items.reduce(
        (sum, i) => sum + i.quantity * i.price,
        0
    )
render(){
    const {redirect} = this.state;
    if (redirect) {
        console.log("redirect2",this.state.redirect);
        console.log("selectedItems are",this.props.location.state.selectedItems)
        return <Redirect
                  to={{
                  pathname: "/home",
                  state: { custname:  this.props.location.state.custname, mobileNo:  this.props.location.state.mobileNo,items: this.props.location.state.selectedItems }
                  }}
              />
      }
        return (
            <div>


            <Container className="mt-4">
            <div>
                    <Image src={Logo}style={{marginLeft:"160px", width:"150px",height:"110px"}}></Image>
                    <Row className="alignment">
                        <Col ><p><b>Customer Name</b> {this.props.location.state.custname}</p></Col>
                        <Col><p className="ml-4"><b>Mobile No</b> {this.props.location.state.mobileNo}</p></Col>
                        <Col><p className="ml-4"><b>Date</b> <br/>{this.displayDate()}</p></Col>
                    </Row>
                    <Row>
                        <Col className="justify-content-between"><p style={{textAlign:"center", background: "rgba(10,10,10,0.2)", fontSize: 20, width:"450px"}}><b>Bill</b></p></Col>
                    </Row>
                </div>
            <Table striped bordered hover variant="dark" style={{width:"450px",height:"50px"}}>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody> {this.state.items.map((item,idx)=>
                    <tr style={{fontSize:"15px", textAlign:"left"}}>
                        <td key={idx}>{item.name}</td>
                        <td key={idx}>&#8377;{item.price}</td>
                        <td key={idx}>{item.quantity}</td>
                        <td key={idx}>&#8377;{item.price * item.quantity}</td>
                    </tr>
                )}
                    
                </tbody>
                </Table>

                <Row>
                    <Col className="justify-content-between"><p style={{textAlign:"right", background: "rgba(10,10,10,0.2)", fontSize: 15, width:"450px"}}><b>Total: {this.totalPrice()}</b></p></Col>
                </Row>
                    <Button 
                        className="btn btn-primary"
                        type="submit"
                        style={{marginLeft:"0px", backgroundColor:"rgba(10,10,10,0.8)", borderColor:"rgba(10,10,10,0.8)"}}
                 items={this.state.items}
                 custname={this.state.custname}
                 mobileNo={this.state.mobileNo}
                log={console.log(this.state.items,this.state.custname,this.state.mobileNo)}
                   onClick={this.handleBack.bind()} >
                    Back
                    </Button>
                <Link to="/QRPage">
                    <Button 
                        className="btn btn-primary"
                        type="submit"
                        style={{marginLeft:"340px", backgroundColor:"rgba(10,10,10,0.8)", borderColor:"rgba(10,10,10,0.8)"}}
                        onClick={this.submitHandler.bind()}>
                        Pay
                    </Button>
                </Link>
            </Container>
            </div>
        );
    }
}