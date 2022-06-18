import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddWorModal} from './AddWorModal';
import {EditWorModal} from './EditWorModal';

export class WorkerShifts extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'workershifts')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteOra(WorId){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'workershifts/'+WorId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, WorId,WorParadite,WorPasdite,WorNdrrimNate,}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>WorkerShiftsId</th>
                       
                        <th>Paradite</th>
                        <th>Pasdite</th>
                        <th>NdrrimNate</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(Wor=>
                            <tr key={Wor.WorkerShiftsId}>
                                <td>{Wor.WorkerShiftsId}</td>
                                <td>{Wor.Paradite}</td>
                                <td>{Wor.Pasdite}</td>
                                <td>{Wor.NdrrimNate}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        WorId:Wor.WorkerShiftsId,WorParadite:Wor.Paradite,WorPasdite:Wor.Pasdite,
        WorNdrrimNate:Wor.NdrrimNate,})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(Wor.WorkerShiftsId)}>
            Delete
        </Button>

        <EditWorModal show={this.state.editModalShow}
        onHide={editModalClose}
        WorId={WorId}
        WorParadite={WorParadite}
        WorPasdite={WorPasdite}
        WorNdrrimNate={WorNdrrimNate}
        
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add WorkerShift</Button>

                    <AddWorModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}