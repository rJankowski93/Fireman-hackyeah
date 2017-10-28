import React from "react";
import {StyleSheet, Text, View, Image, Linking, Component} from "react-native";
import MapView from "react-native-maps";
import Button from "react-native-button";

export default class Event extends React.Component {

    render() {
        var MOCKED_EVENTS_DATA = [
            {
                name: 'New event',
                description: 'new event very very busy day',
                category: CATEGORY.FIRE,
                priority: PRIORITY.NORMAL,
                latitude: '50.12180069999999',
                longitude: '19.020002299999987'
            },
        ];
        var event = MOCKED_EVENTS_DATA[0];

        return (

            <View style={styles.container}>

                <View style={styles.text}>
                    <Text>Nazwa: {event.name}</Text>
                    <Text>Opis: {event.description}</Text>
                    <Text>Kategoria: {event.category}</Text>
                    <Text>Priorytet: {event.priority}</Text>
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
                    <Button style={styles.buttonAccept}
                            onPress={() => this.acceptEvent(event.latitude,event.longitude)}>

                        Akceptuj
                    </Button>
                    <Button style={styles.buttonReject}
                            onPress={() => this.rejectEvent()}>
                        Odrzuc
                    </Button>
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
    text: {
        flex: 1,
        marginTop: 50,
    },
    map: {
        width: 300,
        flex: 3,
    },
    buttonAccept: {
        backgroundColor: '#6aff29',
        width: 100,
        height: 50,
        margin: 10,
    },
    buttonReject: {
        backgroundColor: '#ff4b48',
        width: 100,
        height: 50,
        margin: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
});

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
