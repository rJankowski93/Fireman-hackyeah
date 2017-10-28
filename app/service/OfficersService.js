import React from 'react';

export default class OfficersService extends React.Component {

    static getOfficers = () => {
        return fetch('http://-your-ip:8080/api/user/all')
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

