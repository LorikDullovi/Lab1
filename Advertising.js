import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddAdvModal} from './AddAdvModal';
import {EditAdvModal} from './EditAdvModal';

export class Advertising extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'advertising')
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

    deleteAdv(advid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'advertising/'+advid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {deps,advid,advname,advamounts,}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>AdvertisingId</th>
                        <th>Advertising</th>
                        <th>Amounts</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(adv=>
                            <tr key={adv.AdvertisingId}>
                                <td>{adv.AdvertisingId}</td>
                                <td>{adv.AdvertisingName}</td>
                                <td>{adv.Amounts}</td>

                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        advid:adv.AdvertisingId,advname:adv.AdvertisingName,advamounts:adv.Amounts,})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteAdv(adv.AdvertisingId)}>
            Delete
        </Button>

        <EditAdvModal show={this.state.editModalShow}
        onHide={editModalClose}
        advid={advid}
        advname={advname}
        advamounts={advamounts}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Advertising</Button>

                    <AddAdvModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}
