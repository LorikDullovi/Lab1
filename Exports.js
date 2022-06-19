import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddExpModal} from './AddExpModal';
import {EditExpModal} from './EditExpModal';

export class Exports extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'exports')
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

    deleteExp(expid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'exports/'+expid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {deps, expid,expname,expcountry,dos,expquantity}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ExportsId</th>
                        <th>ExportsName</th>
                        <th>Country</th>
                        <th>DOS</th>
                        <th>Quantity</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(exp=>
                            <tr key={exp.ExportsId}>
                                <td>{exp.ExportsId}</td>
                                <td>{exp.ExportsName}</td>
                                <td>{exp.Country}</td>
                                <td>{exp.DateOfStarting}</td>
                                <td>{exp.Quantity}</td>

                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        expid:exp.ExportsId,expname:exp.ExportsName,expcountry:exp.Country,dos:exp.DateOfStarting,expquantity:exp.Quantity})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteExp(exp.ExportsId)}>
            Delete
        </Button>

        <EditExpModal show={this.state.editModalShow}
        onHide={editModalClose}
        expid={expid}
        expname={expname}
        expcountry={expcountry}
        dos={dos}
        expquantity={expquantity}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Exports</Button>

                    <AddExpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}