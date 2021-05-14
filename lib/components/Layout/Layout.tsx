import React from 'react';
import Head from 'next/head';

import styles from './Layout.module.scss';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { useUser } from 'lib/state/profile/actor';

const Layout: React.FC = ({ children }) => {
  useUser();
  return (
    <>
      <Head>
        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Language" content="en" />
        <title>FollowA.Dev</title>
      </Head>
      <div className={styles.layout}>
        <Nav />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
