import React,{Component} from "react";
import{Modal,Button,Row,Col,Form, ModalBody, Image} from 'react-bootstrap';



export class EditEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]}
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "download.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'departemnt')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API +'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'appication/json'
            },
            body:JSON.stringify({
                EmployeeId:event.target.EmployeeId.value,
                EmployeeName:event.target.EmployeeName.value,
                Department:event.target.Department.value,
                DateofJoining:event.target.DateofJoining.value,
                PhotoFileName:this.photoFileName
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

    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + 'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
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
                            Edit Employee
                            </Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                     <Row>
                         <Col sm={6}>
                             <Form onSubmit={this.handleSubmit}>

                             <Form.Group CONTROLiD="EmployeeId">
                                     <Form.Label>EmployeeId</Form.Label>
                                     <Form.Control type="text" name="EmployeeId" required 
                                     placeholder="EmployeeId"
                                     disabled
                                     defaultValue={this.props.empid}
                                     />

                                 </Form.Group>

                                 <Form.Group CONTROLiD="EmployeeName">
                                     <Form.Label>EmployeeName</Form.Label>
                                     <Form.Control type="text" name="EmployeeName" required 
                                     defaultValue={this.props.empname}
                                     placeholder="EmployeeName"/>

                                 </Form.Group>

                                 <Form.Group controlId="Department">
                                     <Form.Label>Department</Form.Label>
                                     <Form.Control as="select" defaultValue={this.props.depmt}>
                                         {this.state.deps.map(dep=>
                                            <option key={dep.DepartmentId}>{dep.Departmentname}</option>)}
                                     </Form.Control>
                                 </Form.Group>

                                 <Form.Group controlId="DateOfJoining">
                                     <Form.Label>DateOfJoining</Form.Label>
                                     <Form.Control 
                                     type="date"
                                     name="DateOfJoining"
                                     required
                                     placeholder="DateOfJoining"
                                     defaultValue={this.props.doj}
                                     
                                     />
                                                                               
                                 </Form.Group>

                                 <Form.Group>
                                     <Button variant="primary" type ="submit">
                                         Update Employee
                                     </Button>
                                 </Form.Group>
                             </Form>
                         </Col>

                         <Col sm={6}> 

                           <Image width="200px" height="200px"
                           scr={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>"
                           <input onChange={this.handleFileSelected} type="File"/>

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