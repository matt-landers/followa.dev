import Layout from 'lib/components/Layout/Layout';
import React from 'react';

const Login = () => {
  return (
    <Layout>
      <h1>Login</h1>
      <input type="text" placeholder="email" />
      <input type="text" placeholder="password" />
    </Layout>
  );
};

export default Login;
