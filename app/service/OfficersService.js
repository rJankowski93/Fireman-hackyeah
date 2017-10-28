import React from 'react';
// import {fetch} from "react-native";

export default class OfficersService extends React.Component {


    static log = () => {
        console.log("asdadasd");
    }

    static getOfficers = () => {
        return fetch('http://127.0.0.1:8080/api/user/all')
            .then((response) => {
                console.log(response);
            response.json()})
            .then((responseJson) => {
                return console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

