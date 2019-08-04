import React, { Component } from 'react';
// eslint-disable-next-line
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
// eslint-disable-next-line
import { CSSTransition, TransitionGroup } from 'react-transition-group' ;
// Get redux item reducer
import { connect } from 'react-redux';
import { getItems, deleteItem, addItem } from '../actions/itemActions';
// Component proptypes
// eslint-disable-next-line
import PropTypes from 'prop-types';

class Shoppinglist extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render(){
        // eslint-disable-next-line
        const { items } = this.props.item;

        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        { items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        &times;
                                    </Button>
                                    { name }
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

Shoppinglist.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, 
    { getItems, deleteItem, addItem })
    ( Shoppinglist );