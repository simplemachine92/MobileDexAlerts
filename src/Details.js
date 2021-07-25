import React from 'react';
import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { Text, View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { styles } from './Styles';

const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    cache: new InMemoryCache()
  });
 
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

export default function DetailsScreen({route, navigation}) {

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