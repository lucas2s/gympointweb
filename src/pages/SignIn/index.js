import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container, ContainerSignIn, Logo } from './styles';
import logo from '~/assets/images/logo.png';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória')
})

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Container>
      <ContainerSignIn>
        <Logo src={logo} alt="logo" />
        <Form schema={schema} onSubmit={handleSubmit}>
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
