import React, { PureComponent } from "react";
import {Image, TouchableOpacity } from "react-native";

export default class ImageListItem extends PureComponent {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <TouchableOpacity>
                    <Image style={{  width: 300, height: 300, marginRight: 10, borderRadius: 15, }} source={{ uri: 'data:image/png;base64,' + this.props.photo.image }} />
            </TouchableOpacity>)

    }
}
