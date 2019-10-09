import React, { Component } from 'react';

class UserOverallStats extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Stats</p>
                <p>Total earned selling</p>
                <p>Total energy sold</p>
                <p>Total spent buying</p>
                <p>Total energy bought</p>
                <p>Net money spent in the system (sold - spent)</p>
                <p>Hypothetically saved vs. just buying from Rocky Mountain</p>
            </div>
        )
    }
}

export default UserOverallStats;
