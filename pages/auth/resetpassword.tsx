import Layout from 'lib/components/Layout/Layout';
import { actions } from 'lib/state/profile/actor';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';

import styles from '../../scss/Forms.module.scss';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);
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

  const validatePasswords = (): boolean => {
    if (!password || !confirmPassword) {
      setError('Password is required.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (password?.length < 8) {
      setError('Password must be at least 8 characters.');
      return false;
    }

    return true;
  };

  const resetPassword: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSuccess(false);
    if (!validatePasswords()) return;
    setError('');
    setLoading(true);
    try {
      await actions.resetPassword(
        router.query.key as string,
        router.query.login as string,
        password,
      );
      setSuccess(true);
      setTimeout(() => router.push('/auth/login'), 3000);
    } catch (e) {
      setError(transformError(e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Reset Password</h1>
      {error && <p className={styles.error}>Error: {error}</p>}
      {success && (
        <p className={styles.success}>Password reset successfully!</p>
      )}
      <form className={styles.form} onSubmit={resetPassword}>
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassweord">Confirm Password</label>
        <input
          required
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button disabled={loading} type="submit">
          Reset Password
        </button>
      </form>
    </Layout>
  );
};

export default ResetPassword;
