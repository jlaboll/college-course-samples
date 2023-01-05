import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default class AddWalletModal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        What type of coin will this wallet hold?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Search for a coin</h4>
                    <Dropdown options={this.props.coinList} onChange={this._onSelect} value="Pick a coin"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger" onClick={this.props.onHide}>Cancel</Button>
                    <Button onClick={this.props.onHide}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}



