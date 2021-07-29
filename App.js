import React from 'react';
import { AppRegistry } from 'react-native';
import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './src/Signin';
import DetailsScreen from './src/Details';

const Tab = createBottomTabNavigator();

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache()
});

const Stack = createStackNavigator();

const App = () => (
<ApolloProvider client={client}>
<NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={HomeScreen}
	options={{
          title: 'Cryptoes',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}/>
		{props => <HomeScreen {...props} coinID={item} />}
    <Tab.Screen name="Account" component={SignUp}/>
    <Tab.Screen name='DetailsScreen' component={DetailsScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
</ApolloProvider>
);

AppRegistry.registerComponent('MyApplication', () => App);


export default App;
