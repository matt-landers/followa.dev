import Layout from 'lib/components/Layout/Layout';
import React from 'react';

const Profile = () => {
  return (
    <Layout>
      <h1>Profile</h1>
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
    </Layout>
  );
};

export default Profile;
