import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditFruModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'fruits',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FruitsId:event.target.FruitsId.value,
                FruitsName:event.target.FruitsName.value,
                ColorFruits:event.target.ColorFruits.value,
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
            Edit Fruits
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="FruitsId">
                        <Form.Label>FruitsId</Form.Label>
                        <Form.Control type="text" name="FruitsId" required
                        disabled
                        defaultValue={this.props.fruid} 
                        placeholder="FruitsId"/>
                    </Form.Group>

                    <Form.Group controlId="FruitsName">
                        <Form.Label>FruitsName</Form.Label>
                        <Form.Control type="text" name="FruitsName" required 
                        defaultValue={this.props.fruname}
                        placeholder="FruitsName"/>
                    </Form.Group>
                    <Form.Group controlId="ColorFruits">
                        <Form.Label>ColorFruits</Form.Label>
                        <Form.Control type="text" name="ColorFruits" required 
                        defaultValue={this.props.frucolor}
                        placeholder="ColorFruits"/>
                    </Form.Group>
                    <Form.Group controlId="Quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" name="Quantity" required 
                        defaultValue={this.props.fruquantity}
                        placeholder="Quantity"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Fruits
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
