import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';

const API_URL = 'http://localhost:3090';

export function signInUser ( { email, password } ) {

    return function ( dispatch ) {

        // Submit email password to server
        axios.post( `${ API_URL }/signin`, { email, password } )
            .then( response => {

                // If request is good...
                // -Update state to indicate user is authenticated
                dispatch ({
                    type: AUTH_USER
                });

                // -Save the JWT token
                localStorage.setItem( 'token', response.data.token );

                // -Redirect to the route '/dashboard'
                browserHistory.push( '/dashboard' );

            })
            .catch( () => {

                    // If request is bad...
                    // -Show an error to the user
                    dispatch(
                        authError( 'Bad Login Info' )
                    );

            })

    };

}

export function authError ( error ) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signOutUser () {

    localStorage.removeItem('token');

    return {
        type: UNAUTH_USER
    }

}

export function signUpUser ( { email, password } ) {

    return function ( dispatch ) {

        // Submit email password to server
        axios.post( `${ API_URL }/signup`, { email, password } )
            .then( response => {

                // If request is good...
                // -Update state to indicate user is authenticated
                dispatch ({
                    type: AUTH_USER
                });

                // -Save the JWT token
                localStorage.setItem( 'token', response.data.token );

                // -Redirect to the route '/dashboard'
                browserHistory.push( '/dashboard' );

            })
            .catch( response => {

                // If request is bad...
                // -Show an error to the user
                dispatch(
                    authError( response.data.error )
                );

            })

    };

}

export function fetchMessage() {

    return function( dispatch ) {

        axios.get( API_URL, {

            headers: { authorization: localStorage.getItem( 'token' ) }

        })
            .then ( response => {

                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
                
            });

    }

}