import React, { Component } from "react";
import { ScrollView, Image, Text, ActivityIndicator } from "react-native";


export default class StoryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        // title: `${navigation.state.params.title}`,
        headerTitleStyle: { textAlign: 'left', alignSelf: 'flex-start', color: 'white' },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#1e2326',

        },
    });

    constructor(props) {
        super(props);
        this.state = {
            text: null,
            image: null,
            isLoading: false
        }
    }

    componentDidMount() {
        console.log('did mount storyScreen');
        this.setState({isLoading:true});
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        var myHeaders = new Headers();
        this.setState({ loading: true });
        myHeaders.append("X-ZUMO-APPLICATION", "eOxFathFeOfvquGBFoAZmDsGJuifQH42");
        const url = "http://storiesmobileservice.azure-mobile.net/tables/Story/" + this.props.navigation.state.params.storyId;
        fetch(url, { method: "GET", headers: myHeaders })
            .then((response) => response.json())
            .then((response) => this.makeImageRequest(response))
            .then((responseData) => {
                this.setState({
                    text: responseData.text,
                    image: responseData.image,
                    error: responseData.error || null,
                    isLoading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, isLoading: false });
            });
    }

    makeImageRequest = (storyResponse) => {
        var myHeaders = new Headers();
        this.setState({ loading: true });
        myHeaders.append("X-ZUMO-APPLICATION", "eOxFathFeOfvquGBFoAZmDsGJuifQH42");
        const url = "http://storiesmobileservice.azure-mobile.net/tables/Photo/" + storyResponse.photoId;
        return fetch(url, { method: "GET", headers: myHeaders })
            .then((response) => response.json())
            .then((response) => {
                storyResponse.image = response.image;
                return storyResponse
            })
            .catch(error => {
                this.setState({ error, isLoading: false });
            });
    }

    render() {
      
        return <ScrollView style={{ flex: 1,width:'100%', flexDirection: 'column', backgroundColor: '#22272b' }} >
            <Image  style={{ flex: 1, width: '100%', height: 200 }} source={{ uri: 'data:image/png;base64,' + this.state.image }} />
            <Text style={{ flex: 3,margin:10, fontSize: 18, color: '#cdcecf' }}>{this.state.text}</Text>
            {this.state.isLoading && <ActivityIndicator style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }} size='large' />}
        </ScrollView>
    }

}