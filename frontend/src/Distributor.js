import React, { Component } from 'react';


class Distributor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPageURL: ''
        };
    }
    render() {

        return (
            <div className="distributor">
                <a className="btn btn-primary" href={"/users/"}>View Users</a>
                <a className="btn btn-primary" href={"/assets/"}>View Assets</a>
            </div>
        );
    }

}

export default Distributor;