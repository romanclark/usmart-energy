import React, { Component } from 'react';
import './Map.css';
// import data from './data'
import GoogleMapReact from 'google-map-react'
import Marker from './components/marker'
import UsersService from './UsersService'

const usersService = new UsersService();


class MapWrapper extends Component {
    constructor(props) {

        // TODO pass in props and have it center on the user's house if it's on the personal page, else have it just zoom out on "all" users houses
        super(props);
        this.state = {
            locations: [],
            allLocations: [],
            selectedLocation: null,
            search: ''
        }
    }

    componentDidMount() {
        var self = this;
        usersService.getUsers().then(function (result) {
            self.setState({ locations: result.data, allLocations: result.data })
        })
    }

    selectLocation = (location) => {
        this.setState({
            selectedLocation: location
        })
    };
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
        if (this.state.selectedLocation) {
            center = {
                lat: this.state.selectedLocation.latitude,
                lng: this.state.selectedLocation.longitude
            }
        }
        return (

            <div className="map">
                <GoogleMapReact
                    center={center}
                    zoom={16}>
                    {this.state.locations.map((location) => {
                        return <Marker
                            key={location.latitude}
                            lat={location.latitude}
                            lng={location.longitude}
                            text={location.name}
                            selected={location === this.state.selectedLocation}
                        >
                        </Marker>

                    })}
                </GoogleMapReact>
            </div>
        );
    }
}

export default MapWrapper;
