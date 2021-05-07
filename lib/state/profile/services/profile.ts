import { ApolloClient, gql } from '@apollo/client';
import type { User } from '.';

let client: ApolloClient<object>;

export function initialize(c: ApolloClient<object>) {
  client = c;
}

const GET_PROFILE = gql`
  {
    viewer {
      id
      firstName
      lastName
      email
      acfUserFields {
        prefersColorScheme
      }
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($id: ID!, $firstName: String!, $lastName: String!) {
    updateUser(input: { id: $id, firstName: $firstName, lastName: $lastName }) {
      user {
        id
        databaseId
      }
    }
  }
`;

const UPDATE_PCS = gql`
  mutation UpdatePCS($id: ID!, $pcs: PrefersColorSchemeEnum!) {
    updateUser(input: { id: $id, prefersColorScheme: $pcs }) {
      user {
        id
        databaseId
      }
    }
  }
`;

export async function getUserProfile(): Promise<User> {
  const { data, errors } = await client.query({
    query: GET_PROFILE,
  });

  if (errors) {
    throw new Error(errors[0].message);
  }
  const u = data.viewer;
  return {
    id: u.id,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    prefersColorScheme: u.acfUserFields.prefersColorScheme,
  };
}

export async function updateProfile(
  user: Pick<User, 'id' | 'firstName' | 'lastName'>,
) {
  const { errors } = await client.mutate({
    mutation: UPDATE_PROFILE,
    variables: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
  if (errors) {
    throw new Error(errors[0].message);
  }
}

export async function updatePrefersColorScheme(
  user: Pick<User, 'id' | 'prefersColorScheme'>,
) {
  const { errors } = await client.mutate({
    mutation: UPDATE_PCS,
    variables: {
      id: user.id,
      pcs: user.prefersColorScheme,
    },
  });
  if (errors) {
    throw new Error(errors[0].message);
  }
}
