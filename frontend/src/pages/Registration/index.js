import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { format, parseISO, formatDistance, addMonths } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { FaTrash, FaEdit, FaCheck, FaExclamation } from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Wrapper,
  Content,
  Top,
  ContentForm,
  CustomAnySelect,
  CustomSelect,
  CustomDatePicker,
} from './styles';
import history from '~/services/history';
import api from '~/services/api';

export default function Registration() {
  const [registration, setRegistration] = useState([]);
  const [date, setDate] = useState(new Date());
  const [student, setStudent] = useState('');
  const [plan, setPlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [total, setTotal] = useState('');

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  const endDate = useMemo(() => {
    if (plan && startDate) {
      return format(addMonths(startDate, plan.duration), 'dd/MM/YYYY');
    }
    return '';
  }, [plan, startDate]);

  function handleBack() {
    history.push('/dashboard');
  }

  async function handleSubmit() {
    try {
      await api.post('/registration', {
        student_id: student.id,
        plan_id: plan.value,
        start_date: startDate,
      });

      toast.success('Matrícula realizada com sucesso!');
      history.push('/registration');
    } catch (err) {
      toast.error('Erro ao realizar a matrícula');
    }
  }

  async function loadStudents(q) {
    const res = await api.get('students', {
      params: { q },
    });
    return new Promise(resolve => {
      resolve(
        res.data.map(st => {
          return {
            value: st.id,
            label: st.name,
            ...st,
          };
        })
      );
    });
  }

  async function loadPlans() {
    const response = await api.get('plans');
    return new Promise(resolve => {
      resolve(
        response.data.map(pl => {
          return {
            value: pl.id,
            label: pl.title,
            duration: pl.duration,
            total: pl.price * pl.duration,
            ...pl,
          };
        })
      );
    });
  }
  /*
  useEffect(() => {
    async function loadRegistration() {
      const response = await api.get('registrations');
      console.tron.log(response.data);
      const data = response.data.map(duration => ({
        ...duration,
        start_date: format(parseISO(duration.start_date), "d 'de' MMMM", {
          locale: pt,
        }),
        end_date: format(parseISO(duration.end_date), "d 'de' MMMM", {
          locale: pt,
        }),
      }));

      setRegistration(data);
    }
    loadRegistration();
  }, [date]);
  */
  return (
    <Wrapper>
      <Content>
        <Top>
          <h1>Cadastro de Matrículas</h1>
          <button type="button" onClick={handleBack}>
            Voltar
          </button>
          <button type="submit" form="registration">
            Salvar
          </button>
        </Top>
        <ContentForm>
          <Form id="registration" onSubmit={handleSubmit} className="form">
            <div className="aluno">
              <span className="form">Aluno</span>
              <CustomAnySelect
                cacheOptions
                isClearable
                defaultOptions
                loadOptions={e => loadStudents(e)}
                value={student}
                onChange={e => setStudent(e)}
                placeHolder="Selecionar o aluno"
              />
            </div>
            <section className="restante">
              <div className="pack">
                <span className="form">Plano</span>
                <CustomSelect
                  name="plan_id"
                  isSearchable={false}
                  isClearable
                  defaultOptions
                  loadOptions={e => loadPlans(e)}
                  value={plan}
                  // onChange={e => handlePlanChange(e)}
                  placeHolder="Selecionar o plano"
                />
              </div>
              <div className="pack">
                <span className="form">Data de início</span>
                <CustomDatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeHolder="Clique para escolher"
                />
              </div>
              <div className="pack">
                <span className="form">Data de térmio</span>
                <CustomDatePicker
                  selected={endDate}
                  className="form"
                  readOnly
                />
              </div>
              <div className="pack">
                <span className="form">Valor Final</span>
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
