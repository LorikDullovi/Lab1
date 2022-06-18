import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCosModal} from './AddCosModal';
import {EditCosModal} from './EditCosModal';

export class Costumer extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'costumer')
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

    deletePay(Cosid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'costumer/'+Cosid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, CosId,CosName,CosSurname,CosLivingPlace, CosBussines, CosTelephone, CosBankAccount}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CostumerId</th>
                        <th>CostumerName</th>
                        <th>CostumerSurname</th>
                        <th>LivingPlace</th>
                        <th>Bussines</th>
                        <th>Telephone</th>
                        <th>BankAccount</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(Cos=>
                            <tr key={Cos.CostumerId}>
                                <td>{Cos.CostumerId}</td>
                                <td>{Cos.CostumerName}</td>
                                <td>{Cos.CostumerSurname}</td>
                                <td>{Cos.LivingPlace}</td>
                                <td>{Cos.Bussines}</td>
                                <td>{Cos.Telephone}</td>
                                <td>{Cos.BankAccount}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        CosId:Cos.CostumerId,CostumerName:Cos.CostumerName,CosSurname:Cos.CostumerSurname,
       CosLivingPlace:Cos.LivingPlace,CosBussines:Cos.Bussines,CosTelephone:Cos.Telephone,CosBankAccount:Cos.BankAccount})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(Cos.CostumerId)}>
            Delete
        </Button>

        <EditCosModal show={this.state.editModalShow}
        onHide={editModalClose}
        CosId={CosId}
        CosName={CosName}
        CosSurname={CosSurname}
        CosLivingPlace={CosLivingPlace}
        CosBussines={CosBussines}
        CosTelephone={CosTelephone}
        CosBankAccount={CosBankAccount}
        
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Costumer</Button>

                    <AddCosModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}