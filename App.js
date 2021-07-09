import React, { Component, useState, useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { Text, Button, View } from 'react-native';
var _ = require('lodash');

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache()
});

const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
      txCount
    }
  }
`

const ETH_PRICE_QUERY = gql`
  query bundles {
    bundles(where: { id: "1" }) {
      ethPrice
    }
  }
`

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

class SimpleNotification extends Component {
  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }

  showNotification() {
    new Notification('Hey')
  }

  render() {
    return (
	    <Button
  onPress={this.showNotification}
  title="Notify me"
  color="#841584"
/>
         );
  }
}


function Prices() {
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: daiLoading, data: daiData } = useQuery(DAI_QUERY, {
    variables: {
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'
    }
  })

  const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
  const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
  const daiTxCount = daiData && daiData.tokens[0].txCount
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice

  return (
      <Text>
        Dai price:{' '}
        {ethLoading || daiLoading
          ? 'Loading token data...'
          : '$' +
            // parse responses as floats and fix to 2 decimals
            (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)} <Text/>
	<Text/> 
         Dai total liquidity:{' '}
        {daiLoading
          ? 'Loading token data...'
          : // display the total amount of DAI spread across all pools
            parseFloat(daiTotalLiquidity).toFixed(0)} <Text/>

	Dai total transactions:{' '}
        {daiLoading
          ? 'Loading token data...'
          : // display the total amount of DAI spread across all pools
            parseFloat(daiTxCount).toFixed(0)} <Text/>
	  </Text>

 )
}

function Volumes(i) {

const now = Math.floor(Date.now() / 1000);

const last24 = now - "46400";

  const { loading: hotLoading, error, data: hotData } = useQuery(HOT_VOLUMES, {
	  variables: {
		  blockTime: last24},
	          pollInterval: 50000,
  });

if (hotLoading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

var hotVolumes = hotData.pairs

var filteredVolumes = hotVolumes.filter(element => element.token0.id !== '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
console.log(filteredVolumes)

var newArray = [];

filteredVolumes.map(element => newArray.push(element.token0.id))
	console.log(newArray)

const listItems = newArray.map((newArray) =>
	<li key={newArray.toString()}> {newArray} </li>
);

return (

        <ol>
	{listItems}
	</ol>

  );
}

 const App = () => (
  <ApolloProvider client={client}>
   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> 
     <SimpleNotification />
     <Prices />
     <Volumes />
    </View>
  </ApolloProvider>
);

AppRegistry.registerComponent('MyApplication', () => App);


export default App;
