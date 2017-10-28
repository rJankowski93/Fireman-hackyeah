import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class EventInfo extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Event</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff11d8',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
