import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Event extends React.Component {
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
        backgroundColor: '#0008ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
