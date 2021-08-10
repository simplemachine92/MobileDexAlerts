import React, {useState} from 'react';
import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { TouchableOpacity, Button, ActivityIndicator, Text, View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { styles } from './Styles';
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

  export default function Notifier({ navigation }) {
    const [data, setdata] = useState(null);
  
    const now = Math.floor(Date.now() / 1000);
    
    const last24 = now - "60";
    
      const { loading: hotLoading, error, data: hotData } = useQuery(HOT_VOLUMES, {
          variables: {
              blockTime: last24},
                  pollInterval: 60000,
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
    
    var filteredVolumes = hotVolumes.filter(element => element.token0.id 
      !== '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' && element.token0.id 
      !== '0x6b175474e89094c44da98b954eedeac495271d0f'
    );
    
    var filteredVolumes2 = hotVolumes.filter(element => element.token1.id 
      !== '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' && element.token1.id
      !== '0x6b175474e89094c44da98b954eedeac495271d0f'
      );
  
    
    var newArray = [];
  
    var newSymbols = [];
    
    filteredVolumes.map(element =>
       newArray.push(element.token0.id))
    
    filteredVolumes2.map(element =>
       newArray.push(element.token1.id))
  
    filteredVolumes.map(element =>
       newSymbols.push(element.token0.symbol))
    
    filteredVolumes2.map(element =>
       newSymbols.push(element.token1.symbol))
  
    const listItems = newSymbols.map((newSymbols, n) =>
        <Text key={newSymbols.toString()}>{newArray[n]}</Text>
    );


    console.log(listItems)
  
    console.log(listItems)
    console.log(newArray)
  
    function handleSignOut() {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      })};

      //fetch('https://jsonplaceholder.typicode.com/posts/1')
  //.then((response) => response.json())
  //.then((json) => console.log(json));
    
          /* if (listItems.length == 0) {
            console.log('no coins') 
            // this is where we can put logic for notification "server"
          } else {

            let i = 0; */
  
           /*  const fetchUsers = async () => {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                return (<View><Text>{res.json()}</Text></View>)
              };

              const response = useQuery2("users", fetchUsers); */

    return (
        <SafeAreaView style ={styles.container}>
        <Text style ={styles.title}>Notifications</Text>
        <FlatList
        data= {listItems}
        style={{alignContent:'center', backgroundColor:'white', width:'90%', borderRadius:30,}}
        keyExtractor={(item) => item.key.toString()}
        renderItem={ (data) => <Text style={styles.item}
        onPress={() => {
                  navigation.navigate('DetailsScreen', {coinID: (data.item.props.children)
              });
                }}
        >{`${data.item.key}`}{isAlert}</Text>}/>
        <Button title="Logout, Bitch." onPress={handleSignOut} />
        </SafeAreaView>
      );
    }