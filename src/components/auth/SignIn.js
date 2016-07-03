import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignIn extends Component {

    handleFormSubmit ({ email, password }) {
        this.props.signInUser({ email, password });
    }

    renderAlert () {
        if ( this.props.errorMessage ) {
            return (
                <div className='alert alert-danger'>
                    <strong>Oops!</strong> { this.props.errorMessage }
                </div>
            );
        }
    }

    render () {

        const { handleSubmit, fields: { email, password }} = this.props;

        return (
            <div className='auth card box-shadow'>
                <div className='card-block'>
                    <form onSubmit={ handleSubmit( this.handleFormSubmit.bind(this) ) }>
                        <fieldset className='input-group input-group-lg'>
                            <input placeholder='Email' className='form-control' { ...email } />
                        </fieldset>
                        <fieldset className='input-group input-group-lg'>
                            <input placeholder='Password' className='form-control' type='password' { ...password } />
                        </fieldset>
                        { this.renderAlert() }
                        <button className='btn btn-primary btn-lg btn-block' action='submit'>
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps ( state ) {
    return {
        errorMessage: state.auth.error
    }
}

export default reduxForm({
    form: 'signin',
    fields: [ 'email', 'password' ]
}, mapStateToProps, actions )( SignIn );