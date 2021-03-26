import Link from 'next/link';
import React from 'react';
import Toggle from '../Toggle/Toggle';
import styles from './Nav.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/">
          <a href="/">
            <span>FollowA.Dev</span>
          </a>
        </Link>
        <div className={styles.toggle}>
          <Toggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
