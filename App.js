import React from "react";
import {StyleSheet, Text, View, StatusBar, Platform} from "react-native";
import EventCreationView from "./app/view/EventCreationView";
import EventListView from "./app/view/EventListView";
import EventView from "./app/view/EventView";
import OfficersListView from "./app/view/OfficersListView";
import ProfileView from "./app/view/ProfileView";


export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {/*<EventCreationView/>*/}
                {/*<EventListView/>*/}
                {/*<EventView />*/}
                {/*<OfficersListView/>*/}
                {/*<ProfileView/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
