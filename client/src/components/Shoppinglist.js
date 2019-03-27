import React, { Component } from 'react';
// eslint-disable-next-line
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
// eslint-disable-next-line
import { CSSTransition, TransitionGroup } from 'react-transition-group' ;
import uuid from 'uuid';

class Shoppinglist extends Component {
    state = {
        items: [
            { id: uuid(), name: 'Eggs' },
            { id: uuid(), name: 'Milk' },
            { id: uuid(), name: 'Steak' },
            { id: uuid(), name: 'Water' }
        ]
    }

    render(){
        // eslint-disable-next-line
        const { items } = this.state;

        return(
            <Container>
                <Button
                    color="dark" 
                    style={{marginTop: '2rem'}}
                    onClick={ () => {
                        const name = prompt('Enter item');
                        if( name ) {
                            this.setState( state => ({
                                items: [...state.items, { id: uuid(), name }]
                            }));
                        }
                    }}   
                >Add item</Button>
            </Container>
        );
    }
}
export default Shoppinglist;