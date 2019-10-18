import React, { Component } from 'react';
import { AuthConsumer } from '../auth/authContext';
import MapWrapper from '../map/MapWrapper';

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
            <AuthConsumer>
                {({ accessToken }) => (
                    <div>
                        <p className="page-subtitle">System-Wide Map</p>
                        <MapWrapper
                            token={accessToken}
                            center={center}
                            zoom={12}
                            isUser={false}
                        ></MapWrapper>
                    </div>
                )}
            </AuthConsumer>
        )
    }
}

export default MapOfAllUsers;