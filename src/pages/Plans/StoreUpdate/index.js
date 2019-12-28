/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  Container,
  Content,
  BtnVoltar,
  BtnSalvar,
  ContentForm,
} from './styles';
import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  name: Yup.string().required('Informe um nome válido'),
  weight: Yup.number('Valor deve ser numérico')
    .positive('Insira um peso válido')
    .required('O peso é obrigatória')
    .typeError('O peso é obrigatório'),
  height: Yup.number('Valor deve ser numérico')
    .positive('Insira um peso válido')
    .required('O peso é obrigatória')
    .typeError('A altura obrigatória'),
});

export default function StoreUpdate() {
  const { id } = useParams();

  const [plan = {}, setPlan] = useState({});
  const [title, setTitle] = useState();

  useEffect(() => {
    async function loadPlan() {
      try {
        if (id) {
          setTitle('Edição de plano');
          const response = await api.get(`plan/${id}`);

          setPlan(response.data.student);
        } else {
          setTitle('Cadastro de plano');
        }
      } catch (err) {
        setPlan({});
      }
    }
    loadPlan();
  }, [id]);

  async function handleSubmit({}, { resetForm }) {}

  return (
    <Container>
      <Content>
        <h1>{title}</h1>
        <div>
          <BtnVoltar
            type="button"
            onClick={() => {
              history.push('/plans/list');
            }}
          >
            <MdArrowBack size={22} color="#FFF" />
            VOLTAR
          </BtnVoltar>
          <BtnSalvar type="submit" form="plans">
            <MdSave size={20} color="#FFF" />
            SALVAR
          </BtnSalvar>
        </div>
      </Content>
      <ContentForm>
        <Form
          initialData={plan}
          schema={schema}
          onSubmit={handleSubmit}
          id="plans"
        >
          <label htmlFor="title">TÍTULO DO PLANO</label>
          <Input name="title" type="text" placeholder="Título Plano" />
          <div className="myContainer">
            <div>
              <label htmlFor="duration">DURAÇÃO (em meses)</label>
            </div>
            <div>
              <label htmlFor="price">PREÇO MENSAL</label>
            </div>
            <div>
              <label htmlFor="priceTotal">PREÇO TOTAL</label>
            </div>
          </div>
          <div>
            <div>
              <Input name="duration" step="0" type="number" placeholder="6" />
            </div>
            <div>
              <Input
                name="price"
                step="0.01"
                type="text"
                placeholder="R$100.00"
              />
            </div>
            <div>
              <Input name="priceTotal" step="0.01" type="text" disabled />
            </div>
          </div>
        </Form>
      </ContentForm>
    </Container>
  );
}
