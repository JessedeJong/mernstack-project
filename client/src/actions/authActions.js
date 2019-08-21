import axios from 'axios'
import { returnErrors } from './errorActions'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types'

// Check token & get user
export const getUser = () => (dispatch, getState) => {
    // Set user status
    dispatch({
        type: USER_LOADING
    });

    // Fetch user
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// Register user
export const register = ({ name, email, password }) => dispatch => {
    // Set headers
    const config = {
        headers: {
            "Content-type": 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({
        name,
        email,
        password
    })

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Logout
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// Setup
export const tokenConfig = getState => {
    // Get token from storage
    const token = getState().auth.token;

    // Add token to header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // Check token
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}