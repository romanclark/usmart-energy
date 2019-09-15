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
        return (
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
            </AuthConsumer>
        )
    }
}

export default MapOfUser;