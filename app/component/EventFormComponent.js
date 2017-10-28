import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';
import EventModel from '../model/EventModel'

export default class EventFormComponent extends React.Component {
  

    constructor(props){
        super(props);
        this.state = {
            event: EventModel,
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dodja zgłosznie:</Text>
        <View style={styles.properties}>
        <Text style={styles.label}>Nazwa</Text>
        <TextInput onChangeText={(event) => this.setState({state:this.state.event.name})}></TextInput>
        <Text style={styles.label}  >Kategoria</Text>
        <Picker onValueChange={(itemValue, itemIndex) => this.setState({state:this.state.event.category})} >
            <Picker.Item label="pożar" value="FIRE" />
            <Picker.Item label="koty" value="CAT" />
            <Picker.Item label="drzewa" value="TREE" />
            <Picker.Item label="wypadki samochodowe" value="ACCIDENT_CAR" />
        </Picker>
        <Text style={styles.label}>Priorytet</Text>
        <Picker onValueChange={(itemValue, itemIndex) => this.setState({state:this.state.event.priority})} >
            <Picker.Item label="niski" value="LOW" />
            <Picker.Item label="normalny" value="NORMAL" />
            <Picker.Item label="wysoki" value="HIGH" />
        </Picker>
        <Text style={styles.label} >Opis</Text>
        <TextInput  onChangeText={(event) => this.setState({state:this.state.event.descryption})}></TextInput>
   </View>

      </View>
    );
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