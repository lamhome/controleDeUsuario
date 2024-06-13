import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';

const AuthPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>Entre ou Cadastre-se</h1>
      <Button type="primary" onClick={() => loginWithRedirect()}>Continuar com Google</Button>
      <Button type="link">ou cadastre-se</Button>
    </div>
  );
};

export default AuthPage;
