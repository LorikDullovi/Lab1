import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditWorModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'workershifts',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                WorkerShiftsId:event.target.WorkerShiftsId.value,
                Paradite:event.target.Paradite.value,
                Pasdite:event.target.Pasdite.value,
                NdrrimNate:event.target.NdrrimNate.value
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
            Edit WorkerShift
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="WorkerShiftId">
                        <Form.Label>WorkerShiftId</Form.Label>
                        <Form.Control type="text" name="WorkerShiftId" required
                        disabled
                        defaultValue={this.props.Worworkershiftid} 
                        placeholder="WorkerShiftId"/>
                    </Form.Group>

                    <Form.Group controlId="Paradite">
                        <Form.Label>Paradite</Form.Label>
                        <Form.Control type="text" name="Paradite" required 
                        defaultValue={this.props.Worparadite}
                        placeholder="Paradite"/>
                    </Form.Group>

                    <Form.Group controlId="Pasdite">
                        <Form.Label>Pasdite</Form.Label>
                        <Form.Control type="text" name="Pasdite" required 
                        defaultValue={this.props.Worpasdite}
                        placeholder="Pasdite"/>
                    </Form.Group>

                    <Form.Group controlId="NdrrimNate">
                        <Form.Label>NdrrimNate</Form.Label>
                        <Form.Control type="text" name="NdrrimNate" required 
                        defaultValue={this.props.Worndrrimnate}
                        placeholder="NdrrimNate"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update WorkerShift
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