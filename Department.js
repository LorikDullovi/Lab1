import React,{Component} from "react";
import{Modal,Button,Row,Col,Form, ModalBody} from 'react-bootstrap';



export class AddDepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API +'department',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'Appication/json'
            },
            body:JSON.stringify({
                DepartmentId:null,
                DepartmentName:event.target.DepartmentName.value
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
        return(
            <div className="container">

                <Modal 
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                    <Modal.Header closeButton>
                        <Modal.Title ID="contained-modal-title.vcenter">
                            Mbush te Dhenat
                            </Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                     <Row>
                         <Col sm={6}>
                             <Form onSubmit={this.handleSubmit}>
                                 <Form.Group CONTROLiD="DepartmentName">
                                     <Form.Label>EmriDepartmentit</Form.Label>
                                     <Form.Control type="text" name="DepartmentName" required 
                                     placeholder="EmriDepartmentit"/>

                                 </Form.Group>

                                 <Form.Group>
                                     <Button variant="primary" type ="submit">
                                         ShtoDepartmentin
                                     </Button>
                                 </Form.Group>
                             </Form>
                         </Col>
                     </Row>

                    </ModalBody>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}