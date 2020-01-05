import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container } from './styles';
import api from '~/services/api';

export default function HelpOrderEdit() {
  const [helpOrder, setHelpOrder] = useState([]);

  useEffect(() => {
    async function loadHelpOrder() {
      const response = await api.get('help-orders');
      console.tron.log(response.data);
      setHelpOrder(response.data);
    }
    loadHelpOrder();
  }, []);

  return (
    <>
      <Container>
        Pedidos de Auxílio
        <table>
          <tr>
            <th>ALUNO</th>
            <th />
          </tr>
          {helpOrder.map(ho => (
            <tr key={ho.id}>
              <td>{ho.student.name}</td>
              <td>
                <a href="#">RESPONDER</a>
              </td>
            </tr>
          ))}
        </table>
        <Form />
      </Container>
    </>
  );
}
