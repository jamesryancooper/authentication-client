import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import isEmail from 'validator/lib/isEmail';
import mailcheck from 'mailcheck';
import * as actions from '../../actions';
import {
    DOMAINS as domains,
    SECOND_LEVEL_DOMAINS as secondLevelDomains,
    TOP_LEVEL_DOMAINS as topLevelDomains
} from '../../constants/mailcheck';

class SignUp extends Component {

    handleFormSubmit( formProps ) {

        // Call action creator to sign up the user!
        this.props.signUpUser( formProps );

    }

    renderAlert() {

        if ( this.props.errorMessage ) {
            return (
                <div className='alert alert-danger'>
                    <strong> Oops!</strong> { this.props.errorMessage }
                </div>
            )
        }
    }

    render () {

        const {
            handleSubmit,
            fields: {
                email, password, passwordConfirm
             }
        } = this.props;

        return (

            // TODO: Clean up the repetitive code.

            <div className='auth card box-shadow'>
                <div className='card-block'>
                    <form onSubmit={ handleSubmit ( this.handleFormSubmit.bind(this) ) }>
                        <fieldset className={ `input-group input-group-lg ${ email.touched && email.error ? 'has-danger' : '' }` }>
                            <input placeholder='Email' className='form-control' { ...email } />
                            { email.touched  && email.error && <div className='text-danger'>{ email.error }</div> }
                        </fieldset>
                        <fieldset className={ `input-group input-group-lg ${ password.touched && password.error ? 'has-danger' : '' }` }>
                            <input placeholder='Password' className='form-control' type='password' { ...password } />
                            { password.touched && password.error && <div className='text-danger'>{ password.error }</div> }
                        </fieldset>
                        <fieldset className={ `input-group input-group-lg ${ passwordConfirm.touched && passwordConfirm.error ? 'has-danger' : '' }` }>
                            <input placeholder='Confirm Password' className='form-control' type='password' { ...passwordConfirm } />
                            { passwordConfirm.touched && passwordConfirm.error && <div className='text-danger'>{ passwordConfirm.error }</div> }
                        </fieldset>
                        { this.renderAlert() }
                        <button className='btn btn-primary btn-lg btn-block' action='submit'>
                            Sign Up!
                        </button>
                    </form>
                </div>
            </div>

        )

    }

}

function validate ( formProps ) {

    const errors = {};

    const email = formProps.email ? formProps.email : '';

    // TODO: map over the formProps object to clean this up.

    if ( !formProps.email ) {
        errors.email = 'Please enter an email';
    }

    if ( !formProps.password ) {
        errors.password = 'Please enter a password';
    }

    if ( !formProps.passwordConfirm ) {
        errors.passwordConfirm = 'Please confirm your password';
    }

    if ( !isEmail( email ) ) {
        errors.email = 'Please enter a valid email';
    } else {
        mailcheck.run({
            email,
            domains,
            secondLevelDomains,
            topLevelDomains,
            suggested: function(suggestion) {
                errors.email = 'Did you mean ' +  suggestion.full + '?';
            },
            empty: function() {
                errors.email = '';
            }
        });
    }

    if ( formProps.password !== formProps.passwordConfirm ) {
        errors.password = 'Passwords must match';
    }

    return errors;

}

function mapStateToProps ( state ) {
    return {
        errorMessage: state.auth.error
    }
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions )(SignUp);