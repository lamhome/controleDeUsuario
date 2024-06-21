import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function UserValidation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');
  const [tokenInvalid, setTokenInvalid] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    setToken(token);

  }, [location]);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        console.error('Token is undefined');
        return;
      }

      try {
        await axios.get(`http://localhost:3333/v1/token/validate_first`, {
          params: {
            token: token
          }
        });

        setMessage('Conta habilitada com Sucesso!');
        setTokenInvalid(false);
      } catch (error) {
        setMessage('Erro ao habilitar a conta. Token inválido ou expirado.');
        setTokenInvalid(true);
      }
    };

    if (token) {
      validateToken();
    }
  }, [token]);

  const handleClose = () => {
    navigate('/');
  };

  const handleResendValidation = () => {
    navigate('/resend-validation');
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        {message && (
          <>
            <div className="login-form-message">{message}</div>
            {!tokenInvalid && (
              <div className="container-login-form-btn">
                <button className="login-form-btn" onClick={handleClose}>Fechar</button>
              </div>
            )}
            {tokenInvalid && (
              <div className="container-login-form-btn">
                <button className="login-form-btn" onClick={handleResendValidation}>Reenviar token</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserValidation;
