import React, { useState, useEffect, useMemo } from 'react';

import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Background from '~/components/Background';
import Header from '~/components/Header';
import { Container, Question, Title, Time, Text } from './styles';

import api from '~/services/api';

export default function Answer({ navigation }) {
  const [helpOrders, setHelpOrders] = useState([]);

  const helpOrder = navigation.getParam('helpOrder');

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/students/${helpOrder.id}/checkins`);
      setHelpOrders(response.data);
    }
    loadHelpOrders();
  }, [helpOrder.id]);

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(helpOrders.answer_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [helpOrders.answer_at]);

  return (
    <Background>
      <Header />
      <Container>
        <Question>
          <Title>Pergunta</Title>
          <Time>{dateParsed}</Time>
          <Text>{helpOrders.question}</Text>
        </Question>
        <Answer>
          <Title>Resposta</Title>
          <Text>{helpOrders.answer}</Text>
        </Answer>
      </Container>
    </Background>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
  title: 'Resposta',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
