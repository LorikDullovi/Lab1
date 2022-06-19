import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddExpModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'exports',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ExportsId:null,
                ExportsName:event.target.ExportsName.value,
                Country:event.target.Country.value,
                DateOfStarting:event.target.DateOfStarting.value,
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
            Add Exports
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="ExportsName">
                        <Form.Label>ExportsName</Form.Label>
                        <Form.Control type="text" name="ExportsName" required 
                        placeholder="ExportsName"/>
                    </Form.Group>

                    <Form.Group controlId="Country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" name="Country" required 
                        placeholder="Country"/>
                    </Form.Group>

                    

                    <Form.Group controlId="DateOfStarting">
                        <Form.Label>DateOfStarting</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfStarting"
                        required
                        placeholder="DateOfStarting"
                        />

                        <Form.Group controlId="Quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" name="Quantity" required 
                        placeholder="Quantity"/>
                    </Form.Group>
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Exports
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