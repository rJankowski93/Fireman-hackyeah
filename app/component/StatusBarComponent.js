import React from "react";
import {StyleSheet, Text, View, StatusBar, Platform} from "react-native";

export default class MyStatusBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render=() =>{
        return (
            <View style={styles.statusBar}>
                <View translucent backgroundColor={this.props.backgroundColor}>
                    <Text style={styles.statusBarText}>Strażak sam</Text>
                </View>
            </View>
        );
    }

}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 80 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,

    },
    statusBarText:{
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30,
        fontSize:25,
        fontWeight: 'bold',
    },
    appBar: {
        backgroundColor:'#79B45D',
        height: APPBAR_HEIGHT,
    },
    content: {
        flex: 1,
        backgroundColor: '#33373B',
    },
});

