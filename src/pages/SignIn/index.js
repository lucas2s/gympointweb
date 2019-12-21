import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { Container, ContainerSignIn, Logo } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
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
          <button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar no Sistema'}{' '}
          </button>
        </Form>
      </ContainerSignIn>
    </Container>
  );
}
