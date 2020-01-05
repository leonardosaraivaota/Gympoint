import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const Form = styled.View``;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  color: #f64c75;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
