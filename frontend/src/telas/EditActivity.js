import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import lamIMG from "./../assets/images/lg_lamtech.png";

function EditActivity() {
  const { id } = useParams(); // Pega o ID da atividade dos parâmetros da URL
  const [activity, setActivity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState('');
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

    const fetchActivity = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3333/v1/activity/detail`, {
          params: { 
            activity_id: id 
          },
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        const { description, dt_inicial, dt_final, category_id } = response.data;

        // Converte as datas para o formato compatível com o input datetime-local
        const formatDate = (date) => {
          const d = new Date(date);
          const pad = (num) => (num < 10 ? '0' + num : num);
          return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
        };

        setActivity(description);
        setStartTime(formatDate(dt_inicial));
        setEndTime(formatDate(dt_final));
        setCategory(category_id);

      } catch (error) {
        console.error('Erro ao buscar atividade:', error);
      }
    };

    fetchCategories();
    fetchActivity();
  }, [id]);

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
      await axios.put('http://localhost:3333/v1/activity/edit', {
        activity_id: id,
        description: activity,
        category_id: category,
        dt_inicial: startTime,
        dt_final: endTime
      }, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      setMessage('Atividade atualizada com sucesso!');
      setTimeout(() => navigate('/activity'), 2000); // Voltar para /activity após 2 segundos
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      setError('Erro ao atualizar atividade. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        {message && <div className="login-form-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSave}>
          <span className="login-form-title">Editar Atividade</span>

          <span className="login-form-title">
            <img src={lamIMG} alt="LAMTech" />
          </span>

          <div className="wrap-input">
            <select
              className={category !== "" ? "has-val input with-placeholder" : "input with-placeholder"}
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

export default EditActivity;
