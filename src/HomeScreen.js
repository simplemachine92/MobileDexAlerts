import React from 'react';
import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { Button, ActivityIndicator, Text, View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { styles } from './Styles';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IsSignedIn } from './Signin';
import { spinnerstyle } from './spinnerstyle';
import firebase from '@firebase/app'
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyA86Hy6_kZSZ6Axv1RJZAxWY6h3Z_8jcMM",
  authDomain: "crypt-dee9f.firebaseapp.com",
  databaseURL: "https://crypt-dee9f-default-rtdb.firebaseio.com",
  projectId: "crypt-dee9f",
  storageBucket: "crypt-dee9f.appspot.com",
  messagingSenderId: "102269993695",
  appId: "1:102269993695:web:90f4d977c147a95799df6a",
  measurementId: "G-6HNKXG2Y73"
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

const Tab = createBottomTabNavigator();

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
  
export default function HomeScreen({ navigation }) {
  
  const now = Math.floor(Date.now() / 1000);
  
  const last24 = now - "86600";
  
    const { loading: hotLoading, error, data: hotData } = useQuery(HOT_VOLUMES, {
        variables: {
            blockTime: last24},
                pollInterval: 150000,
                fetchPolicy: 'network-only',
              notifyOnNetworkStatusChange: 'true'
    });
  
  if (hotLoading) return <View style=
  {[spinnerstyle.container, spinnerstyle.horizontal]}>
      <ActivityIndicator size="large" />
      </View>;
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

  function handleSignOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    })};
  
  return (
      <SafeAreaView style ={styles.container}>
      <Text style ={styles.title}>New Hot Tokens</Text>
      <FlatList
      data= {listItems}	
      keyExtractor={(item, index) => item.key.toString()}
      renderItem={ (data) => <Text style={styles.item}
      onPress={() => {
                navigation.navigate('DetailsScreen', {coinID: (data.item.key)
            });
              }}
      >{`${data.item.key}`}</Text>}/>
      <Button title="Logout, Bitch." onPress={handleSignOut} />
      </SafeAreaView>
    );
  }