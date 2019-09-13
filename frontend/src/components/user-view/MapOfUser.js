import React, { Component } from 'react';
import Map from '../map/Map';

class MapOfAllUsers extends Component {

    constructor(props) {
        super(props);

        // set state
        this.state = {
        }
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">My neighborhood</p>
                <Map />
            </div>
        )
    }
}

export default MapOfAllUsers;