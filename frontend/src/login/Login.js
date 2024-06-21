import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import axios from 'axios';
import lamIMG from "./../assets/images/lg_lamtech.png";

// Interceptor de resposta
/*axios.interceptors.response.use(undefined, error => {
  if (error.response && error.response.status === 400) {
    // Mostra uma mensagem de erro personalizada
    alert(`Houve algum problema. Por favor, tente novamente.`);
    // Redireciona o usuário de volta para a tela de login
    window.location.href = "/";
  }
  // Retorna a promessa rejeitada para que ela possa ser tratada por outros interceptores ou por.catch()
  return Promise.reject(error);
});*/

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3333/v1/user/session', { email, password });
      const { id, name, userEmail, userType, typeName, isAdm, token } = response.data;
      
      // Armazena as informações do usuário no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      localStorage.setItem('name', name);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('userType', userType);
      localStorage.setItem('typeName', typeName);
      localStorage.setItem('isAdm', isAdm);

      // Redireciona para a tela Dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      // Trate erros de autenticação aqui
    }
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        <form className="login-form" onSubmit={handleLogin}>
          <span className="login-form-title">Bem vindo</span>

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

          <div className="wrap-input">
            <input
              className={password!== ""? "has-val input" : "input"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Password"></span>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">Login</button>
          </div>

          <div className="text-center">
            <span className="txt1">Não possui conta? </span>
            <Link className="txt2" to="/create-account">
              Criar conta
            </Link>
          </div>
          
          <div className="text-center">
            <Link className="txt2" to="/forgot-password">
              Esqueceu sua senha?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
