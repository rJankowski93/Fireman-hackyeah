import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';
import EventModel from '../model/EventModel'

export default class EventFormComponent  extends React.Component{
  

    constructor(props){
        super(props);
        this.state = {
            event: EventModel,
        }
    }

    getGeocode = (address) => {
        return fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyBpJtcjgHE_YccUpuTNgQg--1MTo80DB1Q')
          .then((response) => response.json())
          .then((responseJson) => {
          //console.log(responseJson.results[0])
              let event = this.state.event;
              event.lat = responseJson.results[0].geometry.location.lat;
              event.lng = responseJson.results[0].geometry.location.lng;
              return event;
          })
          .catch((error) => {
            console.error(error);
          });
      }

      componentWillMount = () => {
        let coords = this.props.latitude+', '+this.props.longitude;
        this.getReverseGeocode(coords)
        .then((val) => {
            let e = val;
            val.lat = this.props.latitude;
            val.lng = this.props.longitude;
            this.setState({event:val});
        })
        .catch((error) => {
          console.error(error);
        });
      }

      getReverseGeocode = (coords) => {
        return fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+coords+'&key=AIzaSyBpJtcjgHE_YccUpuTNgQg--1MTo80DB1Q')
          .then((response) => response.json())
          .then((responseJson) => {
          console.log(responseJson.results[0])
              let event = this.state.event;
              event.address = responseJson.results[0].formatted_address;
              return event;
          })
          .catch((error) => {
            console.error(error);
          });
      }

      updateAddress = (address) => {
      if(this.binding){
              clearTimeout(this.binding)
            }
      this.getGeocode(address)
            .then((val) => {
              this.setState({event:val});
            })
            .catch((error) => {
              console.error(error);
            });

      }

      onAddressChange = (val) => {
      if(this.binding){
        clearTimeout(this.binding)
      }
      let event = this.state.event;
      event.address = val;
      this.setState(event:event)
        let rebound = this.updateAddress.bind(this,val)
        if(val){
         this.binding = setTimeout(rebound, 2000);
        }
      }

  render() {  

this.props.setEvent(this.state.event);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dodja zgłosznie:</Text>
        <View style={styles.properties}>
        <Text style={styles.label}>Nazwa</Text>
        <TextInput value={this.state.event.name} onChangeText={this.onNameChanged}></TextInput>
        <Text style={styles.label}  >Kategoria</Text>
        <Picker selectedValue={this.state.event.category}
                onValueChange={this.onCategoryChanged} >
            <Picker.Item label="pożar" value="FIRE" />
            <Picker.Item label="koty" value="CAT" />
            <Picker.Item label="drzewa" value="TREE" />
            <Picker.Item label="wypadki samochodowe" value="ACCIDENT_CAR" />
        </Picker>
        <Text style={styles.label}>Priorytet</Text>
        <Picker onValueChange={this.onPriorityChanged}
                selectedValue={this.state.event.priority} >
            <Picker.Item label="niski" value="LOW" />
            <Picker.Item label="normalny" value="NORMAL" />
            <Picker.Item label="wysoki" value="HIGH" />
        </Picker>
        <Text style={styles.label} >Opis</Text>
        <TextInput value={this.state.event.descryption} onChangeText={this.onDescryptionChanged}></TextInput>
        <Text  style={styles.label} >Adres {this.state.event.lat+', '+this.state.event.lng}</Text>
        <TextInput value={this.state.event.address} onChangeText={this.onAddressChange}></TextInput>
   </View>

      </View>  
    );
  }

  onNameChanged=(text)=>{
    let newState = this.state.event;
    newState.name=text;
    this.setState({event:newState});
  }

  onDescryptionChanged=(text)=>{
    let newState = this.state.event;
    newState.descryption=text;
    this.setState({event:newState});
  }

  onPriorityChanged=(text)=>{
    let newState = this.state.event;
    newState.priority=text;
    this.setState({event:newState});
  }

  onCategoryChanged=(text)=>{
    let newState = this.state.event;
    newState.category=text;
    this.setState({event:newState});
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title:{
    fontSize:18
  },
  label:{
    margin: 5  
  },
});

export const CATEGORY = {
    FIRE : 'Fire',
    CAT : 'Cat',
    TREE : 'Tree',
    ACCIDENT_CAR : 'Accident car',
};

export const PRIORITY = {
    HIGH : 'High',
    NORMAL : 'Normal',
    LOW : 'Low',
};