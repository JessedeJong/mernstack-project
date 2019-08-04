import React,  { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { defaultCipherList } from 'constants';
import uuid from 'uuid';

class ItemModal extends Component {
    // Set standard modal attributes
    state = {
        modal: false,
        name: ''
    }
    
    // Toggle modal state to opposite state (true/false)
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            id: uuid(),
            name: this.state.name
        }

        // Add item\
        this.props.addItem(newItem);
        // Close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                <Button
                    color="dark"
                    style={
                        {margin: '2rem 0 2rem 1rem'}
                    }
                    onClick={this.toggle}
                >
                    Add item
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add to shoppinglist
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input type="text" name="name" id="item" placeholder="Add shopping item" onChange={this.onChange}>q</Input>
                                <Button 
                                    color="dark"
                                    style={{margin: '2rem 0'}}
                                    block
                                >Add item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, { addItem })(ItemModal);