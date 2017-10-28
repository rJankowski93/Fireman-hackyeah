import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class ProfileView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			unit: '-',
			address: 'none',
			status: STATUS.NOT_ACTIVE,
			worktime: {
				start: '',
				end: ''
			}
		}
	}

	onStatusChange = (val) => {
		this.setState({status: val});
	};

	onAddressChange = (val) => {
		this.setState({address: val});
	};

	onStartTimeChange = (val) => {
		this.setState({
			worktime: {
				start: val
			}
		});
	};

	onEndTimeChange = (val) => {
		this.setState({
			worktime: {
				end: val
			}
		});
	};
}

render(){
	return (
		<View style={styles.container}>
			<Text>Jednostka OSP:</Text> <TextInput value={this.state.unit}/>
			<Text>Adres:</Text> <TextInput value={this.state.address}/>
			<Text>Godziny pracy:</Text>
			<TextInput value={this.state.address} onChange={this.onStartTimeChange}/>
			<TextInput value={this.state.address} onChange={this.onEndTimeChange}/>
			<Text>{this.state.status}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0008ff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export const STATUS = {
	ACTIVE: 'pracuje',
	NOT_ACTIVE: 'poza godzinami pracy',
	ON_HOLD: 'urlop'
};
