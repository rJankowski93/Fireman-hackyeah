import React from 'react';
import {StyleSheet,Alert, View, Keyboard} from 'react-native';
import MapView from 'react-native-maps';
import EventFormComponent from '../component/EventFormComponent'
import Button from "react-native-button";
import EventModel from '../model/EventModel'
import StatusBarComponent from "../component/StatusBarComponent";
import * as firebase from 'firebase';
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from '../registerForPushNotificationsAsync'


const delta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

export default class EventCreationView extends React.Component {

    constructor(props) {
        super(props);
        //set region and markers
        this.state = {
            region: {
                latitude: 50.0676462,
                longitude: 19.9916288,
                latitudeDelta: delta.latitudeDelta,
                longitudeDelta: delta.longitudeDelta
            },
            error: null,
            markers: [
                {
                    id: 0,
                    latlng:{
                        latitude: 50.0676462,
                        longitude: 19.9916288
                    },
                    title: 'Pożar',
                    description: '0.0, 0.0'
                }
            ],
            //test:this.props.event,
            event: EventModel,
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
                    },
                    markers: [
                        {
                         id: 0,
                        latlng:{
                             latitude: position.coords.latitude,
                             longitude: position.coords.longitude
                         },
                             title: 'Pożar',
                             description: Number(position.coords.latitude).toFixed(4)+', '+ Number(position.coords.longitude).toFixed(4)
                          }
                       ],
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    componentDidUpdate(){
        console.log(this.state.region.latitude,this.state.region.longitude)
    }

    addMarker(e){
    let markers = this.state.markers;
    let marker = {
                        id: markers.length,
                        latlng:e.coordinate,
                        title: 'Pożar',
                        description:  Number(e.coordinate.latitude).toFixed(4)+', '+Number(e.coordinate.longitude).toFixed(4)
      }
      markers.push(marker);

      this.setState(markers);
    }
    addMarkerFromForm(e){
    let markers = this.state.markers;
    let marker = {
                        id: markers.length,
                        latlng:{latitude: e.lat,longitude:e.lng},
                        title: e.category +' | '+ e.name,
                        description:  Number(e.lat).toFixed(2)+', '+Number(e.lng).toFixed(2)+" | "+e.address+" | "+e.descryption
      }
      markers.push(marker);

      this.setState(markers);
    }


    setEvent(newEvent){
        () => { this.setState({event:newEvent}); }
   }

    render() {
    console.log(this.state.markers[0].latlng.latitude, this.state.markers[0].latlng.longitude)
        return (
            <View style={styles.container}>
                <StatusBarComponent backgroundColor="#B41A16" />
            <EventFormComponent ref={(el) => { this.eventForm = el; }} {...this.state.markers[0].latlng} setEvent={this.setEvent}/>
          
                { <MapView
                    style={styles.map}
                    region={this.state.region}
                    showsMyLocationButton={true}
                    onRegionChange={ region => this.setState({region}) }
                    onRegionChangeComplete={ region => this.setState({region}) }
                    onLongPress={e => this.addMarker(e.nativeEvent)}
                    onPress={()=>Keyboard.dismiss()}
                   >

                    {this.state.markers.map(marker =>
                        <MapView.Marker
                            key={marker.id}
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                    )}

                </MapView> }
                <View style={styles.footer}>
                <Button onPress={() => this.sendEvent()} style={styles.sendButton}>Wyślij</Button>
                <Button  style={styles.CancelButton}>Anuluj</Button>
                </View>
            </View>
        );
    }

    _registerForPushNotifications() {
        registerForPushNotificationsAsync();
      }


    sendEvent = () => {      
        this.setState({event: this.eventForm.state.event})
        this.addMarkerFromForm(this.eventForm.state.event)
        this._notificationSubscription = this._registerForPushNotifications();        
    }
}



const styles = StyleSheet.create({
    map: {
        flex:0.9
    },
    container:{
        flex:1
    },
    footer:{   
        flexDirection: 'row'
    },
    sendButton:{ 
        justifyContent:"center",   
        width:200,
        height:30,
        backgroundColor:'#00ff00'
    },
    CancelButton:{
      justifyContent:"center",
        width:200,
        height:30,
        backgroundColor:'#ff0000',
    },
});
