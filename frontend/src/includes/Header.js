import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './../assets/images/lg_lamtech.png';
import photo from './../assets/images/171549900.gif';

const Header = ({ name, typeName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Você realmente deseja sair?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('userType');
      localStorage.removeItem('typeName');
      localStorage.removeItem('isAdm');
      navigate('/');
    }
  };

  return (
    <header className="dashboard-header">
      <div className="logo" onClick={() => navigate('/activity')}>
        <img src={logo} alt="Logo" />
      </div>
      <div className="user-area">
        <img src={photo} alt="Foto do Usuário" />
        <div>
          <h3>{name}</h3>
          <p>{typeName}</p>
          <button className="standard-button-small" onClick={() => navigate(`/reset-password`)}>Redefinir Senha</button>
        </div>
        <i className="logout-icon" onClick={handleLogout}>Logout</i>
      </div>
    </header>
    
  );
};

export default Header;
