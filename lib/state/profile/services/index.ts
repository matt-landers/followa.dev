import { ApolloClient, gql } from '@apollo/client';
import * as login from './login';
import * as profile from './profile';
export { loginUser } from './login';
export {
  getUserProfile,
  updatePrefersColorScheme,
  updateProfile,
} from './profile';

let client: ApolloClient<object>;

export function setApolloClient(c: ApolloClient<object>) {
  client = c;
  login.initialize(c);
  profile.initialize(c);
}

export enum PrefersColorScheme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  prefersColorScheme: PrefersColorScheme;
}
