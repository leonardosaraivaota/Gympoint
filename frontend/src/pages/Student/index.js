import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from './styles';

import history from '~/services/history';
import api from '~/services/api';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [pages = 1, setPages] = useState();

  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      await api.post('students', {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success('Aluno cadastrado com sucesso!');
    } catch (err) {
      toast.error('Erro ao realizar o cadastro do aluno');
    }
  }

  function handleBack() {
    history.push('/dashboard');
  }
  /*
  function handleEdit(id, student) {
    history.push(`/student/edit/${id}`, { student });
  }

  async function handleDelete(id) {
    const confirmation = confirm('Deseja realmente excluir?');
    if (confirmation) {
      await api.delete(`/students/${id}`);
    }
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
  */
  return (
    <Container>
      <div>
        <h1>Cadastro de alunos</h1>
        <button type="button" onClick={handleBack}>
          Voltar
        </button>
        <button type="submit" form="student">
          Salvar
        </button>
      </div>
      <Form id="student" onSubmit={handleSubmit}>
        <div>
          <span>Nome Completo</span>
          <Input name="name" placeholder="seu nome completo" />

          <span>Endereço de e-mail</span>
          <Input
            name="email"
            type="email"
            placeholder="seu endereço de e-mail"
          />
        </div>
        <section>
          <div>
            <span>Idade</span>
            <Input name="age" />
          </div>
          <div>
            <span>Peso (em KG)</span>
            <Input name="weight" />
          </div>
          <div>
            <span>Altura</span>
            <Input name="height" />
          </div>
        </section>
      </Form>
    </Container>
  );
}
