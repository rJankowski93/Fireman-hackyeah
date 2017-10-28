import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

const delta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

export default class EventCreationView extends React.Component {

    constructor() {
        super();

        //set region and markers
        this.state = {
            region: {
                latitude: 19.9449799,
                longitude: 50.0646501,
                latitudeDelta: delta.latitudeDelta,
                longitudeDelta: delta.longitudeDelta
            },
            error: null,
            markers: [
                {
                    id: 1,
                    latlng:{
                        latitude: 19.9449799,
                        longitude: 50.0646501
                    },
                    title: 'Foo Place',
                    description: '1234 Foo Drive'
                }
            ]
        };
    }

    //get current cords after creating component
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: delta.latitudeDelta,
                        longitudeDelta: delta.longitudeDelta
                    }
                },()=>this.forceUpdate());

            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    render() {
        return (
            <View>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    showsMyLocationButton={true}
                    onRegionChange={ region => this.setState({region}) }
                    onRegionChangeComplete={ region => this.setState({region}) }
                   >

                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            key={marker.id}
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}

                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: 300,
        height: 300
    }
});
