import Swipeout from "react-native-swipeout";
import React, {Component} from "react";

export default class SwipeoutWrapper extends React.Component {
    constructor(props) {
        super(props);
        itemId = props.itemId;
        this.state = props;
        this.state.right.onPress = this.newOnPress;
    }

    render() {
        return <Swipeout {...this.state}/>
    }

    newOnPress = () =>{
        return this.props.right.onPress(this.itemId);
    }
}