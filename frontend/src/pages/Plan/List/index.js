/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function PlanList() {
  const [plans, setPlans] = useState([]);
  const [pages = 1, setPages] = useState();
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans', {
        params: { page: pages },
      });
      const formatedPlans = response.data.map(p => ({
        ...p,
        formatePrice: p.price.toFixed(2).replace('.', ','),
      }));
      setPlans(formatedPlans);
    }
    loadPlans();
  }, [pages]);

  function handleBack() {
    history.push('/dashboard');
  }

  function handleEdit(id, plan) {
    history.push(`/plans/Edit/${id}`, plan);
  }

  function handleSubmit() {
    history.push('/plans/');
  }

  async function handleDelete(id) {
    const confirmation = window.confirm('Deseja realmente excluir?');

    if (confirmation) {
      await api.delete(`/plans/${id}`);
    }
  }

  function handleDecreasePage() {
    setPages(pages - 1);
  }

  function handleIncreasePage() {
    setPages(pages + 1);
  }

  return (
    <Container>
      <div>
        <h1>Gerenciando Planos</h1>
        <button type="button" onClick={handleSubmit}>
          Cadastrar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO (em meses)</th>
            <th>VALOR (por mês)</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td>{plan.duration}</td>
              <td>R${plan.formatePrice}</td>
              <td>
                <button type="button" title="Editar">
                  <FaEdit size={20} onClick={() => handleEdit(plan.id, plan)} />
                </button>
                <button type="button" title="Excluir">
                  <FaTrash size={20} onClick={() => handleDelete(plan.id)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <button
          type="button"
          disabled={pages < 2}
          onClick={() => handleDecreasePage()}
        />
        <MdChevronLeft size={30} />
        <small>Página: {pages}</small>
        <button
          type="button"
          disabled={lastPage}
          onClick={() => handleIncreasePage()}
        />
        <MdChevronRight size={30} />
      </footer>
    </Container>
  );
}
