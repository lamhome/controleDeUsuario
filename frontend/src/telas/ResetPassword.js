import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import lamIMG from "./../assets/images/lg_lamtech.png";
import axios from 'axios';

function ResetPassword() {
  const [storedId, setStoredId] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('id');

    setStoredId(storedId || '');
  }, []);

  // Função logout
  const handleLogout = () => {
    window.alert('Sua senha foi redefinida com Sucesso!')
    // Remove as informações do usuário do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
    localStorage.removeItem('typeName');
    localStorage.removeItem('isAdm');

    // Redireciona o usuário para a página de login
    navigate('/');
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validatePassword = (password, confirmPassword) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/;
    const error = {};
    
    if (!passwordRegex.test(password)) {
      error.password = "A senha deve conter no mínimo 8 caracteres, 1 caractere especial, 1 letra maiúscula, 1 letra minúscula e 1 número.";
    }

    if (password !== confirmPassword) {
      error.confirmPassword = "As senhas não são idênticas.";
    }

    return error;
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setError(validatePassword(value, confirmPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setError(validatePassword(password, value));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");  // Limpa a mensagem anterior
    const validationError = validatePassword(password, confirmPassword);
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      try {

        await axios.get('http://localhost:3333/v1/user/change-password', {
          user_id: storedId,
          password: password
        });
        
        setMessage("Sua senha foi redefinida com Sucesso!");
        setError({});
        handleLogout();
      } catch (error) {
        console.error(error);
        setMessage("Erro ao redefinir a senha. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        {message && <div className="login-form-message">{message}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="login-form-title">Redefinir Senha</span>

          <span className="login-form-title">
            <img src={lamIMG} alt="LAMTech" />
          </span>

          <div className="wrap-input">
            <input
              className={error.password ? "has-val input error" : password !== "" ? "has-val input" : "input"}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
            <span className="focus-input" data-placeholder="Senha"></span>
          </div>
          {error.password && <div className="error-message">{error.password}</div>}

          <div className="wrap-input">
            <input
              className={error.confirmPassword ? "has-val input error" : confirmPassword !== "" ? "has-val input" : "input"}
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <span className="focus-input" data-placeholder="Confirmar Senha"></span>
          </div>
          {error.confirmPassword && <div className="error-message">{error.confirmPassword}</div>}

          <div className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label>Mostrar Senha</label>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn">Redefinir</button>
          </div>

          <div className="text-center">
            <Link className="txt2" to="/dashboard">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;