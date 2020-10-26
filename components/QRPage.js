import React, { Component } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import '../App.css';

import CartIcon from './images/1603110268151nachos.jpg';
import Logo from './images/logo.svg';
import QRCodeImg from './images/qrcode.png';
import Image from 'react-bootstrap/Image'


export default class QRPage extends Component {
    constructor(props) {
        super(props);
/*
        this.state = {
            custname:this.props.location.state.custname,
            mobileNo:this.props.location.state.mobileNo
        }

        this.setState({
            //items: this.props.location.state.selectedItems,
            custname: this.props.location.state.custname,
            mobileNo: this.props.location.state.mobileNo
            }
        )
*/
    }

    displayDate(){
        let dt = new Date();
        var d = dt.getDate();
        var m = dt.getMonth()+1;
        var y = dt.getFullYear();
        return  d + '-' + m + '-' + y;
    }


    submitHandler(){
        //alert("Payment Successfully Completed");
    }
    totalPrice = () =>
    this.state.items.reduce(
        (sum, i) => sum + i.quantity * i.price,
        0
    )

render(){
        return (
            <div>
            <Container className="mt-4">
            <div>
                <Image src={Logo}style={{marginLeft:"160px", width:"150px",height:"110px"}}></Image>
                <br></br>
                <br></br>
                <br></br>
                <Image src={QRCodeImg}style={{marginLeft:"160px", width:"150px",height:"150px"}}></Image>
            </div>
                <br></br>
                <Link to="/">
                    <Button 
                        className="btn btn-primary"
                        type="submit"
                        style={{marginLeft:"200px", backgroundColor:"rgba(10,10,10,0.8)", borderColor:"rgba(10,10,10,0.8)"}}
                        onClick={this.submitHandler.bind()}
                    >
                    Home
                    </Button>
                </Link>
            </Container>
            </div>
        );
    }
}
