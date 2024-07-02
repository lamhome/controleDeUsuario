import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import lamIMG from "./../assets/images/lg_lamtech.png";

function CreateActivity() {
  const [category, setCategory] = useState('');
  const [activity, setActivity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3333/v1/activity/list-categories', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (new Date(startTime) >= new Date(endTime)) {
      setError('O Termino está menor que o Inicio da atividade. Favor corrigir.');
      return;
    }

    try {
      const storedToken = localStorage.getItem('token');
      const storedId = localStorage.getItem('id');
      await axios.post('http://localhost:3333/v1/activity', {
        description: activity,
        category_id: category,
        dt_inicial: startTime,
        dt_final: endTime,
        user_id: storedId
      }, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      setMessage('Atividade salva com sucesso!');
      setTimeout(() => navigate('/activity'), 2000); // Voltar para /activity após 2 segundos
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
      setError('Erro ao salvar atividade. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        {message && <div className="login-form-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSave}>
          <span className="login-form-title">Criar Atividade</span>

          <span className="login-form-title">
            <img src={lamIMG} alt="LAMTech" />
          </span>

          <div className="wrap-input">
            <select
              className={activity !== "" ? "has-val input with-placeholder" : "input with-placeholder"}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Selecione a categoria</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.description}</option>
              ))}
            </select>
            <span className="focus-input" data-placeholder="Categoria"></span>
          </div>

          <div className="wrap-input">
            <input
              className={activity !== "" ? "has-val input" : "input"}
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              required
            />
            <span className="focus-input" data-placeholder="Atividade"></span>
          </div>

          <div className="wrap-input">
            <input
              className={startTime !== "" ? "has-val input with-placeholder" : "input with-placeholder"}
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <span className="focus-input" data-placeholder="Inicio"></span>
          </div>

          <div className="wrap-input">
            <input
              className={endTime !== "" ? "has-val input with-placeholder" : "input with-placeholder"}
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
            <span className="focus-input" data-placeholder="Término"></span>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn">Salvar</button>
          </div>

          <div className="text-center">
            <Link className="txt2" to="/activity">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateActivity;
