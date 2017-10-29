import React, {Component} from "react";
import {View, Text, FlatList, ActivityIndicator} from "react-native";
import {List, ListItem, SearchBar} from "react-native-elements";
import StatusBarComponent from "../component/StatusBarComponent";

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
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = (name: string) => {
        const {page} = this.state;
        const url = 'http://10.240.101.227:8080/api/event/getPage?name=' + name + '&page=' + page + "&results=" + 10;
        this.setState({loading: true});

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res : [...this.state.data, ...res],
                    data: res,
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
        this.makeRemoteRequest(text);
    }

    renderHeader = () => {
        return <SearchBar placeholder="Wpisz nazwe..." lightTheme round
                          textInputRef="searchText"
                          onChangeText={this.searchText.bind(this)}/>;

        {/*return <Text></Text>;*/
        }
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
        {/*return <View></View>*/
        }
    };

    render() {
        return (

            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <StatusBarComponent backgroundColor="#B41A16" />

                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name}`}
              subtitle={item.category}
              avatar={<View       style={{
                backgroundColor: item.priority==PRIORITY.HIGH  ? "#D00009" : item.priority==PRIORITY.NORMAL ? "#BBD004" : "#3DD002",
                width: 30,
                 height: 30,

                borderRadius: 50,
        }}></View>}
              containerStyle={{ borderBottomWidth: 0 }}
            />
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


export default EventListView;


