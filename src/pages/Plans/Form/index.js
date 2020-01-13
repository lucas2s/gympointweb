/* eslint-disable no-empty-pattern */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useMemo } from 'react';
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
import { formatPrice } from '~/util/format';
import InputCurrency from '~/components/InputCurrency';

const schema = Yup.object().shape({
  title: Yup.string().required('Informe um Título'),
  duration: Yup.number('Valor deve ser numérico')
    .positive('Insira um mês válido')
    .required('O mês é obrigatório')
    .min(1, 'Mês deve ser maior do que 0')
    .max(12, 'Mês deve ser menor do que 13')
    .typeError('O mês é obrigatório'),
  price: Yup.number('Valor deve ser numérico')
    .positive('Insira um preço válido')
    .min(1, 'Preço deve ser maior do que 0')
    .required('O preço é obrigatório')
    .typeError('O preço é obrigatório'),
});

export default function StoreUpdate() {
  const { id } = useParams();

  const [titleForm, setTitle] = useState();
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();
  const [plan, setPlan] = useState({});

  const priceTotal = useMemo(() => {
    if (price && duration) return formatPrice(price * duration);
    return formatPrice(0);
  }, [price, duration]);

  useEffect(() => {
    async function loadPlan() {
      try {
        if (id) {
          setTitle('Edição de plano');
          const response = await api.get(`plans/${id}`);
          const initial = response.data;

          setPlan(initial);
          setDuration(initial.duration);
          setPrice(initial.price);
        } else {
          setTitle('Cadastro de plano');
        }
      } catch (err) {
        toast.error('Erro para carregar as informações de Plano');
      }
    }
    loadPlan();
  }, []);

  async function handleSubmit({ title }, { resetForm }) {
    try {
      if (!id) {
        const confirmation = confirm(`Deseja incluir o plano ${title} ?`);

        if (!confirmation) {
          toast.warn('Inclusão do plano cancelada!');
          return;
        }

        const response = await api.post('plans', {
          title,
          duration,
          price,
        });

        if (response.status === 200) {
          resetForm();
          setPrice();
          setDuration();
          setPlan({});
          toast.success('Inclusão do plano realizada com sucesso!');
        } else {
          toast.error(response.data.error);
        }
      } else {
        const confirmation = confirm(`Deseja alterar o plano ${title} ?`);

        if (!confirmation) {
          toast.warn('Alteração do plano cancelada!');
          return;
        }

        const response = await api.put(`plans/${id}`, {
          title,
          duration,
          price,
        });

        if (response.status === 200) {
          toast.success('Alteração do plano realizada com sucesso!');
        } else {
          toast.error(response.data.error);
        }
      }
    } catch (err) {
      toast.error(`Ocorreu um erro no Gerenciamento de Planos`);
    }
  }

  const handlePrice = values => {
    const priced = values.floatValue;
    setPrice(priced);
  };

  return (
    <Container>
      <Content>
        <h1>{titleForm}</h1>
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
          <div>
            <div>
              <label htmlFor="duration">DURAÇÃO (em meses)</label>
              <Input
                name="duration"
                type="number"
                placeholder="6"
                onChange={e => setDuration(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">PREÇO MENSAL</label>
              <InputCurrency
                name="price"
                value={price}
                handleChangeValue={values => handlePrice(values)}
              />
            </div>
            <div>
              <label htmlFor="priceTotal">PREÇO TOTAL</label>
              <Input
                name="priceTotal"
                value={priceTotal}
                type="text"
                disabled
              />
            </div>
          </div>
        </Form>
      </ContentForm>
    </Container>
  );
}
