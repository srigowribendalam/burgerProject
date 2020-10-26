import React,{ Component} from 'react';
import { Card, Container, Row, Col, Button, CardImg } from "react-bootstrap";
import {  Redirect } from 'react-router-dom';
import axios from 'axios';
import { config } from './Config';
import '../App.css';
import CartIcon from './images/1603110268151nachos.jpg';
import Logo from './images/logo.svg';
import Ticket from './images/ticket.jpg';
import Image from 'react-bootstrap/Image';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            items:[],
            counter:[],
            selectedItems:"",
            redirect: false,
            count:0,
            custname:"Name",
            mobileNo:"0123456789"
        }

        this.fetchMenuDetails = this.fetchMenuDetails.bind(this);
        this.addToCartHandler = this.addToCartHandler.bind(this);
        this.removeFromCartHandler = this.removeFromCartHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    addToCartHandler(id) {
        this.setState(state => {
            const counter = state.counter.map((item, j) => {
              if (j === id) {
                return item + 1;
              } else {
                return item;
              }
            });
            //console.log(counter);
            return {
                counter,
            };
          });
    }
    removeFromCartHandler(id) {
        this.setState(state => {
            const counter = state.counter.map((item, j) => {
              if (j === id) {
                return (item - 1 <0) ? 0 :item - 1;
              } else {
                return item;
              }
            });
            //console.log("counter",counter,id);
            return {
                counter,
            };
          });
    }

   
    fetchMenuDetails_old() {
        var self = this;
        axios.get("http://localhost:8000/api/showmenu/M2")
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log("data",response.data);
                    let itemsList = response.data.items || [];
                    console.log("List of items ", itemsList);
                    this.setState(
                        {
                            items: itemsList
                        }
                    );
                }
                else {
                    console.log("Failed to retrieve menu details");
                    alert("Failed to retrieve menu details");
                }
            })
            .catch(function (error) {
                console.log("Failed to retrieve menu details");
                alert("Failed to retrieve menu details");
            });
    }

    fetchMenuDetails() {
        var self = this;
        let itemsList = {
            menuid: "M2",
            items:[
                {
                    course: "Starters",
                    name: "Nachos",
                    price: 12.00,
                    image:"1603110268151nachos.jpg"
                },
                {
                    course: "Starters",
                    name: "Chips",
                    price: 22.30,
                    image:"1603110304281chips.jpg"
                },
                {
                    course: "Main",
                    name: "Burger",
                    price: 55.60,
                    image:"1603110224748burger.png"
                },
                {
                    course: "Main",
                    name: "Taco",
                    price: 45.50,
                    image:"1603110335302taco.jpg"
                    
                }
            ]
/*
            let itemsList = {
                menuid: "M2",
                items:[
                    {
                        course: "Platform Ticket",
                        name: "Adult",
                        price: 50.00,
                        image:"1603110268151nachos.jpg"
                    },
                    {
                        course: "Platform Ticket",
                        name: "Children",
                        price: 10.00,
                        image:"1603110304281chips.jpg"
                    }
                ]
                */
        }
    
        this.setState(
                        {
                            items: itemsList.items,
                            counter:[0,0,0,0],
                            count:0,
                            selectedItems:"",
                            redirect: false,
                            custname: this.props.location.state.custname,
                            mobileNo: this.props.location.state.mobileNo
                        }
                    );
                
    }
    displayDate(){
        let dt = new Date();
        var d = dt.getDate();
        var m = dt.getMonth()+1;
        var y = dt.getFullYear();
        return  d + '-' + m + '-' + y;
    }
    //+ "' , 'price': '" + item.price + "' , 'quantity':'" + this.state.counter[idx] + "'} ,";

    handleSubmit(event) {
        event.preventDefault();
        this.state.selectedItems = this.state.selectedItems + "[";
        this.state.items.map((item,idx)=>{
            if (this.state.counter[idx]!=0){
                this.state.selectedItems = this.state.selectedItems + "{"+ "\"name\"" + ":" + "\"" + item.name + "\"," + 
                                                                            "\"price\"" + ":" + "\"" + item.price + "\"," +
                                                                            "\"quantity\"" + ":" + "\"" + this.state.counter[idx] + "\"" +
                
                                                                        "} ,";            
                                            }
        });
        this.state.selectedItems = this.state.selectedItems.slice(0, -1) + "]";
        this.state.selectedItems = this.state.selectedItems;
        this.setState({ redirect: true });
        console.log("selected", this.state.selectedItems);
    }
    totalPrice = () =>
        this.state.items.reduce(
            (sum, item, idx) => sum + this.state.counter[idx] * item.price,
            0
        )

    componentDidMount(){
        this.fetchMenuDetails();
        this.addToCartHandler();
        this.state.custname = this.props.location.state.custname;
        this.state.mobileNo = this.props.location.state.mobileNo;
        console.log("customer name",this.props.location.state);
    }

render(){
    const { redirect } = this.state;

    if (redirect) {
      console.log("redirect1",this.state.redirect);
      return <Redirect
                to={{
                pathname: "/cart",
                state: { custname: this.state.custname, mobileNo: this.state.mobileNo, selectedItems: this.state.selectedItems }
                }}
            />
      
      //<Redirect to='/home'/>;
    }
    return (
        <div>
            <Container className="mt-4">
                <div>
                    <Image src={Logo}style={{marginLeft:"160px", width:"150px",height:"110px"}}></Image>
                    <Row className="alignment">
                        <Col ><p><b>Customer Name</b> {this.props.location.state.custname}</p></Col>
                        <Col ><p className="ml-4"><b>Mobile No</b> {this.props.location.state.mobileNo}</p></Col>
                        <Col ><p className="ml-4"><b>Date</b><br/> {this.displayDate()}</p></Col>
                    </Row>
                    <Row>
                        <Col className="justify-content-between"><p style={{textAlign:"right", background: "rgba(10,10,10,0.2)", fontSize: 15, width:"450px"}}><b>Total: &#8377;{this.totalPrice()}</b></p></Col>
                    </Row>
                    <Row>
                        <Col className="justify-content-between"><p style={{textAlign:"center", background: "rgba(10,10,10,0.2)", fontSize: 20, width:"450px"}}><b>Menu</b></p></Col>
                    </Row>
                </div>
                <Row>{this.state.items.map((item,idx)=> 
                    <Col md={12}>
                        <Card key={idx} className="mb-2 d-flex justify-content-between" border="primary" bg ="dark" text="white" style={{width:"450px",height:"180px"}}>
                        <Card.Header>{item.course}</Card.Header>
                            <Image class="card-block px-2" src={CartIcon} roundedCircle style={{margin:"10px", width:"150px",height:"110px"}}/>
                            <center>
                                <Card.Body className="starters">
                                    <Card.Text>
                                        {item.name}
                                    </Card.Text>
                                    <Card.Text >
                                    &#8377;{item.price}
                                    </Card.Text>
                                    <Row className="show-grid">
                                        <Col className="justify-content-between" xs={1} md={1}><Button className="button" variant="outline-danger" style={{width:"35px",height:"40px"}} onClick={() => this.removeFromCartHandler(idx)}>-</Button></Col>
                                        <Col className="justify-content-between" xs={1} md={1}><Button className="button" variant="secondary disabled" style={{width:"35px",height:"40px"}}>{this.state.counter[idx]}</Button></Col>
                                        <Col className="justify-content-between" xs={1} md={1}><Button className="button" variant="outline-success" style={{width:"35px",height:"40px"}} onClick={() => this.addToCartHandler(idx)}>+</Button></Col>
                                    </Row>
                                </Card.Body>
                            </center>
                        </Card>
                    </Col>
                )}
                </Row>
                <br />
                <Button
                    className="btn btn-primary"
                    type="submit"
                    style={{marginLeft:"375px", backgroundColor:"rgba(10,10,10,0.8)", borderColor:"rgba(10,10,10,0.8)"}}
                    onClick={this.handleSubmit}
                    >
                    Submit
                </Button>
            </Container>
        </div>
    );
}
}
