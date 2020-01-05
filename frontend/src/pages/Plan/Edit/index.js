/* eslint-disable no-restricted-globals */
import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input';
import { Container } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function PlanEdit() {
  const [plan, setPlan] = useState([]);
  const [title, setTitle] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [total, setTotal] = useState();

  async function handleSubmit() {
    try {
      await api.put(`/plans/${plan.id}`, {
        title,
        duration,
        price: parseFloat(price),
      });

      toast.success('Plano alterado com sucesso!');
      history.push('/plans/list');
    } catch (err) {
      toast.error('Erro ao cadastrar o plano!');
    }
  }

  function handleInputTitle(e) {
    setTitle(e.target.value);
  }

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      setPlan(response.data);
    }
    loadPlans();
  }, []);

  function handleInput(floatValue) {
    setPrice(floatValue);
  }

  function handleBack() {
    history.push('/plans/list');
  }

  return (
    <Container>
      <div>
        <h1>Edição de plano</h1>
        <button type="button" onClick={handleBack}>
          Voltar
        </button>
        <button type="submit" form="plan">
          Salvar
        </button>
      </div>

      <Form id="plan" onSubmit={handleSubmit}>
        <div>
          <span>Título do Plano</span>
          <Input
            name="title"
            placeholder="Nome do plano"
            onChange={() => handleInputTitle(event)}
          />
        </div>
        <div>
          <span>Duração (em meses)</span>
          <Input name="duration" onChange={e => setDuration(e.target.value)} />
        </div>
        <div>
          <span>Preço mensal</span>
          <CurrencyInput
            thousandSeparator="."
            decimalSeparator=","
            precision="2"
            prefix="R$"
            value={price}
            selectAllFocus
            onChange={(_, floatValue) => handleInput(floatValue)}
          />
        </div>
        <div>
          <span>Preço Total</span>
          <Input name="total" readonly value={total} />
        </div>
      </Form>
    </Container>
  );
}
