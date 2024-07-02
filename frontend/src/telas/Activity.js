import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Head from '../includes/Head';
import Header from '../includes/Header';
import Footer from '../includes/Footer';
import Menu from '../includes/Menu';
import { format } from 'date-fns';

function Activity() {
  const [activityList, setActivityList] = useState([]);
  const [name, setName] = useState('');
  const [typeName, setTypeName] = useState('');
  const [isAdm, setIsAdm] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve values from localStorage
    const name = localStorage.getItem('name');
    const typeName = localStorage.getItem('typeName');
    const isAdm = localStorage.getItem('isAdm') === 'true'; 

    // Set state with retrieved values
    setName(name || '');
    setTypeName(typeName || '');
    setIsAdm(isAdm);

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      fetchActivities(storedToken);
    } else {
      // Redirect to login page or handle unauthorized access
      window.location.href = "/";
    }
  }, []);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('id');
      const response = await axios.get('http://localhost:3333/v1/activity/list-all', {
        params: { user_id: user_id },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setActivityList(response.data);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3333/v1/activity/delete`, { 
        activity_id: activityId
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchActivities(token);
      alert('Atividade Finalizada com sucesso!');
    } catch (error) {
      console.error('Erro ao finalizar atividade:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Head />
      <Header name={name} typeName={typeName} />
      <Menu isAdm={isAdm} />
      <main className="dashboard-main">
        <h3>GESTÃO DE ATIVIDADES</h3>
        <div className="area-table">
          <table className="user-table">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Atividade</th>
                <th>Inicio</th>
                <th>Término</th>
                <th>Status</th>
                <th className="actions-header">
                  <div className="actions-container">
                    <span>Ações</span>
                    <button 
                      className="standard-button-small new-activity-button" 
                      onClick={() => navigate('/create-activity')}
                    >
                      Nova Atividade
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {activityList.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.category?.description}</td>
                  <td>{activity.description}</td>
                  <td>{format(new Date(activity.dt_inicial), 'dd/MM/yyyy HH:mm')}</td>
                  <td>{format(new Date(activity.dt_final), 'dd/MM/yyyy HH:mm')}</td>
                  <td>{activity.finalized ? 'Finalizada' : 'Em Andamento'}</td>
                  <td>
                  {!activity.finalized && (
                    <button 
                      className="standard-button-small"
                      onClick={() => navigate(`/edit-activity/${activity.id}`)}
                    >
                      Editar
                    </button>
                  )}

                  {!activity.finalized && (
                      <button
                      className="standard-button-small"
                      onClick={() => {
                        if (window.confirm('Você tem certeza que quer Finalizar a Atividade?')) {
                          deleteActivity(activity.id);
                        }
                      }}
                    >
                      Finalizar
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

export default Activity;