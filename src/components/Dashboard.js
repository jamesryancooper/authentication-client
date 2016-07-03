import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from './Card';

class Dashboard extends Component {

    componentWillMount() {
        this.props.fetchMessage();
    }

    render () {
        return(
            <Card />
        )
    }

}

function mapStateToProps ( state ) {
    return {
        message: state.auth.message
    }
}
export default connect( mapStateToProps, actions )( Dashboard );