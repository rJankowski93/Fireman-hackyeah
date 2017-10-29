import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import EventCreationView from './app/view/EventCreationView';
import OfficersListView from "./app/view/OfficersListView";
import {Tabs} from "./app/service/Router";


export default class App extends React.Component {

    // constructor() {
    //     super();
    //
    //     this.state = {
    //         currentView: <EventCreationView/>
    //     }
    // }
    //
    // changeView(view) {
    //     this.setState({
    //         currentView: view
    //     });
    // }
    render() {

        // UserService.save(1,"name","adrres")


        return (
            <Tabs/>
            {/*<View style={styles.container}>*/}
                {/*{this.state.currentView}*/}

                {/*<TouchableHighlight style={style.navigation} onPress={this.changeView(<OfficersListView/>)}>*/}
                    {/*<Image*/}
                        {/*style={styles.button}*/}
                        {/*source={require('./img/home.png')}*/}
                    {/*/>*/}
                {/*</TouchableHighlight>*/}
            {/*</View>*/}
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigation: {
        flex: 2
    },
    button: {
        flex: 1
    }
});
