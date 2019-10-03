import React, { Component } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

class Error404 extends Component {
    render() {
        return (
            <div className="error-container">
                {!this.props.token ?
                    <div className="wrapper">
                        <p className="page-title center-text">404</p>
                        <p className="error"><FaExclamationTriangle className="icon" size="1.5rem"></FaExclamationTriangle> You don't have access here!</p>
                    </div> : null
                }
            </div>
        );
    }
}
export default Error404;
