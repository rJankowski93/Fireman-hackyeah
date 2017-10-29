import React from 'react';
import {StyleSheet, Text, View, TextInput } from 'react-native';
import { Card, Button, Divider } from 'react-native-material-design';
import CheckBox from 'react-native-checkbox';
import StatusBarComponent from "../component/StatusBarComponent";


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
	let status = this.changeStatus(val,this.state.worktime.end,this.state.holiday)
		this.setState({
		    status: status,
			worktime: {
				start: val,
				end: this.state.worktime.end
			}
		});
	};

	onEndTimeChange = (val) => {
	let status = this.changeStatus(this.state.worktime.start,val,this.state.holiday)
		this.setState({
		    status: status,
			worktime: {
				start: this.state.worktime.start,
				end: val
			}
		});
	};

	changeStatus = (timeStart, timeEnd, holiday) => {
	    if(holiday){
	        return STATUS.ON_HOLD;
	    } else{
            let nowHours = new Date();
            nowHours = nowHours.getHours();
            console.log(nowHours)
            let start,end;
            start = parseInt(timeStart);
            end = parseInt(timeEnd)
            if(start > end){
                if(nowHours >= start || (0 <= nowHours && nowHours < end)){console.log(4343);
                    return STATUS.ACTIVE;
                }
            } else {
                if(start <= nowHours && nowHours <= timeEnd){console.log(5555);
                    return STATUS.ACTIVE;
                }
            }
	    }
	    return STATUS.NOT_ACTIVE;
	}

	onHolidayChange = () => {
	    const isChecked = !this.state.holiday;
        let nextState = {
            holiday: isChecked
        }

        nextState.status = this.changeStatus(this.state.timeStart, this.state.timeEnd, isChecked);
        this.setState(nextState);
	}

	submitProfile= () => {
	    if(typeof this.props.onSave === 'function'){
            this.props.onSave(this.state);
	    }
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBarComponent backgroundColor="#B41A16" />

				<Text style={{fontSize:30, padding: 20}}>Profil</Text>
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
                        <TextInput placeholder="Kod pocztowy" keyboardType='numeric' style={{flex:3,paddingLeft:5}} value={this.state.citycode} onChangeText={this.onCitycodeChange}/>
                        <TextInput placeholder="Miasto" style={{flex:7,paddingLeft:5}} value={this.state.city} onChangeText={this.onCityChange}/>
                        </View>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <View style={{flexDirection:'row'}}>
                                <Text>Godziny pracy: </Text>

                                <TextInput keyboardType='phone-pad' style={{paddingLeft:5}} value={this.state.worktime.start} onChangeText={this.onStartTimeChange}/>
                                <Text> - </Text>
                                <TextInput keyboardType='phone-pad' style={{paddingLeft:5}} value={this.state.worktime.end} onChangeText={this.onEndTimeChange}/>
                            </View>

                            <Text style={{paddingBottom: 10}}>{this.state.status}</Text>
                            <CheckBox
                                                          label='Urlop'
                                                          checked={this.state.holiday}
                                                          onChange={this.onHolidayChange}
                                                        />
                        </Card.Body>
                    </Card>

                    <Button style={{backgroundColor:'blue'}} value="Zapisz profil" onPress={this.submitProfile} />

			</View>
		);
	}
}

const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#f5f5f5',
			marginTop: 20
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
