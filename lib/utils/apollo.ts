import { ApolloClient, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import decode from 'jwt-decode';
import { setContext } from '@apollo/client/link/context';

let authAdded = false;

export function addAuthHeader(client: ApolloClient<object>) {
  if (
    typeof window === 'undefined'
    //|| authAdded
  )
    return client;

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

  client.setLink(
    ApolloLink.from([
      tokenRefreshLink,
      authLink,
      errorLink,
      tokenUpdateLink,
      client.link,
    ]),
  );

  return client;
}

const getCurrentTimestampInSeconds = () => Math.floor(Date.now() / 1000);

const isTokenExpired = (token: string) =>
  decode<{ exp: number }>(token).exp <= getCurrentTimestampInSeconds();

/**
 * Refresh auth token if it is expired.
 */
const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: `refreshJwtAuthToken`,
  isTokenValidOrUndefined: () => {
    const authToken = localStorage.getItem('jwt');
    return !authToken || !isTokenExpired(authToken);
  },
  fetchAccessToken: () => {
    const refreshToken = localStorage.getItem('jwtr');
    const query = `
      mutation refreshJwtAuthToken($input: RefreshJwtAuthTokenInput!) {
        refreshJwtAuthToken(input: $input) {
          authToken
        }
      }
    `;

    return fetch(
      (process.env.NEXT_PUBLIC_WORDPRESS_URL + '/graphql') as string,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            input: {
              jwtRefreshToken: refreshToken || ``,
            },
          },
        }),
      },
    );
  },
  handleFetch: (response) => {
    const { authToken } = response as any;
    localStorage.setItem('jwt', authToken);
  },
  handleError: (error) => {
    console.error(error);
    localStorage.removeItem('jwt');
    localStorage.removeItem('jwtr');
  },
});

/**
 * Handle errors.
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

/**
 * Update the authToken and refreshToken with the updated tokens
 * sent back in the response headers.
 */
const tokenUpdateLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const {
      response: { headers },
    } = operation.getContext();

    if (headers) {
      const authToken = headers.get('x-jwt-auth');
      const refreshToken = headers.get('x-jwt-refresh');

      if (authToken) {
        localStorage.setItem('jwt', authToken);
      }

      if (refreshToken) {
        localStorage.setItem('jwtr', refreshToken);
      }
    }

    return response;
  });
});
