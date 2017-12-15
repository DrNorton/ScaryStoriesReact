import React,{ Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import StoryListItem from '../components/storyListItem'

export default class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          data: [],
          page: 1 ,
          seed: 1,
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
            page: 1,
            seed: this.state.seed + 1,
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
            page: this.state.page + 1
          },
          () => {
            this.makeRemoteRequest();
          }
        );
      };
    
      renderSeparator = () => {
        return (
          <View 
            style={{
              height: 10,
              width: "100%",
              backgroundColor: "#eee",
    
            }}
          />
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
    
      render() {
        return (
          
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <StoryListItem story={item}/>
              )}
              keyExtractor={item => item.name}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
        );
      }
    
      makeRemoteRequest =()=> {
        
        var myHeaders = new Headers();
        this.setState({ loading: true });
        myHeaders.append("X-ZUMO-APPLICATION", "eOxFathFeOfvquGBFoAZmDsGJuifQH42");
        fetch("http://storiesmobileservice.azure-mobile.net/tables/Story", { method: "GET", headers: myHeaders })
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
              data: responseData,
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