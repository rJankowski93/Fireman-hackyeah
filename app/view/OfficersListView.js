import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    listElement: {
        flex: 1,
        marginTop: 20,
        //alignItems: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
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
        console.log("notifyOfficer works");
    }

    componentDidMount() {
        fetch('http://192.168.43.91:8080/api/user/all')
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
        return (
            <FlatList
                data={this.state.users}
                renderItem={({item}) => <Text style={styles.item}>{item.firstName}</Text>}
            />
        )
    }
}

export default OfficersListView;