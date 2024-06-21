import { useState } from "react";
import { Link } from "react-router-dom";
import lamIMG from "./../assets/images/lg_lamtech.png";
import axios from 'axios';

function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    const errors = {};
    if (name.trim() === "") {
      errors.name = "O nome é obrigatório.";
    }
    return errors;
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};

    if (!emailRegex.test(email)){
      errors.email = "O formato do e-mail não é válido.";
    }

    return errors;
  };

  const validatePassword = (password, confirmPassword) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/;
    const errors = {};
    
    if (!passwordRegex.test(password)) {
      errors.password = "A senha deve conter no mínimo 8 caracteres, 1 caractere especial, 1 letra maiúscula, 1 letra minúscula e 1 número.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "As senhas não são idênticas.";
    }

    return errors;
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setErrors(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setErrors(validatePassword(value, confirmPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setErrors(validatePassword(password, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Object.assign({}, validatePassword(password, confirmPassword), validateEmail(email), validateName(name)); 
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await axios.post('http://localhost:3333/v1/user', {
          name,
          email,
          password
        });
        setMessage("Conta criada com sucesso! Você receberá um e-mail com as instruções para validação da conta.");
        setErrors({});
      } catch (error) {
        console.error(error);
        setMessage("Erro ao criar a conta. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        {message ? (
          <>
            <div className="login-form-message">{message}</div>
            <div className="container-login-form-btn">
              <Link className="login-form-btn" to="/">Fechar</Link>
            </div>
          </>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-form-title">Criar Conta</span>

            <span className="login-form-title">
              <img src={lamIMG} alt="LAMTech" />
            </span>

            <div className="wrap-input">
              <input
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Nome"></span>
            </div>
            {errors.name && <div className="error-message">{errors.name}</div>}
         
            <div className="wrap-input">
              <input
                className={errors.email ? "has-val input error" : email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}

            <div className="wrap-input">
              <input
                className={errors.password ? "has-val input error" : password !== "" ? "has-val input" : "input"}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}

            <div className="wrap-input">
              <input
                className={errors.confirmPassword ? "has-val input error" : confirmPassword !== "" ? "has-val input" : "input"}
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <span className="focus-input" data-placeholder="Confirmar Senha"></span>
            </div>
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

            <div className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label>Mostrar Senha</label>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">Criar</button>
            </div>

            <div className="text-center">
              <Link className="txt2" to="/">Voltar</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreateAccount;
