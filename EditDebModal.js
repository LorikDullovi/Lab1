import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditDebModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'debts',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DebtsId:event.target.DebtsId.value,
                Name:event.target.Name.value,
                Surname:event.target.Surname.value,
                Debts:event.target.Debts.value
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
            Edit Debt
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="DebtsId">
                        <Form.Label>DebtsId</Form.Label>
                        <Form.Control type="text" name="DebtsId" required
                        disabled
                        defaultValue={this.props.Debid} 
                        placeholder="DebtsId"/>
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="Name" required 
                        defaultValue={this.props.Debname}
                        placeholder="Name"/>
                    </Form.Group>

                    <Form.Group controlId="Surname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="text" name="Surname" required 
                        defaultValue={this.props.Debsurname}
                        placeholder="Surname"/>
                    </Form.Group>

                    <Form.Group controlId="Debts">
                        <Form.Label>Debts</Form.Label>
                        <Form.Control type="text" name="Debts" required 
                        defaultValue={this.props.Debdebts}
                        placeholder="Debts"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Debt
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