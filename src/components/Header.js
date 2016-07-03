import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';


class Header extends Component {

    renderLinks () {

        if ( this.props.authenticated ) {
            return (
                <li className='nav-item'>
                    <Link className='nav-link' to='/signout'>Sign Out</Link>
                </li>
            )
        } else {
            return [
                // use an array to return two elements without requiring
                // a wrapping element.
                <li className='nav-item' key='signin'>
                    <Link className='nav-link' to='/signin'>Sign In</Link>
                </li>,
                <li className='nav-item' key='signup'>
                    <Link className='nav-link' to='/signup'>Sign Up</Link>
                </li>
            ];

        }

    }

    render () {
        return (
            <nav className='navbar navbar-light'>
                <Link to='/' className='navbar-brand'>Prototype</Link>
                <ul className='nav navbar-nav pull-xs-right'>
                    { this.renderLinks() }
                </ul>
            </nav>
        );
    }
}

function mapStateToProps ( state ) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect( mapStateToProps, actions )( Header );