import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import lamIMG from "./../assets/images/lg_lamtech.png";

function EditUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [userTypes, setUserTypes] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3333/v1/user/list-types', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        setUserTypes(response.data);
      } catch (error) {
        console.error('Erro ao buscar tipos de usuário:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3333/v1/user/detail`, {
          params: {
            user_id: id
          },
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        const { name, email, type_id } = response.data;
        setName(name);
        setEmail(email);
        setUserType(type_id);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUserTypes();
    fetchUser();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const storedToken = localStorage.getItem('token');
      await axios.put(`http://localhost:3333/v1/user/edit`, {
        user_id: id,
        name,
        type_id: userType
      }, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      setMessage('Usuário atualizado com sucesso!');
      setTimeout(() => navigate('/user'), 2000); // Voltar para o User após 2 segundos
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      setError('Erro ao atualizar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        {message && <div className="login-form-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSave}>
          <span className="login-form-title">Editar Usuário</span>

          <span className="login-form-title">
            <img src={lamIMG} alt="LAMTech" />
          </span>

          <div className="wrap-input">
            <input
              className={name !== "" ? "has-val input" : "input"}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className="focus-input" data-placeholder="Nome"></span>
          </div>

          <div className="wrap-input">
            <input
              className={email !== "" ? "has-val input" : "input"}
              type="text"
              value={email}
              readOnly
            />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>

          <div className="wrap-input">
            <select
              className={userType !== "" ? "has-val input with-placeholder" : "input with-placeholder"}
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="" disabled>Selecione o tipo de usuário</option>
              {userTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            <span className="focus-input" data-placeholder="Tipo"></span>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn">Salvar</button>
          </div>

          <div className="text-center">
            <Link className="txt2" to="/user">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
