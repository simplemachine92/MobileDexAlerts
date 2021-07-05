import React from 'react';
import { AppRegistry } from 'react-native';
import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { Text, View } from 'react-native';

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache()
});

const now = Math.floor(Date.now() / 1000);

const last24 = now - "86400";
//console.log( last24 ); // This gives us our 24hr timestamp UTC seconds

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
  pairs(where: {createdAtTimestamp_gt: $blockTime, volumeUSD_gt: "10000" }) {

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

function Volumes() {

const now = Math.floor(Date.now() / 1000);

const last24 = now - "86400";
//console.log( last24 ); // This gives us our 24hr timestamp UTC seconds

console.log(last24) //just making sure our time check is working here, too, might not be necessary.

  const { loading: hotLoading, data: hotData } = useQuery(HOT_VOLUMES, {
	  variables: {
		  blockTime: last24
    }
  })

  const hotVolume = hotData && hotData.pairs[4].token0.id //this gives us index 0 of token 0s id, which will be the tokens contract address instead of the pair addres or anything else. if we use index 1 we will get the other half of the LP pairs contract (usually wrapped eth)

  return (
      <Text>
        Hot Token:{' '}
        {hotLoading 
	  ? 'Loading token data...'
          :
            // parse responses as floats and fix to 2 decimals
          hotVolume} <Text/>
	</Text>
 )
}

const App = () => (
  <ApolloProvider client={client}>
   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <Prices />
     <Volumes />
    </View>
  </ApolloProvider>
);

AppRegistry.registerComponent('MyApplication', () => App);


export default App;
