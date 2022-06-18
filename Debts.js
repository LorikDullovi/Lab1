import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDebModal} from './AddDebModal';
import {EditDebModal} from './EditDebModal';

export class Debts extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'debts')
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

    deletePay(Debid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'debts/'+Debid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, Debid,Debname,Debsurname,Debdebts,}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>DebtsId</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Debts</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(Deb=>
                            <tr key={Deb.DebtsId}>
                                <td>{Deb.DebtsId}</td>
                                <td>{Deb.Name}</td>
                                <td>{Deb.Surname}</td>
                                <td>{Deb.Debts}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        Debid:Deb.DebtsId,Debname:Deb.Name,Debsurname:Deb.Surname,
        Debdebts:Deb.Debts,})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(Deb.DebtsId)}>
            Delete
        </Button>

        <EditDebModal show={this.state.editModalShow}
        onHide={editModalClose}
        Debid={Debid}
        Debname={Debname}
        Debsurname={Debsurname}
        Debdebts={Debdebts}
        
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Debt</Button>

                    <AddDebModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}