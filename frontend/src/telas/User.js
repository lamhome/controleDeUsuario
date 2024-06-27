// src/telas/User.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import Head from '../includes/Head';
import Header from '../includes/Header';
import Footer from '../includes/Footer';
import Menu from '../includes/Menu';

const User = () => {
  const [userList, setUserList] = useState([]);
  const [storedId, setStoredId] = useState('');
  const [storedToken, setToken] = useState('');
  const [name, setName] = useState('');
  const [typeName, setTypeName] = useState('');
  const [isAdm, setIsAdm] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve values from localStorage
    const storedId = localStorage.getItem('id');
    const storedToken = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const typeName = localStorage.getItem('typeName');
    const isAdm = localStorage.getItem('isAdm') === 'true'; 

    // Set state with retrieved values
    setStoredId(storedId || '');
    setToken(storedToken || '');
    setName(name || '');
    setTypeName(typeName || '');
    setIsAdm(isAdm);

    if (storedToken) {
      fetchUsers(storedToken);
    } else {
      // Redirect to login page or handle unauthorized access
      window.location.href = "/";
    }
  }, []);

  const fetchUsers = async (token) => {
    try {
      const response = await axios.get('http://localhost:3333/v1/user/list-all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserList(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.put(`http://localhost:3333/v1/user/remove`, { 
        user_id: userId 
      },{ 
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      fetchUsers(storedToken);
      alert('Usuário Bloqueado com sucesso!');
    } catch (error) {
      console.error('Erro ao bloquear usuário:', error);
    }
  };

  const unlockUser = async (userId) => {
    try {
      await axios.put(`http://localhost:3333/v1/user/unlock`, {
        user_id: userId 
      },{
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      fetchUsers(storedToken);
      alert('Usuário Desbloqueado com sucesso!');
    } catch (error) {
      console.error('Erro ao Desbloquear usuário:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Head />
      <Header name={name} typeName={typeName} isAdm={isAdm} />
      <Menu isAdm={isAdm} />
      <main className="dashboard-main">
        <div className="area-table">
          <table className="user-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Tipo Perfil</th>
                <th>Status</th>
                <th>Bloqueado</th>
                <th>Data Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.type?.name || 'Desconhecido'}</td>
                  <td>{user.activated ? 'Ativo' : 'Inativo'}</td>
                  <td>{user.blocked ? 'Sim' : 'Não'}</td>
                  <td>{format(new Date(user.created_at), 'dd/MM/yyyy HH:mm')}</td>
                  <td>
                    {user.id !== storedId && (
                      <button
                        className="standard-button-small"
                        onClick={() => navigate(`/edit-user/${user.id}`)}
                      >
                        Editar
                      </button>
                    )}

                    {user.id !== storedId && !user.blocked && (
                      <button
                        className="standard-button-small"
                        onClick={() => {
                          if (window.confirm('Você tem certeza que quer Bloquear o Usuário?')) {
                            deleteUser(user.id);
                          }
                        }}
                      >
                        Bloquear
                      </button>
                    )}

                    {user.id !== storedId && user.blocked && (
                      <button
                        className="standard-button-small"
                        onClick={() => {
                          if (window.confirm('Você tem certeza que quer Desbloquear o Usuário?')) {
                            unlockUser(user.id);
                          }
                        }}
                      > 
                        Liberar
                      </button>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default User;
