import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditExpModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'exports',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ExportsId:event.target.ExportsId.value,
                ExportsName:event.target.ExportsName.value,
                Country:event.target.Country.value,
                DateOfStarting:event.target.DateOfStarting.value,
                Quantity:event.target.Quantity.value,

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
            Edit Exports
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="ExportsId">
                        <Form.Label>ExportsId</Form.Label>
                        <Form.Control type="text" name="ExportsId" required 
                        placeholder="ExportsId"
                        disabled
                        defaultValue={this.props.expid}/>
                    </Form.Group>

                    <Form.Group controlId="ExportsName">
                        <Form.Label>ExportsName</Form.Label>
                        <Form.Control type="text" name="ExportsName" required 
                        defaultValue={this.props.expname}
                        placeholder="ExportsName"/>
                    </Form.Group>

                    <Form.Group controlId="Country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" name="Country" required 
                        defaultValue={this.props.expcountry}
                        placeholder="Country"/>
                    </Form.Group>


                    <Form.Group controlId="DateOfStarting">
                        <Form.Label>DateOfStarting</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfStarting"
                        required
                        placeholder="DateOfStarting"
                        defaultValue={this.props.dos}
                        />
                           <Form.Group controlId="Quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" name="Quantity" required 
                        defaultValue={this.props.expquantity}
                        placeholder="Quantity"/>
                    </Form.Group>
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Exports
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