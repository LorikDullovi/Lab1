import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddVegModal} from './AddVegModal';
import {EditVegModal} from './EditVegModal';

export class Vegetables extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'vegetables')
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

    deleteVeg(vegid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'vegetables/'+vegid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {deps, vegid,vegname,vegcolor,vegquantity}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>VegetablesId</th>
                        <th>VegetablesName</th>
                        <th>ColorVegetables</th>
                        <th>Quantity</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(veg=>
                            <tr key={veg.VegetablesId}>
                                <td>{veg.VegetablesId}</td>
                                <td>{veg.VegetablesName}</td>
                                <td>{veg.ColorVegetables}</td>
                                <td>{veg.Quantity}</td>

                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        vegid:veg.VegetablesId,vegname:veg.VegetablesName,vegcolor:veg.ColorVegetables,vegquantity:veg.Quantity})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteVeg(veg.VegetablesId)}>
            Delete
        </Button>

        <EditVegModal show={this.state.editModalShow}
        onHide={editModalClose}
        vegid={vegid}
        vegname={vegname}
        vegcolor={vegcolor}
        vegquantity={vegquantity}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Vegetables</Button>

                    <AddVegModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}