import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddVegModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'vegetables',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VegetablesId:null,
                VegetablesName:event.target.VegetablesName.value,
                ColorVegetables:event.target.ColorVegetables.value,
                Quantity:event.target.Quantity.value
               
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Vegetables
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="VegetablesName">
                        <Form.Label>Vegetables Name</Form.Label>
                        <Form.Control type="text" name="VegetablesName" required 
                        placeholder="VegetablesName"/>
                    </Form.Group>
                    <Form.Group controlId="VegetablesName">
                        <Form.Label>Color Vegetables</Form.Label>
                        <Form.Control type="text" name="ColorVegetables" required 
                        placeholder="Color Vegetables"/>
                    </Form.Group>
                    <Form.Group controlId="VegetablesName">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" name="Quantity" required 
                        placeholder="Quantity"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Vegetables
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}