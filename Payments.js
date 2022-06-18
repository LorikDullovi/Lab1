import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddPayModal} from './AddPayModal';
import {EditPayModal} from './EditPayModal';

export class Payments extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'payments')
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

    deletePay(Payid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'payments/'+Payid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, Payid,Payname,Paysurname,Payamounts,}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>PaymentsId</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Amounts</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(Pay=>
                            <tr key={Pay.PaymentsId}>
                                <td>{Pay.PaymentsId}</td>
                                <td>{Pay.Name}</td>
                                <td>{Pay.Surname}</td>
                                <td>{Pay.Amounts}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        Payid:Pay.PaymentsId,Payname:Pay.Name,Paysurname:Pay.Surname,
        Payamounts:Pay.Amounts,})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(Pay.PaymentsId)}>
            Delete
        </Button>

        <EditPayModal show={this.state.editModalShow}
        onHide={editModalClose}
        Payid={Payid}
        Payname={Payname}
        Paysurname={Paysurname}
        Payamounts={Payamounts}
        
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Payment</Button>

                    <AddPayModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}