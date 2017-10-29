import React, {Component} from "react";
import {View, Text, FlatList, ActivityIndicator} from "react-native";
import {List, ListItem, SearchBar} from "react-native-elements";
import StatusBarComponent from "../component/StatusBarComponent";
// import {SwipeListView, SwipeRow,ListView} from 'react-native-swipe-list-view';
import Swipeout from 'react-native-swipeout';
import SwipeoutWrapper from "./SwipeoutWrapper"


export const PRIORITY = {
    HIGH: 'High',
    NORMAL: 'Normal',
    LOW: 'Low',
};



class EventListView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            text: ""
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const {page} = this.state;
        const url = 'http://10.240.101.227:8080/api/event/page/name?name=' + this.state.text + '&pageNumber=' + page + "&pageSize=" + 10;
        this.setState({loading: true});
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res : [...this.state.data, ...res],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
            />
        );
    };

    searchText = (text: string) => {
        this.state.data =[];
        this.state.page = 1;
        this.state.text = text;
        this.makeRemoteRequest();
    }

    renderHeader = () => {
        return <SearchBar placeholder="Wpisz nazwe..." lightTheme round
                          textInputRef="searchText"
                          onChangeText={this.searchText.bind(this)}/>;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };





    render() {

        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <StatusBarComponent backgroundColor="#B41A16"/>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <SwipeoutWrapper itemId={item.id} right={rightSwipeBtn} left={leftSwipeBtn}
                        >
                            <ListItem
                                roundAvatar
                                title={`${item.name}`}
                                subtitle={item.category}
                                avatar={
                                    <View
                                        style={{
                                        backgroundColor: item.priority==PRIORITY.HIGH  ? "#D00009" : item.priority==PRIORITY.NORMAL ? "#BBD004" : "#3DD002",
                                        width: 30,
                                        height: 30,
                                        borderRadius: 50,}}>
                                    </View>}
                                    containerStyle={{ borderBottomWidth: 0 }}
                            />
                        </SwipeoutWrapper>
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}
                />
            </List>
        );
    }

}


var rightSwipeBtn = [
    {
        text: 'Details',
        backgroundColor: '#0008ff',
        onPress: function () {
            console.log(this.itemId);
            // get details object
        }
    }
];

var leftSwipeBtn = [
    {
        text: 'Remove',
        backgroundColor: '#ff0c29',
        onPress: function () {
            console.log(this.itemId);
            // remove object by id
        }
    }
]


export default EventListView;


