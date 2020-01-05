import React from 'react';
import { Image } from 'react-native';
import logo from '~/assets/logo.png';
// import Background from '~/components/Background';
import { Container, Title } from './styles';

export default function Header() {
  const title = 'GYMPOINT';
  return (
    <Container>
      <Image
        source={logo}
        alt="Gympoint"
        style={{
          width: 80,
          height: 50,
        }}
      />
      <Title>{title}</Title>
    </Container>
  );
}
