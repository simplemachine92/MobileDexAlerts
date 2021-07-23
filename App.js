import React, { Component, useState, useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider, makeVar } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { Text, Button, View, FlatList, StyleSheet, SafeAreaView, Pressable, Linking, Dimensions } from 'react-native';
import { Chart, registerables } from 'chart.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

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

const COIN_INFO = gql`
query tokenDayDatas($coinForQuery: ID!) {
	tokenDayDatas(orderBy: date, orderDirection: asc, where: {token: $coinForQuery}) {
	
	token {
	name	
	}

	date
	priceUSD
	totalLiquidityUSD
	}
}
`
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 12,
   padding: 20,
   backgroundColor: '#808080'
  },
  item: {
    padding: 20,
    fontSize: 12,
    height: 44,
	  backgroundColor: '#FFFFFF'
  },
  title: {
	  display: 'flex',
	padding: 10,
	fontSize: 24,
backgroundColor: '#FFFFFF',
	  justifyContent: 'center',
	  alignItems: 'center'
  }
});

function HomeScreen({ navigation }) {

const now = Math.floor(Date.now() / 1000);

const last24 = now - "46600";

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

console.log(listItems)
console.log(newArray)

return (
	<SafeAreaView style ={styles.container}>
	<Text style ={styles.title}>New Hot Tokens</Text>
	<FlatList
	data={listItems}	
	renderItem={({item}) => <Text style={styles.item}
	onPress={() => {
              navigation.navigate('Details', {coinID: (item)
	      });
            }}
	>{`${item.key}`}</Text>}/>
	</SafeAreaView>
  );
}

function DetailsScreen({route, navigation}) {

const { coinID, otherParam } = route.params;

console.log(coinID.key)

const { loading: coinLoading, error, data: coinData } = useQuery(COIN_INFO, {
          variables: {
                  coinForQuery: coinID.key},
                  pollInterval: 15000,
		  fetchPolicy: 'network-only',
		  notifyOnNetworkStatusChange: true
  }
);

if (coinLoading) return <View><Text style ={styles.container}>Loading...</Text></View>;
  if (error) return <View><Text> Error! ${error.message}</Text></View>;

console.log(coinData.tokenDayDatas[0].priceUSD)
console.log(coinData.tokenDayDatas[0].token.name)

  return (
    <View style={styles.item}>
      <Text>
	{coinData.tokenDayDatas[0].token.name}{"\n"}{"\n"}
	 ${coinData.tokenDayDatas[0].priceUSD}
	  {"\n"}{"\n"}
	  {coinData.tokenDayDatas[0].totalLiquidityUSD}
	  </Text>
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => (
<ApolloProvider client={client}>
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={HomeScreen}
	options={{
          title: 'Cryptoes',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}/>
		{props => <HomeScreen {...props} coinID={item} />}
	<Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
</ApolloProvider>
);

AppRegistry.registerComponent('MyApplication', () => App);


export default App;
