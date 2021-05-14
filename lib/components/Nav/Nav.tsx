import { gql } from '@apollo/client/core';
import { useLoggedIn } from 'lib/state/profile/actor';
import Link from 'next/link';
import React from 'react';
import Emoji from '../Emoji/Emoji';
import Toggle from '../Toggle/Toggle';
import styles from './Nav.module.scss';

const UPDATE_PCS = gql`
  mutation UPDATE_PCS($id: ID!, $pcs: PrefersColorSchemeEnum!) {
    updateUser(input: { id: $id, prefersColorScheme: $pcs }) {
      user {
        id
        databaseId
      }
    }
  }
`;

const Nav = () => {
  const loggedIn = useLoggedIn();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.logo} href="/">
            <span>FollowA.Dev</span>
          </a>
        </Link>
        <div className={styles.buttonContainer}>
          <Link href="/devsubmission">
            <a className={styles.linkbutton} href="/devsubmission">
              Submit a Dev
            </a>
          </Link>
        </div>
        {!loggedIn && (
          <Link href="/auth/login">
            <a href="/auth/login">
              <Emoji symbol="🔐" label="Login" size="2.5rem" />
            </a>
          </Link>
        )}
        {loggedIn && (
          <Link href="/profile">
            <a href="/profile">
              <Emoji symbol="😀" label="Profile" size="2.5rem" />
            </a>
          </Link>
        )}
        <div className={styles.toggle}>
          <Toggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
