import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Container } from './styles';
import api from '~/services/api';

export default function HelpOrderList() {
  const [helpOrder, setHelpOrder] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let subtitle;

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

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
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
        </Modal>
      </div>
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
