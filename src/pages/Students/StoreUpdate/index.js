/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Input, Form } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DatePicker from 'react-datepicker';

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
    .required('O peso é obrigatória'),
  height: Yup.number('Valor deve ser numérico')
    .positive('Insira um peso válido')
    .required('O peso é obrigatória'),
  birthDate: Yup.date('Data inválida').required('O peso é obrigatória'),
});

export default function StoreUpdate({ location }) {
  const { title } = location.state;
  const { id } = useParams();

  const [student = {}, setStudent] = useState({});
  const [birthDate, setBirthDate] = useState();

  useEffect(() => {
    async function loadStudent() {
      try {
        if (id) {
          const response = await api.get(`students/${id}`);

          const DateFormated = parseISO(response.data.student.birth_date);

          setStudent(response.data.student);
          setBirthDate(DateFormated);
        }
      } catch (err) {
        setStudent({});
      }
    }
    loadStudent();
  }, []);

  useEffect(() => {
    function loadStudents() {}
    loadStudents();
  }, [student]);

  return (
    <Container>
      <Content>
        <h1>{title}</h1>
        <div>
          <BtnVoltar
            type="button"
            onClick={() => {
              history.push('/students/list');
            }}
          >
            VOLTAR
          </BtnVoltar>
          <BtnSalvar type="button" onClick={() => {}}>
            SALVAR
          </BtnSalvar>
        </div>
      </Content>
      <ContentForm>
        <Form initialData={student} schema={schema}>
          <p>NOME COMPLETO</p>
          <Input name="name" type="text" placeholder="Nome Aluno" />
          <p>ENDEREÇO DE E-MAIL</p>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <div>
            <div>
              <p>DATA NASCIMENTO</p>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={birthDate}
                locale={pt}
                onChange={date => setBirthDate(date)}
                placeholderText="Data de nascimento: dd/mm/yyyy"
              />
            </div>
            <div>
              <p>PESO (em kg)</p>
              <Input
                name="weight"
                step="0.1"
                type="text"
                placeholder="83.4kg"
              />
            </div>
            <div>
              <p>ALTURA</p>
              <Input
                name="height"
                step="0.01"
                type="text"
                placeholder="1.88m"
              />
            </div>
          </div>
        </Form>
      </ContentForm>
    </Container>
  );
}

StoreUpdate.propTypes = {
  title: PropTypes.string,
  location: PropTypes.element.isRequired,
};

StoreUpdate.defaultProps = {
  title: 'Cadastro de aluno',
};
