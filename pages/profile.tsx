import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import Layout from 'lib/components/Layout/Layout';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Profile } from 'lib/types';

import styles from '../scss/Register.module.scss';
import { getApolloClient } from '@wpengine/headless';
import { addAuthHeader } from 'lib/utils/apollo';

const UPDATE_PROFILE = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    updateUser(
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      user {
        id
        databaseId
      }
    }
  }
`;

const GET_PROFILE = gql`
  {
    viewer {
      id
      firstName
      lastName
      email
    }
  }
`;

const ProfilePage = () => {
  addAuthHeader(useApolloClient());
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  // const [registerUser, { loading, data, error }] = useMutation(UPDATE_PROFILE);
  const { data } = useQuery(GET_PROFILE);
  const user = data?.viewer;

  const updateProfile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const updated = {
      ...profile,
      [e.target.name]: e.target.value,
    };
    setProfile(updated);
  };

  return (
    <Layout>
      <h1>Profile</h1>
      <form className={styles.form}>
        <label htmlFor="firstName">First Name</label>
        <input
          value={user?.firstName}
          required
          name="firstName"
          type="text"
          placeholder="First Name"
          onChange={updateProfile}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          value={user?.lastName}
          required
          name="lastName"
          type="text"
          placeholder="Last Name"
          onChange={updateProfile}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          value={user?.email}
          name="email"
          type="email"
          placeholder="Email"
          onChange={updateProfile}
        />
        {/* <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          onChange={updateProfile}
        />
        <label htmlFor="confirmPassweord">Confirm Password</label>
        <input
          required
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={updateProfile}
        /> */}
        {/* <button disabled={loading || data?.registerUser} type="submit">
          Register
        </button> */}
      </form>
    </Layout>
  );
};

export default ProfilePage;
