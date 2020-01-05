/* eslint-disable no-alert */
import React, { useState, useMemo, useEffect } from 'react';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';
import { Container, Top, Bottom, SubmitButton } from './styles';

import api from '~/services/api';

export default function Question({ navigation }) {
  const [question, setQuestion] = useState('');

  const helpOrder = navigation.getParam('helpOrder');

  async function handleSubmit() {
    try {
      const response = await api.post(
        `students/${helpOrder.student_id}/checkins`
      );
      Alert.alert('Pedido de auxílio gravado com sucesso!');
    } catch (err) {
      Alert.alert('Erro ao gravar o auxílio de pedido!');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <Top>
          <TextInput
            style={{ height: 40 }}
            placeholder="Inclua seu pedido de auxílio"
            onChangeText={text => this.setQuestion({ text })}
            value={this.state.text}
          />
        </Top>
        <Bottom>
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Enviar Pedido
          </SubmitButton>
        </Bottom>
      </Container>
    </Background>
  );
}

Question.navigationOptions = ({ navigation }) => ({
  title: 'Pergunta',
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
