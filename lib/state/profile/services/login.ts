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

const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    sendPasswordResetEmail(input: { username: $email }) {
      user {
        id
      }
    }
  }
`;

export async function resetPassword(email: string) {
  const { data, errors } = await client.mutate({
    mutation: RESET_PASSWORD,
    variables: {
      email,
    },
  });

  if (errors) {
    throw new Error(errors[0].message);
  }
}

const SEND_RESET_LINK = gql`
  mutation ResetLink($email: String!) {
    sendPasswordResetEmail(input: { username: $email }) {
      user {
        id
      }
    }
  }
`;

export async function sendResetLink(email: string) {
  const { data, errors } = await client.mutate({
    mutation: SEND_RESET_LINK,
    variables: {
      email,
    },
  });

  if (errors) {
    throw new Error(errors[0].message);
  }
}
