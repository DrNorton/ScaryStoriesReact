import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ImageListItem from '../components/imageListItem'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class PhotoScreen extends Component {
  static navigationOptions = {
    title: 'Страшные фото', 
    backgroundColor:'black',
    borderColor:'black',
    color:'black',
    headerTitleStyle: { textAlign: 'left', alignSelf: 'flex-start', color: 'white' },
    tintColor:{color:'white'},
    headerStyle: {
        backgroundColor: '#1e2326'
        
    },
  };
  

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      take: 10,
      offset: 0,
      error: null,
      refreshing: false
    };
  }


  componentDidMount() {
    this.makeRemoteRequest();
  }

  handleRefresh = () => {
    this.setState(
      {
        offset: 0,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        offset: this.state.offset + this.state.take
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  



  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _onPress = (id,title) => {
    this.props.navigation.navigate('Story',{storyId:id,'title':title});
  }

  render() {
    return (
        <FlatList horizontal style={{ backgroundColor: '#191919',margin: 0 }}
          data={this.state.data}
          renderItem={({ item }) => (
            <ImageListItem key={item.id}  photo={item} />
          )}
          keyExtractor={item => item.name}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={() => {this.handleLoadMore() }}
          onEndReachedThreshold={50}
        />
    );
  }

  makeRemoteRequest = () => {
    var myHeaders = new Headers();
    this.setState({ loading: true });
    myHeaders.append("X-ZUMO-APPLICATION", "eOxFathFeOfvquGBFoAZmDsGJuifQH42");
    const url = "http://storiesmobileservice.azure-mobile.net/tables/Photo?$top=" + this.state.take + "&$skip=" + this.state.offset;
    fetch(url, { method: "GET", headers: myHeaders })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: this.state.offset == 0 ? responseData : [...this.state.data, ...responseData],
          error: responseData.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

}