import Layout from 'lib/components/Layout/Layout';
import { actions } from 'lib/state/profile/actor';
import Link from 'next/link';
import React, { useState } from 'react';

import styles from '../../scss/Forms.module.scss';

const SendResetLink = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendResetLink: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await actions.sendResetLink(email);
      setSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Login</h1>
      {success && (
        <p className={styles.success}>A password reset email has been sent.</p>
      )}
      <form className={styles.form} onSubmit={sendResetLink}>
        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button disabled={loading} type="submit">
          Send Reset Link
        </button>
      </form>
      <Link href="/auth/login">
        <a href="/auth/login" style={{ textDecoration: 'underline' }}>
          Login
        </a>
      </Link>
    </Layout>
  );
};

export default SendResetLink;
