import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default class StoryListItem extends PureComponent {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <TouchableOpacity  onPress={() => this.props.onPress(this.props.story.id,this.props.story.name)}>
                <View  style={{ flex: 1,marginBottom:10,marginHorizontal:5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10,borderRadius:10,backgroundColor: '#22272b' }}>
                    <Image style={{ flex: 1, width: '100%', height: '100%', marginRight: 10, borderRadius: 15 }} source={{ uri: 'data:image/png;base64,' + this.props.story.thumb }} />
                    <View style={{ flex: 3, flexDirection: 'column' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 21, color: '#cdcecf' }}>{this.props.story.name}</Text>
                        <Text style={{ color: '#cdcecf' }}>{this.props.story.previewText + '...'}</Text>
                    </View>
                </View>
            </TouchableOpacity>)

    }
}
