import React, { Component } from 'react';
import { Map, GoogleMap, Marker, GoogleApiWrapper } from 'google-maps-react';
import UsersService from './UsersService';

const usersService = new UsersService();

class MapContainer extends Component {

    
    addMarkers() {
        var self = this;
        usersService.getUsers().then(result => {
            let markers = [];
            // Get the lat/long of each user
            for(var i = 0; i < result.data.length; i++)
            {
                var user = result.data[i];
                markers.push(
                    <Marker 
                    title={user.FirstName + ' ' + user.LastName}
                    position={{lat: user.latitude, lng: user.longitude}} /> 
                )
            }

            return markers;
        });
    }

    style = {
        width: '80vh',
        height: '80vh'
      }

    render() {

        return (
          <Map google={this.props.google} zoom={14}

          style = {{width: '97%', height: '70vh', position: 'relative'}}
            center={{ // University of utah
                lat: 40.764938,
                lng: -111.842102
            }} >
            {
                this.addMarkers()
            }
            <Marker
                    title={'University of Utah'}
                    position={{lat: 40.764938, lng: -111.842102}} />    
                
          </Map>
          
                   
        );
      }
};
export default GoogleApiWrapper({
    apiKey: ('AIzaSyCOdgp6GdEi5xInKD6aR4n4XleNU-Gy3d0')
  })(MapContainer)