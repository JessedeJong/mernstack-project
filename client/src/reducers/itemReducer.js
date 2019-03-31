import uuid from 'uuid';
// eslint-disable-next-line
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
    items: [
        { id: uuid(), name: 'Eggs' },
        { id: uuid(), name: 'Milk' },
        { id: uuid(), name: 'Steak' },
        { id: uuid(), name: 'Cola' }
    ]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS: 
            return {
                ...state
            }
        case ADD_ITEM:
            return {
                ...state
            }
        default:
            return state;
    }
}