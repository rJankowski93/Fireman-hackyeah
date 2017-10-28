import React from 'react';
import {View, ListView, StyleSheet, Text, Button, FlatList} from 'react-native';
import OfficersService from '../service/OfficersService';

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

        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(OfficersService.getOfficers()),
            test: OfficersService.getOfficers()
        };

        console.log(this.state.test)
    }

    notifyOfficer = () => {
        console.log("notifyOfficer works");
    }


    render() {
        return (
            <FlatList
                data={this.state.test}
                renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            />
        )
    }
}

export default OfficersListView;