import React, { useState, useMemo, useEffect } from 'react';
import { parseISO, formatDistance, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Mdchevro } from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Top, Title, Time, Bottom } from './styles';

export default function HelpOrder({ data }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.created_at]);

  return (
    <Container>
      <Top>
        <Title>{data.answer_at ? (
          <Icon name="check-circle" size={20} color="#008000">Respondido</Icon>
        ) : (
          <Icon name="check-circle" size={20} color="#808080">Sem resposta</Icon>
        )}</Title>
        <Time>{dateParsed}</Time>
      </Top>
      <Bottom>{data.question}</Bottom>
    </Container>
  );
}
