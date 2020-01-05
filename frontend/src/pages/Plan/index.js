import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input';
import { Container } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      setPlans(response.data);
    }
    loadPlans();
  }, []);

  function handleBack() {
    history.push('/dashboard');
  }

  function handleInput(e) {
    setPrice(e.target.value);
  }

  async function handleSubmit() {
    try {
      await api.post('plans', {
        title,
        duration,
        price: parseFloat(price),
      });

      toast.success('Plano cadastrado com sucesso!');
      history.push('/plan');
    } catch (err) {
      toast.error('Erro ao cadastrar o plano!');
    }
  }

  return (
    <Container>
      <div>
        <h1>Cadastro de Planos</h1>
        <button type="button" onClick={handleBack}>
          Voltar
        </button>
        <button type="submit">Salvar</button>
      </div>
      <Form id="plan" onClick={handleSubmit}>
        <div>
          <span>Título do Plano</span>
          <Input name="title" placeholder="Nome do plano" value={title} />
        </div>
        <section>
          <div>
            <span>Duração (em meses)</span>
            <Input name="duration" value={duration} />
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
              onChange={(_, floatvalue) => handleInput(floatvalue)}
            />
          </div>

          <div>
            <span>Preço total</span>
            <Input name="total" readOnly value={total} />
          </div>
        </section>
      </Form>
    </Container>
  );
}
