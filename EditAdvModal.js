import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditAdvModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'advertising',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                AdvertisingId:event.target.AdvertisingId.value,
                AdvertisingName:event.target.AdvertisingName.value,
                Amounts:event.target.Amounts.value,
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
            Edit Advertising
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="AdvertisingId">
                        <Form.Label>AdvertisingId</Form.Label>
                        <Form.Control type="text" name="AdvertisingId" required
                        disabled
                        defaultValue={this.props.advid} 
                        placeholder="AdvertisingId"/>
                    </Form.Group>

                    <Form.Group controlId="AdvertisingName">
                        <Form.Label>AdvertisingName</Form.Label>
                        <Form.Control type="text" name="AdvertisingName" required 
                        defaultValue={this.props.advname}
                        placeholder="AdvertisingName"/>
                    </Form.Group>
                    <Form.Group controlId="Amounts">
                        <Form.Label>Amounts</Form.Label>
                        <Form.Control type="text" name="Amounts" required 
                        defaultValue={this.props.advamounts}
                        placeholder="Amounts"/>
                    </Form.Group>
                    

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Advertising
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
