import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import Layout from 'lib/components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import { Profile } from 'lib/types';

import styles from '../scss/Forms.module.scss';
import { addAuthHeader } from 'lib/utils/apollo';

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $firstName: String!, $lastName: String!) {
    updateUser(input: { id: $id, firstName: $firstName, lastName: $lastName }) {
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
  const [profile, setProfile] = useState<Partial<Profile>>();
  const [updateUser, { loading, data: mutData, error }] = useMutation(
    UPDATE_USER,
  );
  const { data } = useQuery(GET_PROFILE);
  const user = data?.viewer;

  useEffect(() => {
    if (user) {
      setProfile({
        ...user,
      });
    }
  }, [data]);

  const updateProfile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const updated = {
      ...profile,
      [e.target.name]: e.target.value,
    };
    setProfile(updated);
  };

  if (!profile || !user) {
    return (
      <Layout>
        <h1>Profile</h1>
        <div>Loading...</div>
      </Layout>
    );
  }

  const save: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        ...profile,
      },
    });
  };

  return (
    <Layout>
      <h1>Profile</h1>
      {error?.message && (
        <p className={styles.error}>Error: {error?.message}</p>
      )}
      {mutData?.updateUser && <p className={styles.success}>User updated.</p>}
      <form className={styles.form} onSubmit={save}>
        <label htmlFor="email">Email</label>
        <input
          disabled
          value={profile?.email}
          name="email"
          type="email"
          placeholder="Email"
          onChange={updateProfile}
        />
        <label htmlFor="firstName">First Name</label>
        <input
          value={profile?.firstName}
          required
          name="firstName"
          type="text"
          placeholder="First Name"
          onChange={updateProfile}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          value={profile?.lastName}
          required
          name="lastName"
          type="text"
          placeholder="Last Name"
          onChange={updateProfile}
        />
        <button disabled={loading} type="submit">
          Save
        </button>
      </form>
    </Layout>
  );
};

export default ProfilePage;
