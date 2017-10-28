import React from 'react';
import {StyleSheet, Text, View, TextInput, CheckBox } from 'react-native';
import { Card, Button, Divider } from 'react-native-material-design';

export default class ProfileView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			unit: '',
			street: '',
			citycode: '',
			city: '',
			status: STATUS.NOT_ACTIVE,
			worktime: {
				start: '',
				end: ''
			},
			holiday: false
		}
	}

	onUnitChange = (val) => {
        console.log(val)
		this.setState({unit: val});
	};

	onStatusChange = (val) => {
		this.setState({status: val});
	};

	onStreetChange = (val) => {
		this.setState({street: val});
	};

	onCitycodeChange = (val) => {
		this.setState({citycode: val});
	};

	onCityChange = (val) => {
		this.setState({city: val});
	};

	onStartTimeChange = (val) => {
		this.setState({
			worktime: {
				start: val,
				end: this.state.worktime.end
			}
		});
	};

	onEndTimeChange = (val) => {
		this.setState({
			worktime: {
				start: this.state.worktime.start,
				end: val
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
                    <Card>
                        <Card.Body>
                        <View style={styles.card}>
                            <Text>Jednostka OSP: </Text>
                            <TextInput placeholder="nazwa jednostki" style={{width: 200, paddingLeft:5}}value={this.state.unit} onChangeText={this.onUnitChange}/>
                           </View>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Text>Adres: </Text>
                        <TextInput placeholder="Ulica" style={{paddingLeft:5}} value={this.state.street} onChangeText={this.onStreetChange}/>
                        <View style={{flexDirection:'row'}}>
                        <TextInput placeholder="Kod pocztowy" style={{flex:3,paddingLeft:5}} value={this.state.citycode} onChangeText={this.onCitycodeChange}/>
                        <TextInput placeholder="Miasto" style={{flex:7,paddingLeft:5}} value={this.state.city} onChangeText={this.onCityChange}/>
                        </View>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <View style={{flexDirection:'row'}}>
                                <Text>Godziny pracy: </Text>

                                <TextInput style={{paddingLeft:5}} value={this.state.worktime.start} onChangeText={this.onStartTimeChange}/>
                                <Text> - </Text>
                                <TextInput style={{paddingLeft:5}} value={this.state.worktime.end} onChangeText={this.onEndTimeChange}/>
                            </View>

                            <Text>{this.state.status}</Text>
                            <Text>Urlop</Text>

                        </Card.Body>
                    </Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#f5f5f5',
			marginTop: 100,
		},
		card: {
		flexDirection: 'row'

		}
	});

export const STATUS = {
		ACTIVE: 'pracuje',
		NOT_ACTIVE: 'poza godzinami pracy',
		ON_HOLD: 'urlop'
	};
