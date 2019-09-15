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

        this.state = {
            locations: [],
            allLocations: [],
            search: '',
            latitude: null,
            longitude: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.locations.length !== this.state.locations.length
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        var self = this;
        usersService.getUsers(self.props.token).then((result) => {
            self.setState({ locations: result.data, allLocations: result.data })
        })
    }

    componentWillReceiveProps() {
        this.getUsers();
        this.setState({
            latitude: this.props.latitude,
            longitude: this.props.longitude
        });
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value,
            locations: this.state.allLocations.filter((location) => new RegExp(this.state.search, 'i').exec(location.name))
        });
    };

    render() {
        let center = {
            lat: 40.767701,
            lng: -111.8458112
        };
        return (
            <div className="map map-container">
                <GoogleMapReact
                    center={center}
                    zoom={13}>
                    {this.state.locations.map((location) => {
                        var dot = <Marker
                            key={location.latitude}
                            lat={location.latitude}
                            lng={location.longitude}
                            text={location.name}>
                        </Marker>
                        return dot;
                    })}
                </GoogleMapReact>
            </div>
        );
    }
}

export default MapWrapper;
