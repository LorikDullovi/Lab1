import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddSubModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'subsidies',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BeneficiaryId:null,
                Beneficiary:event.target.Beneficiary.value,
                Telephone:event.target.Telephone.value,
                BankAccount:event.target.BankAccount.value,
                Distributor:event.target.Distributor.value,
                Earnings:event.target.Earnings.value,
                

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
            Add subsidy
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Beneficiary">
                        <Form.Label>Beneficiary</Form.Label>
                        <Form.Control type="text" name="Beneficiary" required 
                        placeholder="Beneficiary"/>
                    </Form.Group>

                    <Form.Group controlId="Telephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="text" name="Telephone" required 
                        placeholder="Telephone"/>
                    </Form.Group>

                    <Form.Group controlId="BankAccount">
                        <Form.Label>BankAccount</Form.Label>
                        <Form.Control type="text" name="BankAccount" required 
                        placeholder="BankAccount"/>
                    </Form.Group>

                    <Form.Group controlId="Distributor">
                        <Form.Label>Distributor</Form.Label>
                        <Form.Control type="text" name="Distributor" required 
                        placeholder="Distributor"/>
                    </Form.Group>

                    <Form.Group controlId="Earnings">
                        <Form.Label>Earnings</Form.Label>
                        <Form.Control type="text" name="Earnings" required 
                        placeholder="Earnings"/>
                    </Form.Group>

                
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add subsidy
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