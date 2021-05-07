import { ApolloClient, gql } from '@apollo/client';
import type { User } from '.';

let client: ApolloClient<object>;

export function initialize(c: ApolloClient<object>) {
  client = c;
}

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { password: $password, username: $email }) {
      user {
        id
        email
        firstName
        lastName
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`;

export async function loginUser(
  email: string,
  password: string,
): Promise<User> {
  localStorage.removeItem('jwt');
  localStorage.removeItem('jwtr');

  const { data, errors } = await client.mutate({
    mutation: LOGIN,
    variables: {
      email,
      password,
    },
  });

  if (errors) {
    throw new Error(errors[0].message);
  }
  localStorage.setItem('jwt', data.login.user.jwtAuthToken);
  localStorage.setItem('jwtr', data.login.user.jwtRefreshToken);
  const u = data.login.user;
  return {
    id: u.id,
    email: u.email,
    firstName: u.email,
    lastName: u.lastName,
    prefersColorScheme: u.prefersColorScheme,
  };
}
