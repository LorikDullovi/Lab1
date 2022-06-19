import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditMepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'medicinalplants',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                MedicinalPlantsId:event.target.MedicinalPlantsId.value,
                MedicinalPlantsName:event.target.MedicinalPlantsName.value,
                Functionn:event.target.Functionn.value,
                Color:event.target.Color.value
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
            Edit MedicinalPlants
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="MedicinalPlantsId">
                        <Form.Label>MedicinalPlantsId</Form.Label>
                        <Form.Control type="text" name="MedicinalPlantsId" required
                        disabled
                        defaultValue={this.props.mpid} 
                        placeholder="MedicinalPlantsId"/>
                    </Form.Group>

                    <Form.Group controlId="MedicinalPlantsName">
                        <Form.Label>MedicinalPlantsName</Form.Label>
                        <Form.Control type="text" name="MedicinalPlantsName" required 
                        defaultValue={this.props.mpname}
                        placeholder="MedicinalPlantsName"/>
                    </Form.Group>

                    <Form.Group controlId="Functionn">
                        <Form.Label>Functionn</Form.Label>
                        <Form.Control type="text" name="Functionn" required 
                        defaultValue={this.props.mpfunctionn}
                        placeholder="Functionn"/>
                    </Form.Group>

                  
                    
                    <Form.Group controlId="Color">
                        <Form.Label>Color</Form.Label>
                        <Form.Control type="text" name="Color" required 
                        defaultValue={this.props.mpcolor}
                        placeholder="Color"/>
                    </Form.Group>


                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update MedicinalPlants
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