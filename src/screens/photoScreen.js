import React,{Component} from 'react';
import {View} from 'react-native';

export default class PhotoScreen extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: `test`,
        headerTitleStyle: { textAlign: 'left', alignSelf: 'flex-start', color: 'white' },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#1e2326',

        },
    });
    render(){
        return <View/>
    }
    
}