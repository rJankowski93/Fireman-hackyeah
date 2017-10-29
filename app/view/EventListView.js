import React, {Component} from "react";
import {View, Text, FlatList, ActivityIndicator} from "react-native";
import {List, ListItem} from "react-native-elements";

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

    // componentDidMount() {
    //     this.makeRemoteRequest();
    // }

    makeRemoteRequest = () => {
        const {page, seed} = this.state;
        const url = `http://10.240.101.227:8080/api/event/all`;
        this.setState({loading: true});

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    // data: page === 1 ? res.results : [...this.state.data, ...res.results],
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

    renderHeader = () => {
        {/*return <SearchBar placeholder="Type Here..." lightTheme round />;*/
        }
        return <Text></Text>;
    };

    renderFooter = () => {
        // if (!this.state.loading) return null;
        //
        // return (
        //     <View
        //         style={{
        //   paddingVertical: 20,
        //   borderTopWidth: 1,
        //   borderColor: "#CED0CE"
        // }}
        //     >
        //         <ActivityIndicator animating size="large" />
        //     </View>
        // );
        return <View></View>
    };

    render() {
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
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


