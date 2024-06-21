import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';
import lamIMG from "./../assets/images/lg_lamtech.png";

// Interceptor de resposta
axios.interceptors.response.use(undefined, error => {
  if (error.response && error.response.status === 400) {
    // Mostra uma mensagem de erro personalizada
    alert("Dados do usuário não conferem. Por favor, tente novamente.");
    // Redireciona o usuário de volta para a tela de login
    window.location.href = "/";
  }
  // Retorna a promessa rejeitada para que ela possa ser tratada por outros interceptores ou por.catch()
  return Promise.reject(error);
});

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEnviar = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/v1/token/forgot_password', { email });
      alert("Dados para procedimento de troca de senha foram enviados diretamente para o email.");
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        <form className="login-form" onSubmit={handleEnviar}>
          <span className="login-form-title">Esqueceu sua Senha</span>

          <span className="login-form-title">
            <img src={lamIMG} alt="LAMTech" />
          </span>

          <div className="wrap-input">
            <input
              className={email!== ""? "has-val input" : "input"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
