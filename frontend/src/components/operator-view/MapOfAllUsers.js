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
        let center = {
            lat: 40.741609,
            lng: -111.847956
        }
        return (
            <div>
                <p className="page-subtitle">System-Wide Map</p>
                <Map
                    //  TODO calculate these values with filter or map or something, currently centered on the Park Building, University of Utah
                    center={center}
                    zoom={12}
                    isUser={false}
                ></Map>
            </div>
        )
    }
}

export default MapOfAllUsers;