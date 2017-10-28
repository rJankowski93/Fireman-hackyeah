import React from "react";
import {StyleSheet, Text, View, Image, Linking, Component, TouchableHighlight} from "react-native";
import MapView from "react-native-maps";

export const CATEGORY = {
    FIRE: 'Fire',
    CAT: 'Cat',
    TREE: 'Tree',
    ACCIDENT_CAR: 'Accident car',
};

export const PRIORITY = {
    HIGH: 'High',
    NORMAL: 'Normal',
    LOW: 'Low',
};

const event = {
    name: 'New event',
    description: 'new event very very busy day',
    category: CATEGORY.FIRE,
    priority: PRIORITY.NORMAL,
    latitude: '50.12180069999999',
    longitude: '19.020002299999987'
};

export default class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pressStatus: false };
    }
    onHideUnderlay(){
        this.setState({ pressStatus: false });
    }
    onShowUnderlay(){
        this.setState({ pressStatus: true });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.text}>
                    <Text>  <Text style={styles.names}>Nazwa: </Text> {event.name} </Text>
                    <Text>  <Text style={styles.names}>Opis: </Text> {event.description} </Text>
                    <Text>  <Text style={styles.names}>Kategoria: </Text> {event.category} </Text>
                    <Text>  <Text style={styles.names}>Priorytet: </Text> {event.priority} </Text>
                </View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                <View style={styles.buttons}>
                    <TouchableHighlight style={this.state.pressStatus ? styles.buttonAcceptPress : styles.buttonAccept }
                                        onPress={() => this.acceptEvent(event.latitude, event.longitude)}
                                        onHideUnderlay={this.onHideUnderlay.bind(this)}
                                        onShowUnderlay={this.onShowUnderlay.bind(this)}>
                        <Text style={styles.buttonAcceptText}>Akceptuj</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.buttonReject}
                                        onPress={() => this.rejectEvent()}>
                        <Text style={styles.buttonRejectText}>Odrzuć</Text>
                    </TouchableHighlight>
                </View>
            </View>


        );
    }

    acceptEvent(latitude, longitude) {
        Linking.openURL('https://www.google.com/maps/place/' + latitude + ',' + longitude);
    }

    rejectEvent() {
        //TODO remove status event for the user
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C2C2C2',
    },
    names:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        flex: 1,
        marginTop: 50,
    },
    map: {
        width: 400,
        flex: 3,
    },
    buttonAccept: {
        width: 100,
        height: 50,
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:15,
        backgroundColor:'#88ff80',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#000000'
    },
    buttonAcceptPress:{
        width: 100,
        height: 50,
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:15,
        backgroundColor:'#6aff29',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#000000'
    },
    buttonAcceptText: {
        color:'#000000',
        textAlign:'center',
    },
    buttonReject: {
        width: 100,
        height: 50,
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:15,
        backgroundColor:'#ff2f3e',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#000000'
    },
    buttonRejectText: {
        color:'#000000',
        textAlign:'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
});


