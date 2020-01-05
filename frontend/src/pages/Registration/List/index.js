/* eslint-disable no-alert */
import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { format, parseISO, formatDistance } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { FaTrash, FaEdit, FaCheck, FaExclamation } from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container } from './styles';

import history from '~/services/history';
import api from '~/services/api';

export default function Registration() {
  const [registrations, setRegistrations] = useState([]);
  const [pages = 1, setPages] = useState();
  const [date, setDate] = useState(new Date());
  const [lastPage, setLastPage] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadRegistrations() {
      // const response = await api.get('registrations');
      const response = await api.get('registrations', {
        params: { page: pages },
      });
      // console.tron.log(response.data);
      const data = response.data.map(duration => ({
        ...duration,
        start_date: format(parseISO(duration.start_date), "d 'de' MMMM", {
          locale: pt,
        }),
        end_date: format(parseISO(duration.end_date), "d 'de' MMMM", {
          locale: pt,
        }),
      }));

      setRegistrations(data);
    }
    loadRegistrations();
  }, [date, pages]);

  function handleSubmit() {
    history.push('/plans/');
  }

  function handleBack() {
    history.push('/dashboard');
  }

  function handleEdit(id, registration) {
    history.push(`/registrations/Edit/${id}`, { registration });
  }

  async function handleDelete(id) {
    const confirmation = window.confirm('Deseja realment excluír?');

    if (confirmation) {
      await api.delete(`/registration/${id}`);
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
        <h1>Gerenciando Matrículas</h1>
        <button type="button" onClick={handleSubmit}>
          Cadastrar
        </button>
      </div>
      <table>
        <tr>
          <th>ALUNO</th>
          <th>PLANO</th>
          <th>INÍCIO</th>
          <th>TÉRMINO</th>
          <td>ATIVO</td>
          <th />
        </tr>
        {registrations.map(registration => (
          <tr key={registration.id}>
            <td>{registration.student.name}</td>
            <td>{registration.plan.title}</td>
            <td>{registration.start_date}</td>
            <td>{registration.end_date}</td>
            <td>
              {registration.active ? (
                <FaCheck size={20} color="green" />
              ) : (
                <FaExclamation size={20} color="red" />
              )}
            </td>
            <td>
              <button type="button" title="Editar">
                <FaEdit
                  size={20}
                  onClick={() => handleEdit(registration.id, registration)}
                />
              </button>
              <button type="button" title="Excluir">
                <FaTrash
                  size={20}
                  onClick={() => handleDelete(registration.id)}
                />
              </button>
            </td>
          </tr>
        ))}
      </table>
      <footer>
        <button
          type="button"
          disabled={pages < 2}
          onClick={() => handleDecreasePage}
        >
          <MdChevronLeft size={30} />
        </button>
        <small>Página {pages}</small>
        <button
          type="button"
          disabled={lastPage}
          onClick={() => handleIncreasePage}
        >
          <MdChevronRight size={30} />
        </button>
      </footer>
    </Container>
  );
}
