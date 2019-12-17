import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container, ContainerSignIn, Logo } from './styles';
import logo from '../../assets/images/logo.png';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Container>
      <ContainerSignIn>
        <Logo src={logo} alt="logo" />
        <Form onSubmit={handleSubmit}>
          <p>SEU E-MAIL</p>
          <Input name="email" type="email" placeholder="Seu e-mail" />
          <p>SUA SENHA</p>
          <Input name="password" type="password" placeholder="Sua senha" />
          <button type="submit">Entrar no Sistema</button>
        </Form>
      </ContainerSignIn>
    </Container>
  );
}
