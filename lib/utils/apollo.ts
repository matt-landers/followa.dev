import { ApolloClient } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

let authAdded = false;

export function addAuthHeader(client: ApolloClient<object>) {
  if (typeof window === 'undefined' || authAdded) return client;

  authAdded = true;

  const authLink = setContext((_, { headers }) => {
    const jwt = localStorage.getItem('jwt');
    return {
      headers: {
        ...headers,
        authorization: jwt ? `Bearer ${jwt}` : ``,
      },
    };
  });

  client.setLink(authLink.concat(client.link));

  return client;
}
