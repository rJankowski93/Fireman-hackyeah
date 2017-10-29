import EventView from '../view/EventView';
import EventCreationView from '../view/EventCreationView';

import React from 'react';
import { TabNavigator ,StackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';


export const EventViewStack = StackNavigator({
    EventView: {
        screen: EventView,
    }
});


export const Tabs = TabNavigator({
    EventView: {
        screen: EventViewStack,
        navigationOptions: {
            tabBarLabel: 'EventView',
            tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
        },
    },
    EventCreationView: {
        screen: EventCreationView,
        navigationOptions: {
            tabBarLabel: 'EventCreationView',
            tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        },
    },
});