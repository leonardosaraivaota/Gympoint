/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container } from './styles';

import history from '~/services/history';
import api from '~/services/api';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [pages = 1, setPages] = useState();
  const [input, setInput] = useState('');
  const [lastPage, setLastPage] = useState();
  // const { name } = req.query;
  const name = 'fu';
  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: { name: input, page: pages },
      });

      console.tron.log(response.data);
      setStudents(response.data);
    }
    loadStudents('fu');
  }, [input, name, pages]);

  function handleBack() {
    history.push('/dashboard');
  }

  function handleEdit(id, student) {
    history.push(`/students/Edit/${id}`, { student });
  }

  async function handleDelete(id) {
    const confirmation = window.confirm('Deseja realmente excluír?');
    if (confirmation) {
      await api.delete(`/students/${id}`);
    }
  }

  function handleSubmit() {
    history.push('/students/');
  }

  function handleInput(e) {
    setInput(e.target.value);
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
        <h1>Gerenciando alunos</h1>
        <button type="button" onClick={handleSubmit}>
          Cadastrar
        </button>
        <form>
          <input
            value={input}
            onChange={() => handleInput(event)}
            type="text"
            placeholder="Buscar aluno"
          />
        </form>
      </div>
      <table>
        <tr>
          <th>NOME</th>
          <th>E-MAIL</th>
          <th>IDADE</th>
          <th />
        </tr>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>
            <td>
              <button type="button" title="editar">
                <FaEdit
                  size={20}
                  onClick={() => handleEdit(student.id, student)}
                />
              </button>
              <button type="button" title="deletar">
                <FaTrash size={20} onClick={() => handleDelete(student.id)} />
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
