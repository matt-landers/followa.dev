import Layout from 'lib/components/Layout/Layout';
import React, { useState } from 'react';

import styles from '../scss/Forms.module.scss';
import { actions, useUser } from 'lib/state/profile/actor';
import type { User } from 'lib/state/profile/services';

const ProfilePage = () => {
  let profile = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [saved, setSaved] = useState(false);

  const updateProfile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!profile) return;
    const updated: User = {
      ...profile,
      [e.target.name]: e.target.value,
    };
    profile = updated;
  };

  if (!profile) {
    return (
      <Layout>
        <h1>Profile</h1>
        <div>Loading...</div>
      </Layout>
    );
  }

  const save: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    try {
      await actions.updateProfile({ ...(profile as any) });
      setSaved(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Profile</h1>
      {error && <p className={styles.error}>Error: {error}</p>}
      {saved && <p className={styles.success}>User updated.</p>}
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
