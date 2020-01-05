import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Alert } from 'react-native';
import Background from '~/components/Background';
import Header from '~/components/Header';
import api from '~/services/api';
import { Container, Form, SubmitButton, List } from './styles';
import HelpOrderList from '~/components/HelpOrder';

export default function HelpOrder({ navigation }) {
  const id = useSelector(state => state.auth.id);

  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(
        `/students/${helpOrders.student_id}/checkins`
      );
      setHelpOrders(response.data);
    }
    loadHelpOrders();
  }, [helpOrders.student_id]);

  async function handleSubmit() {
    navigation.navigate('Answer', { helpOrders });
    /*
      try{
        const response = await api.post(`/students/${id}/checkins`);
      }
      catch(err) {

      }
    */
  }

  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Novo pedido de auxílio
          </SubmitButton>

          <List
            data={helpOrders}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <HelpOrderList data={item} />}
          />
        </Form>
      </Container>
    </Background>
  );
}

HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir Ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live_help" size={20} color={tintColor} />
  ),
};
