// src/includes/Menu.js
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Menu = ({ isAdm }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="menu">
      <ul>
        <li>
          <NavLink
            to="/activity"
            className={location.pathname === '/activity' ? 'active' : ''}
            onClick={() => navigate('/activity')}
          >
            Atividades
          </NavLink>
        </li>
        {isAdm && (
          <li>
            <NavLink
              to="/user"
              className={location.pathname === '/user' ? 'active' : ''}
              onClick={() => navigate('/user')}
            >
              Gestão de Acessos
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
