import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditPayModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'payments',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PaymentsId:event.target.DepartmentId.value,
                Name:event.target.Name.value,
                Surname:event.target.Surname.value,
                Amounts:event.target.Amounts.value
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
            Edit Payment
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="PaymentsId">
                        <Form.Label>PaymentsId</Form.Label>
                        <Form.Control type="text" name="PaymentsId" required
                        disabled
                        defaultValue={this.props.PaypaymentsId} 
                        placeholder="PaymentsId"/>
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="Name" required 
                        defaultValue={this.props.Payname}
                        placeholder="Name"/>
                    </Form.Group>

                    <Form.Group controlId="Surname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="text" name="Surname" required 
                        defaultValue={this.props.Paysurname}
                        placeholder="Surname"/>
                    </Form.Group>

                    <Form.Group controlId="Amounts">
                        <Form.Label>Amounts</Form.Label>
                        <Form.Control type="text" name="Amounts" required 
                        defaultValue={this.props.Payamounts}
                        placeholder="Amounts"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Payment
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