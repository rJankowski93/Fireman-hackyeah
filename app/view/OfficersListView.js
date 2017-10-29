import React from 'react';
import {FlatList, StyleSheet, Text, View, Button, ListView} from 'react-native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    listElement: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    button: {},
    rowFront: {
        alignItems: 'center',
        flex: 1,
        padding: 10,
        backgroundColor: 'blue',
        borderBottomColor: 'red',
        borderBottomWidth: 1,
        justifyContent: 'center',
        //height: 100,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },

});

class OfficersListView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

    }

    notifyOfficer = () => {
        //Tutaj wysylamy notyfikacje do user
        console.log("notifyOfficer works");
    }

    componentDidMount() {
        fetch('http://10.240.101.227:8080/api/user/activeUsers')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    users: responseJson
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (

            <SwipeListView
                dataSource={ds.cloneWithRows(this.state.users)}
                renderRow={user => (
                    <View style={[styles.listElement, styles.rowFront]}>
                        <Text style={styles.text}>
                            {user.firstName} {user.lastName}
                        </Text>
                        <Button
                            style={styles.button}
                            title={'Delegate'}
                            onPress={this.notifyOfficer}>
                        </Button>
                    </View>
                )}
                renderHiddenRow={user => (
                    <View style={[styles.listElement, styles.rowBack]}>
                        <Text>Left</Text>

                        <Text>Right</Text>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
                disableRightSwipe={false}
                disableLeftSwipe={false}
            />
        )
    }
}

export default OfficersListView;
