import { gql, useMutation } from '@apollo/client';
import Layout from 'lib/components/Layout/Layout';
import { Profile } from 'lib/types';

import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';

import styles from '../../scss/Forms.module.scss';

const REGISTER = gql`
  mutation RegisterUser(
    $email: String!
    $lastName: String!
    $firstName: String!
    $password: String!
  ) {
    registerUser(
      input: {
        username: $email
        email: $email
        lastName: $lastName
        firstName: $firstName
        password: $password
      }
    ) {
      user {
        id
        databaseId
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`;

const Register = () => {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [registerUser, { loading, data, error }] = useMutation(REGISTER);
  const router = useRouter();

  const mutationError =
    error?.message &&
    error?.message.split(':').pop()?.trim().replace('username', 'email');

  const register: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (loading || data?.registerUser) return;
    setErrorMessage(undefined);

    if (!validatePasswords()) {
      return;
    }

    let vars = { ...profile };
    delete vars.confirmPassword;

    registerUser({
      variables: {
        ...vars,
      },
    }).catch((e) => {});
  };

  const validatePasswords = (): boolean => {
    if (!profile.password) {
      setErrorMessage('Password is required.');
      return false;
    }
    if (profile.password !== profile.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }
    if (profile.password?.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      return false;
    }

    return true;
  };

  const updateProfile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const updated = {
      ...profile,
      [e.target.name]: e.target.value,
    };
    setProfile(updated);
  };

  useEffect(() => {
    let cancel: NodeJS.Timeout;
    if (data?.registerUser) {
      localStorage.setItem('jwt', data.registerUser.user.jwtAuthToken);
      localStorage.setItem('jwtr', data.registerUser.user.jwtRefreshToken);
      cancel = setTimeout(() => {
        router.push('/profile');
      }, 5000);
    }
    return () => {
      clearTimeout(cancel);
    };
  }, [data]);

  return (
    <Layout>
      <h1>Register</h1>
      {errorMessage && <p className={styles.error}>Error: {errorMessage}</p>}
      {error?.message && <p className={styles.error}>Error: {mutationError}</p>}
      {data?.registerUser && (
        <p className={styles.success}>Registration complete.</p>
      )}
      <form className={styles.form} onSubmit={register}>
        <label htmlFor="firstName">First Name</label>
        <input
          required
          name="firstName"
          type="text"
          placeholder="First Name"
          onChange={updateProfile}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          required
          name="lastName"
          type="text"
          placeholder="Last Name"
          onChange={updateProfile}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          type="email"
          placeholder="Email"
          onChange={updateProfile}
        />
        <label htmlFor="password">Password</label>
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
        />
        <button disabled={loading || data?.registerUser} type="submit">
          Register
        </button>
      </form>
    </Layout>
  );
};

export default Register;
