import React, { Component } from 'react';
import './Map.css';
import GoogleMapReact from 'google-map-react'
import Marker from './marker'

import UsersService from '../user-view/UsersService'
const usersService = new UsersService();

class MapWrapper extends Component {
    constructor(props) {
        super(props);

        this.getUsers = this.getUsers.bind(this);
        this.selectMarker = this.selectMarker.bind(this);

        this.state = {
            locations: [],
            search: '',
            isUser: false,
            center: {
                lat: 0,
                lng: 0
            },
            selectedMarker: null
        }
        this.getUsers();
    }

    getUsers() {
        var self = this;
        usersService.getAllUsers(this.props.token).then(function (result) {
            self.setState({ locations: result.data })
        })
    }

    componentWillReceiveProps() {
        this.setState({
            isUser: this.props.isUser,
            center: this.props.center,
        });
    }

    selectMarker = (marker) => {
        this.setState({
            selectedMarker: marker === this.state.selectedMarker ? null : marker
        })
    };

    render() {
        return (
            <div className={this.props.isUser ? "map map-container-small" : "map map-container"}>
                <GoogleMapReact
                    center={this.props.center}
                    zoom={this.props.zoom}>
                    {this.state.locations.map((user) => {
                        return <Marker
                            key={user.user_id}
                            lat={user.latitude}
                            lng={user.longitude}
                            marker={user}
                            selected={user === this.state.selectedMarker} // boolean
                            handleClick={this.selectMarker}
                            text={user.first_name}>
                        </Marker>
                    })}
                </GoogleMapReact>
            </div>
        );
    }
}

export default MapWrapper;
