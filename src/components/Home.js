import React,{ Component} from 'react';
import { Card, Container, Row, Col, Button, CardImg } from "react-bootstrap";
import axios from 'axios';
import { config } from './Config';
import '../App.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            items:[],

        }
        this.fetchMenuDetails = this.fetchMenuDetails.bind(this);
    }
   
    fetchMenuDetails() {
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
    componentDidMount(){
        this.fetchMenuDetails();
    }
render(){
    return (
        <div>
            <Container className="mt-4">
                <Row>{this.state.items.map((item,i)=> 
             
                    <Col md={12}>
                        <center>
                            <Card style={{width:"400px",height:"102px"}}>
                                <CardImg variant="top" src={config.images + item.image} style={{width:"100px",height:"100px"}}/>
                                <Card.Body className="starters">
                                    <Card.Title>{item.course}</Card.Title>
                                    <Card.Text>
                                        {item.name}
                                    </Card.Text>
                                    <Card.Text>
                                       Rs. {item.price}
                                    </Card.Text>
                                </Card.Body>
                                <Button className="button" > + Add</Button>
                               
                            </Card>
                            </center>
                    </Col>
                )}
                </Row>
                <br />
            </Container><br />

        </div>
    );
}
}
