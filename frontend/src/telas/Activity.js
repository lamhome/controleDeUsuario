// src/telas/Activity.js
import React, { useEffect, useState } from 'react';
import Head from '../includes/Head';
import Header from '../includes/Header';
import Footer from '../includes/Footer';
import Menu from '../includes/Menu'; 

function Activity() {
  const [name, setName] = useState('');
  const [typeName, setTypeName] = useState('');
  const [isAdm, setIsAdm] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedTypeName = localStorage.getItem('typeName');
    const storedIsAdm = localStorage.getItem('isAdm') === 'true';

    setName(storedName || '');
    setTypeName(storedTypeName || '');
    setIsAdm(storedIsAdm);

    if (!localStorage.getItem('token')) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Head />
      <Header name={name} typeName={typeName} />
      <Menu isAdm={isAdm} />
      <main className="dashboard-main">
          <h3>GESTÃO DE ATIVIDADES</h3>
      </main>
      <Footer />
    </div>
  );
}

export default Activity;