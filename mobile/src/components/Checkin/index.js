import React, { useMemo } from 'react';
import { parseISO, formatDistance, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Info, Name, Time } from './styles';

export default function Checkin({ data }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.created_at]);

  return (
    <Container>
      <Info>
        <Name>Check-in #{data.id}</Name>
        <Time>{dateParsed}</Time>
      </Info>
    </Container>
  );
}
