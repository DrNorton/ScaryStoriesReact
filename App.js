import React from "react";
import MainScreen from './src/screens/mainScreen'
import StoryScreen from './src/screens/storyScreen'
import PhotoScreen from './src/screens/photoScreen'
import { StackNavigator, TabNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { View, StatusBar } from 'react-native';

const StoryStackNavigatorContent = StackNavigator({
  Main: { screen: MainScreen },
  Story: { screen: StoryScreen },
},
  {
    cardStyle: {
      paddingTop: 20,
      backgroundColor: '#191919'
    }
  });

  const PhotoStackNavigatorContent = StackNavigator({
    Photo: { screen: PhotoScreen }
  },
    {
      cardStyle: {
        paddingTop: 20,
        backgroundColor: '#191919'
      }
    });
  

const TabNavigatorContent = TabNavigator({
  MainNav: { screen: StoryStackNavigatorContent },
  PhotoNav: { screen: PhotoStackNavigatorContent }
}, {
  tabBarPosition: 'bottom',
    tabBarComponent: NavigationComponent, tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: 'white',
        rippleColor: 'white',
        tabs: {
          MainNav: {
            barBackgroundColor: '#191919'
          },
          PhotoNav: {
            barBackgroundColor: '#191919'
          },
          
         
        }
      }
    }});


const App = () =>
  <View style={{ flex: 1 }}>
    <StatusBar translucent={false}
      animated={false}
      hidden={false}
      backgroundColor="rgb(122,77,246)"
      barStyle="light-content" />
    <TabNavigatorContent />
  </View>;

export default App;