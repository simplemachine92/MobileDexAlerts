import { FlatList } from "react-native";

export default function CoinReducer(state = {data}, action) {
    switch (action.type) {
    default: 
    return state

  
  const now = Math.floor(Date.now() / 1000);
  
  const last24 = now - "86600";
  
    const { loading: hotLoading, error, data: hotData } = useQuery(HOT_VOLUMES, {
        variables: {
            blockTime: last24},
                pollInterval: 15000,
              fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true
    });
  
  var hotVolumes = hotData.pairs
  
  console.log(hotVolumes)
  
  var filteredVolumes = hotVolumes.filter(element => element.token0.id !== '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' && element.token0.id !== '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' && element.token0.id !== '0x6b175474e89094c44da98b954eedeac495271d0f');
  console.log(filteredVolumes)
  
  var filteredVolumes2 = hotVolumes.filter(element => element.token1.id !== '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' && element.token1.id !== '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' && element.token1.id !== '0x6b175474e89094c44da98b954eedeac495271d0f');
  console.log(filteredVolumes)
  
  var newArray = [];
  
  filteredVolumes.map(element => newArray.push(element.token0.id))
  console.log(filteredVolumes)
  
  filteredVolumes2.map(element => newArray.push(element.token1.id))
  console.log(filteredVolumes2)
  
  const listItems = newArray.map((newArray) =>
      <Text key={newArray.toString()}>{newArray}</Text>
    );
  
  let coins = createStore(coinReducer)
  
  console.log(coins.getState())

  return (
      <View>
          <Text>
          </Text>
      </View>
  )}}