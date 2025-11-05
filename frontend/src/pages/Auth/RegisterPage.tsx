import React from 'react';
import { Helmet } from 'react-helmet-async';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Register - Personal Health Manager</title>
        <meta
          name="description"
          content="Create your Personal Health Manager account"
        />
      </Helmet>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
