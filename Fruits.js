import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddFruModal} from './AddFruModal';
import {EditFruModal} from './EditFruModal';

export class Fruits extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'fruits')
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

    deleteFru(fruid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'fruits/'+fruid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {deps, fruid,fruname,frucolor,fruquantity}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>FruitsId</th>
                        <th>FruitsName</th>
                        <th>ColorFruits</th>
                        <th>Quantity</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(fru=>
                            <tr key={fru.FruitsId}>
                                <td>{fru.FruitsId}</td>
                                <td>{fru.FruitsName}</td>
                                <td>{fru.ColorFruits}</td>
                                <td>{fru.Quantity}</td>

                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        fruid:fru.FruitsId,fruname:fru.FruitsName,frucolor:fru.ColorFruits,fruquantity:fru.Quantity})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteFru(fru.FruitsId)}>
            Delete
        </Button>

        <EditFruModal show={this.state.editModalShow}
        onHide={editModalClose}
        fruid={fruid}
        fruname={fruname}
        frucolor={frucolor}
        fruquantity={fruquantity}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Fruits</Button>

                    <AddFruModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}