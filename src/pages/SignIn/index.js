import React from 'react';

import { Container, ContainerSignIn, Logo, Form} from './styles';
import logo from '../../assets/images/logo.png';

export default function SignIn() {

  function handleSignIn() {
    console.tron("Entrei handleSignIn");
  };

  return (
    <Container>
      <ContainerSignIn>
        <Logo src={logo} alt="logo"></Logo>
        <Form>
          <p>SEU E-MAIL</p>
          <input name="email" type="email" placeholder="Seu e-mail" />
          <p>SUA SENHA</p>
          <input name="password" type="password" placeholder="Sua senha" />
          <button type="button" onClick={() => handleSignIn()}> Entrar no Sistema</button>
        </Form>
      </ContainerSignIn>
    </Container>
  );
}