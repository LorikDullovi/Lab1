import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddSubModal} from './AddSubModal';
import {EditSubModal} from './EditSubModal';

export class Subsidies extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'subsidies')
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

    deletePay(SubBeneficiaryId){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'subsidies/'+SubBeneficiaryId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, SubBeneficiaryId,SubBeneficiary,SubTelephone,SubBankAccount,SubDistributor,SubEarnings}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>BeneficiaryId</th>
                        <th>Beneficiary</th>
                        <th>Telephone</th>
                        <th>BankAccount</th>
                        <th>Distributor</th>
                        <th>Earnings</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(Sub=>
                            <tr key={Sub.BeneficiaryId}>
                                <td>{Sub.BeneficiaryId}</td>
                                <td>{Sub.Beneficiary}</td>
                                <td>{Sub.Telephone}</td>
                                <td>{Sub.BankAccount}</td>
                                <td>{Sub.Distributor}</td>
                                <td>{Sub.Earnings}</td>
                                
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        SubBeneficiaryId:Sub.BeneficiaryId,SubBeneficiary:Sub.Beneficiary,SubTelephone:Sub.Telephone,
       SubBankAccount:Sub.BankAccount,SubDistributor:Sub.Distributor,SubEarnings:Sub.Earnings})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(Sub.BeneficiaryId)}>
            Delete
        </Button>

        <EditSubModal show={this.state.editModalShow}
        onHide={editModalClose}
        SubBeneficiaryId={SubBeneficiaryId}
        SubBeneficiary={SubBeneficiary}
        SubTelephone={SubTelephone}
        SubBankAccount={SubBankAccount}
        SubDistributor={SubDistributor}
        SubEarnings={SubEarnings}
        
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Subsidy</Button>

                    <AddSubModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}