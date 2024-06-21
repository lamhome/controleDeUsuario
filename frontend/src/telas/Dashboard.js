import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import lamIMG from './../assets/images/lg_lamtech.png';
import photo from './../assets/images/171549900.gif';
import { format } from 'date-fns';

function Dashboard() {

  // Função logout
  const handleLogout = () => {
    if (window.confirm('Você realmente deseja sair?')) {
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
    }
  };

  const [name, setName] = useState('');
  const [typeName, setTypeName] = useState('');
  const [isAdm, setIsAdm] = useState(false);
  const [userList, setUserList] = useState([]);
  const [storedId, setStoredId] = useState('');
  const [storedToken, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedTypeName = localStorage.getItem('typeName');
    const storedIsAdm = localStorage.getItem('isAdm') === 'true';
    const storedId = localStorage.getItem('id');
    const storedToken = localStorage.getItem('token');
  
    setName(storedName || '');
    setTypeName(storedTypeName || '');
    setIsAdm(storedIsAdm);
    setStoredId(storedId || '');
    setToken(storedToken || '');
    
    // Buscar lista de usuários ao carregar o Dashboard
    if (storedToken) {
      fetchUsers(storedToken);
    }
  }, []);

  // Função para buscar lista de usuários
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

  // Função para deletar usuário
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3333/v1/user/remove`, {
        params: {
          user_id: userId
        },
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      // Atualiza a lista após a deleção
      fetchUsers(storedToken);
      alert('Usuário deletado com sucesso!');
      // Recarrega a página para refletir as alterações
      // window.location.reload();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={lamIMG} alt="Logo" className="logo" />
        <div className="user-area">
          <img 
            src={photo}
            alt="Foto do Usuário" 
          />
          <div>
            <h3>{name}</h3>
            <p>{typeName}</p>
            <button className="standard-button-small" onClick={() => navigate(`/reset-password`)}>Redefinir Senha</button>
          </div>
          <i className="logout-icon" onClick={handleLogout}>Logout</i>
        </div>
      </header>
      <main className="dashboard-main">
        {isAdm ? (
          <div>
            <div className="area-table">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Tipo Perfil</th>
                    <th>Status</th>
                    <th>Data Criação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.type?.name || 'Desconhecido'}</td>
                      <td>{user.activated ? 'Ativo' : 'Inativo'}</td>
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

                        {user.id !== storedId && (
                          <button
                            className="standard-button-small"
                            onClick={() => {
                              if (window.confirm('Você tem certeza que quer deletar o Usuário?')) {
                                deleteUser(user.id);
                              }
                            }}
                          >
                            Deletar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h3>Você está logado com perfil tipo Usuário</h3>
        )}
      </main>
    </div>
  );
}

export default Dashboard;