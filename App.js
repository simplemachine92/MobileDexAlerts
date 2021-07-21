import React, { Component, useState, useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { Text, Button, View, FlatList, StyleSheet, SafeAreaView, Pressable, Linking } from 'react-native';
import { Chart, registerables } from 'chart.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache()
});

const HOT_VOLUMES = gql`
 query pairs($blockTime: BigInt!) {
  pairs(where: {createdAtTimestamp_gt: $blockTime, volumeUSD_gt: "10000", reserveUSD_gt: "10000" }) {

    token0 {
      id
      symbol
    }
  
    token1 {
      id
      symbol
    }

    reserveUSD
    volumeUSD
  }
}
`

function HomeScreen({ navigation }) {

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 12,
   padding: 20
  },
  item: {
    padding: 20,
    fontSize: 12,
    height: 44,
  },
});

const now = Math.floor(Date.now() / 1000);

const last24 = now - "86600";

  const { loading: hotLoading, error, data: hotData } = useQuery(HOT_VOLUMES, {
	  variables: {
		  blockTime: last24},
	          pollInterval: 150000,
  });

if (hotLoading) return <SafeAreaView style={styles.container}><Text style ={styles.container}>Loading...</Text></SafeAreaView>;
  if (error) return <SafeAreaView style={styles.container}><Text> Error! ${error.message}</Text></SafeAreaView>;

var hotVolumes = hotData.pairs

console.log(hotVolumes)

var filteredVolumes = hotVolumes.filter(element => element.token0.id !== '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
console.log(filteredVolumes)

var filteredVolumes2 = hotVolumes.filter(element => element.token1.id !== '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
console.log(filteredVolumes)

var newArray = [];

filteredVolumes.map(element => newArray.push(element.token0.id))
console.log(filteredVolumes)

filteredVolumes2.map(element => newArray.push(element.token1.id))
console.log(filteredVolumes2)

const listItems = newArray.map((newArray) =>
	<Text key={newArray.toString()}>{newArray}</Text>
);

//const [timesPressed, setTimesPressed] = useState(0);
console.log(listItems)
return (
	<SafeAreaView style={styles.container}>
	<FlatList
	data={listItems}
	renderItem={({item}) => <Text style={styles.container}
	onPress={() => {
              navigation.push('Details', { 
// this doesnt work for shit figure out how to pass data to the navigation		      itemId:{{ item.key }} 
	      });
            }}
	>{`${item.key}`}</Text>}/>
	</SafeAreaView>
  );
}

function DetailsScreen({route, navigation}) {
const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>itemId: {JSON.stringify(item.key)}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => (
<ApolloProvider client={client}>
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
		{props => <HomeScreen {...props} extraData={someData} />}
	<Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
</ApolloProvider>
);

AppRegistry.registerComponent('MyApplication', () => App);


export default App;
