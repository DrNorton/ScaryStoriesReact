import React from "react";
import MainScreen from './src/screens/mainScreen'
import StoryScreen from './src/screens/storyScreen'
import { StackNavigator } from 'react-navigation';
import { View, StatusBar } from 'react-native';


const AppContent = StackNavigator({
  Main: { screen: MainScreen },
  Story: { screen: StoryScreen },
},
  {
    cardStyle: {
      paddingTop: 20
    }
  });

  

  const App = () =>
  <View style={{flex: 1}}>
    <StatusBar   translucent={false}
            animated={false}
            hidden={false}
            backgroundColor="rgb(122,77,246)"
            barStyle="light-content" /> 
   <AppContent />
 </View>;

export default App;