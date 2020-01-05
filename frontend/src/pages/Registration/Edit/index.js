import React, { useState, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { parseISO, format, addMonths } from 'date-fns';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import {
  Container,
  Wrapper,
  Content,
  Top,
  ContentForm,
  CustomSelect,
  CustomDatePicker,
} from './styles';

export default function RegistrationEdit({ history: navigation }) {
  const { registration } = navigation.location.state;
  const [plan, setPlan] = useState();
  const [startDate, setStartDate] = useState();
  const [total, setTotal] = useState();

  async function handleSubmit() {
    try {
      await api.put(`/registrations/${registration.id}`, {
        student_id: registration.student_id,
        plan_id: plan.value,
        start_date: startDate,
      });

      toast.success('Matrícula atualizada com sucesso!');
      history.push('/registrations/list');
    } catch (err) {
      toast.erro('Erro ao atualizar a matrícula!');
    }
  }

  async function loadPlans() {
    const response = api.get('plans');
    return new Promise(resolve => {
      resolve(
        response.data.map(pl => {
          return {
            value: pl.id,
            label: pl.title,
            duration: pl.duration,
            totalPrice: pl.price * pl.duration,
            ...pl,
          };
        })
      );
    });
  }

  const endDate = useMemo(() => {
    if (plan && startDate) {
      return format(addMonths(startDate, plan.duration), 'dd/MM/YYYY');
    }
    return '';
  }, [plan, startDate]);
  function handleBack() {
    history.push('/registration');
  }

  return (
    <Wrapper>
      <Content>
        <Top>
          <h1>Edição de matrícula</h1>
          <button type="button" onClick={handleBack}>
            Voltar
          </button>
          <button type="submit">Salvar</button>
        </Top>
        <ContentForm>
          <Form id="form" className="form" onSubmit={handleSubmit}>
            <div className="aluno">
              <span className="form">ALUNO</span>
              <Input name="student" value={registration.student.name} />
            </div>
            <section className="restante">
              <div name="pack">
                <span className="form">PLANO</span>
                <CustomSelect
                  name="plan_id"
                  isSearchable={false}
                  isClearable
                  defaultOptions
                  value={plan}
                  loadOptions={e => loadPlans(e)}
                  placeholder="Selecione o plano"
                />
              </div>
              <div name="pack">
                <span className="form">DATA DE INÍCIO</span>
                <CustomDatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Clique para escolher"
                />
              </div>
              <div name="pack">
                <small className="form">DATA DE TÉRMINO</small>
                <Input
                  name="dataTermino"
                  value={endDate}
                  className="form"
                  readonly
                />
              </div>
              <div name="pack">
                <small className="form">VALOR FINAL</small>
                <Input
                  name="valorFinal"
                  value={total}
                  className="form"
                  readOnly
                />
              </div>
            </section>
          </Form>
        </ContentForm>
      </Content>
    </Wrapper>
  );
}

RegistrationEdit.propTypes = {
  history: PropTypes.object.isRequired,
};
