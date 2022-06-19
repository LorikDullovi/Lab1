import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddExModal} from './AddExModal';
import {EditExModal} from './EditExModal';

export class Export extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'export')
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

    deleteEx(exid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'export/'+exid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {deps, exid,exname,excity,dos,exquantity}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ExportId</th>
                        <th>ExportName</th>
                        <th>City</th>
                        <th>DOS</th>
                        <th>Quantity</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(ex=>
                            <tr key={ex.ExportId}>
                                <td>{ex.ExportId}</td>
                                <td>{ex.ExportName}</td>
                                <td>{ex.City}</td>
                                <td>{ex.DateOfStarting}</td>
                                <td>{ex.Quantity}</td>

                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        exid:ex.ExportId,exname:ex.ExportName,excity:ex.City,dos:ex.DateOfStarting,exquantity:ex.Quantity})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEx(ex.ExportId)}>
            Delete
        </Button>

        <EditExModal show={this.state.editModalShow}
        onHide={editModalClose}
        exid={exid}
        exname={exname}
        excity={excity}
        dos={dos}
        exquantity={exquantity}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Exports</Button>

                    <AddExModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}