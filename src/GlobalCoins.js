import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const now = Math.floor(Date.now() / 1000);
  
const last24 = now - "86600";
  
  export const { loading: globalLoading, error, data: globalData } = useQuery(HOT_VOLUMES, {
    variables: {
        blockTime: last24},
            pollInterval: 150000,
            fetchPolicy: 'network-only',
          notifyOnNetworkStatusChange: 'true'
});