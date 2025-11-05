import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Login - Personal Health Manager</title>
        <meta
          name="description"
          content="Sign in to your Personal Health Manager account"
        />
      </Helmet>
      <LoginForm />
    </>
  );
};

export default LoginPage;
