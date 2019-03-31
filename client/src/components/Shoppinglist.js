import React, { Component } from 'react';
// eslint-disable-next-line
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
// eslint-disable-next-line
import { CSSTransition, TransitionGroup } from 'react-transition-group' ;
import uuid from 'uuid';
// Get redux item reducer
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
// Component proptypes
// eslint-disable-next-line
import PropTypes from 'prop-types';

class Shoppinglist extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    render(){
        // eslint-disable-next-line
        const { items } = this.props.item;

        return(
            <Container>
                <Button
                    color="dark" 
                    style={{margin: '2rem'}}
                    onClick={ () => {
                        const name = prompt('Enter item');
                        if( name ) {
                            this.setState( state => ({
                                items: [...state.items, { id: uuid(), name }]
                            }));
                        }
                    }}   
                >Add item</Button>

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        { items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={ () => {
                                            this.setState( state => ({
                                                items: state.items.filter(item => item.id !== id)
                                            }));
                                        }}
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

export default connect(mapStateToProps, { getItems })(Shoppinglist);