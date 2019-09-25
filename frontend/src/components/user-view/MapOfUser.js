import React, { Component } from 'react';
import { AuthConsumer } from '../auth/authContext';
import MapWrapper from '../map/Map';

class MapOfUser extends Component {

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
            lat: isNaN(this.props.user_latitude) ? 40.741609 : this.props.user_latitude,
            lng: isNaN(this.props.user_longitude) ? -111.847956 : this.props.user_longitude
        }
        return (
            {/* <div>
                <p className="page-subtitle">My Neighborhood</p>
                <Map center={center}
                    zoom={18}
                    isUser={true}
                ></Map>
            </div>
            <AuthConsumer>
                {({ accessToken }) => (
                    <div>
                        <p className="page-subtitle">My Neighborhood</p>
                        <MapWrapper latitude={this.props.latitude}
                            longitude={this.props.longitude}
                            token={accessToken}
                        ></MapWrapper>
                    </div>
                )}
            </AuthConsumer> */}
        )
    }
}

export default MapOfUser;