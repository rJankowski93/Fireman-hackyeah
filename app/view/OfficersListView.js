import React from 'react';
import {View, ListView, StyleSheet, Text, Button} from 'react-native';
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
    }

});

class OfficersListView extends React.Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(['Rafal Jankowski', 'Bartlomiej Golabek', 'Karol Klimonczyk', 'Michal Drak', 'Dominik Kownacki']),
        };

        OfficersService.getOfficers();
    }

    notifyOfficer = () => {
        console.log("notifyOfficer works");
    }


    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) =>
                    <View style={styles.listElement}>
                        <Text>{data}</Text>
                        <Button
                            title={'Delegate'}
                            onPress={this.notifyOfficer}>
                        </Button>
                    </View>
                }
            />
        );
    }
}

export default OfficersListView;