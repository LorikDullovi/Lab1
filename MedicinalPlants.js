import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddMepModal} from './AddMepModal';
import {EditMepModal} from './EditMepModal';

export class MedicinalPlants extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'medicinalplants')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteMp(mpid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'medicinalplants/'+mpid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {deps, mpid,mpname,mpfunctionn,mpcolor}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>MedicinalPlantsId</th>
                        <th>MedicinalPlantsName</th>
                        <th>Functionn</th>
                        <th>Color</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(mp=>
                            <tr key={mp.MedicinalPlantsId}>
                                <td>{mp.MedicinalPlantsId}</td>
                                <td>{mp.MedicinalPlantsName}</td>
                                <td>{mp.Functionn}</td>
                                <td>{mp.Color}</td>

                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        mpid:mp.MedicinalPlantsId,mpname:mp.MedicinalPlantsName,mpfunctionn:mp.Functionn,mpcolor:mp.Color})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteMp(mp.MedicinalPlantsId)}>
            Delete
        </Button>

        <EditMepModal show={this.state.editModalShow}
        onHide={editModalClose}
        mpid={mpid}
        mpname={mpname}
        mpfunction={mpfunctionn}
        mpcolor={mpcolor}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add MedicinalPlants</Button>

                    <AddMepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}