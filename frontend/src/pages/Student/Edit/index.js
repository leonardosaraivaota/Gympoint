import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

export default function StudentEdit({ history: navigation }) {
  const { student } = navigation.location.state;

  function handleBack() {
    history.push('/dashboard');
  }

  async function handleSubmit(data) {
    try {
      const { name, email, age, weight, height } = data;
      await api.put(`students/${student.id}`, {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success('Aluno atualizado com sucesso!');
      history.push('/students/edit');
    } catch (err) {
      toast.error('Erro ao atualizar os dados do aluno');
    }
  }

  return (
    <Container>
      <div>
        <h1>Edição de Aluno</h1>
        <button type="button" onClick={handleBack}>
          Voltar
        </button>
        <button type="submit">Salvar</button>
      </div>
      <Form initialData={student} onClick={handleSubmit} id="student">
        <div>
          <span>Nome Completo</span>
          <Input name="name" placeholder="Nome completo" />

          <span>Endereço de e-mail</span>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
        </div>
        <section>
          <div>
            <span>Idade</span>
            <Input name="age" />
          </div>
          <div>
            <span>Peso (em Kg)</span>
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

StudentEdit.propTypes = {
  history: PropTypes.object.isRequired,
};
