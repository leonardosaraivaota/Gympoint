/* eslint-disable no-alert */
import React, { useState, useMemo, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Alert } from 'react-native';
import Background from '~/components/Background';
import api from '~/services/api';
import { Container, Form, SubmitButton, List } from './styles';
import CheckinList from '~/components/Checkin';
import Header from '~/components/Header';

export default function Checkin() {
  const id = useSelector(state => state.auth.token.id);
  
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/students/${id}/checkins`, {
        where: { student_id: id },
      });
      setCheckins(response.data);
    }
    loadCheckins();
  }, [id]);

  async function handleSubmit() {
    try {
      const response = await api.post(`/students/${id}/checkins`);
      Alert.alert('Checkin realizado com sucesso!');
    } catch (err) {
      Alert.alert('Erro ao realizar o checkin!');
    }
  }

  return (
    <Background>
      <Container>
        <Header />
        <Form>
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Novo check-in
          </SubmitButton>

          <List
            data={checkins}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <CheckinList data={item} />}
          />
        </Form>
      </Container>
    </Background>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Checkin',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="my_location" size={20} color={tintColor} />
  ),
};
