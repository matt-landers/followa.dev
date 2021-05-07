import Layout from 'lib/components/Layout/Layout';
import { actions } from 'lib/state/profile/actor';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useState } from 'react';

import styles from '../../scss/Forms.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const transformError = (e: string) => {
    return e
      .split(':')
      .pop()
      ?.trim()
      .replace('username', 'email')
      .replace('incorrect_password', 'Incorrect password')
      .replace('invalid_email', 'Invalid email');
  };

  const login: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await actions.login(email, password);
      router.push('/profile');
    } catch (e) {
      setError(transformError(e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Login</h1>
      {error && <p className={styles.error}>Error: {error}</p>}
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
        <button disabled={loading} type="submit">
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
