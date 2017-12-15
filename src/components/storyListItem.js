import React, { Component } from "react";
import { View, Text, Image } from "react-native";

export default class StoryListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row',justifyContent:'space-between', alignItems:'center',padding:10 }}>
             <Image style={{ flex: 1, width:'100%', height:'100%', marginRight: 10,  borderRadius: 15 }} source={{ uri: 'data:image/png;base64,' + this.props.story.thumb }} />
                <View style={{ flex: 3, flexDirection: 'column' }}>
                    <Text style={{fontWeight:'bold', fontSize:21}}>{this.props.story.name}</Text>
                    <Text>{this.props.story.previewText+'...'}</Text>
                </View>
            </View>)

    }
}
