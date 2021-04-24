import { gql, useMutation } from '@apollo/client';
import Layout from 'lib/components/Layout/Layout';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import styles from '../../scss/Forms.module.scss';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { password: $password, username: $email }) {
      user {
        id
        databaseId
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { data, loading, error }] = useMutation(LOGIN);
  const router = useRouter();

  const mutationError =
    error?.message &&
    error?.message
      .split(':')
      .pop()
      ?.trim()
      .replace('username', 'email')
      .replace('incorrect_password', 'Incorrect password')
      .replace('invalid_email', 'Invalid email');

  const login: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      });
      if (data?.login) {
        localStorage.setItem('jwt', data.login.user.jwtAuthToken);
        localStorage.setItem('jwtr', data.login.user.jwtRefreshToken);
        router.push('/profile');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <h1>Login</h1>
      {error?.message && <p className={styles.error}>Error: {mutationError}</p>}
      <form className={styles.form} onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading || data?.login} type="submit">
          Login
        </button>
      </form>
      <Link href="/auth/register">
        <a href="/auth/register" style={{ textDecoration: 'underline' }}>
          Register
        </a>
      </Link>
    </Layout>
  );
};

export default Login;
