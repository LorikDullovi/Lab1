import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditCosModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'costumer',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CostumerId:event.target.CostumerId.value,
                CostumerName:event.target.CostumerName.value,
                CostumerSurname:event.target.CostumerSurname.value,
                LivingPlace:event.target.LivingPlace.value,
                Bussines:event.target.Bussines.value,
                BankAccount:event.target.BankAccount.value,
                
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
            Edit Costumer
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="CostumerId">
                        <Form.Label>CostumerId</Form.Label>
                        <Form.Control type="text" name="CostumerId" required
                        disabled
                        defaultValue={this.props.CosId} 
                        placeholder="CostumerId"/>
                    </Form.Group>

                    <Form.Group controlId="CostumerName">
                        <Form.Label>CostumerName</Form.Label>
                        <Form.Control type="text" name="CostumerName" required 
                        defaultValue={this.props.CosName}
                        placeholder="CostumerName"/>
                    </Form.Group>

                    <Form.Group controlId="CostumerSurname">
                        <Form.Label>CostumerSurname</Form.Label>
                        <Form.Control type="text" name="CostumerSurname" required 
                        defaultValue={this.props.CosSurname}
                        placeholder="CostumerSurname"/>
                    </Form.Group>

                    <Form.Group controlId="LivingPlace">
                        <Form.Label>LivingPlace</Form.Label>
                        <Form.Control type="text" name="LivingPlace" required 
                        defaultValue={this.props.CosLivingPlace}
                        placeholder="LivingPlace"/>
                    </Form.Group>

                    <Form.Group controlId="Bussines">
                        <Form.Label>Bussines</Form.Label>
                        <Form.Control type="text" name="Bussines" required 
                        defaultValue={this.props.CosBussines}
                        placeholder="Bussines"/>
                    </Form.Group>

                    <Form.Group controlId="Telephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="text" name="Telephone" required 
                        defaultValue={this.props.CosTelephone}
                        placeholder="Telephone"/>
                    </Form.Group>

                    <Form.Group controlId="BankAccount">
                        <Form.Label>BankAccount</Form.Label>
                        <Form.Control type="text" name="BankAccount" required 
                        defaultValue={this.props.CosBankAccount}
                        placeholder="BankAccount"/>
                    </Form.Group>


                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Costumer
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