import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventCreationView from './app/view/EventCreationView';
import OfficersListView from "./app/view/OfficersListView";


export default class App extends React.Component {
  
  
  
  render() {
  
 // UserService.save(1,"name","adrres")
  
  
    return (

    <OfficersListView/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
