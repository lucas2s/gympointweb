/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Input, Form, useField } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';

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
  birth_date: Yup.date('Data inválida')
    .required('O peso é obrigatória')
    .typeError('Data de nascimento é obrigatória'),
});

export default function StoreUpdate({ location }) {
  const { title } = location.state;
  const { id } = useParams();

  const ref = useRef(null);
  const [student = {}, setStudent] = useState({});
  const { fieldName, registerField } = useField('birth_date');
  const [birth_date, setBirthDate] = useState();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]);

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

  async function handleSubmit({ name, email, weight, height }) {
    console.tron.log('entrei');
    const response = await api.post('students', {
      name,
      email,
      weight,
      height,
      birth_date,
    });

    console.tron.log(response.data);
  }

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
          <BtnSalvar type="submit" form="students">
            SALVAR
          </BtnSalvar>
        </div>
      </Content>
      <ContentForm>
        <Form
          initialData={student}
          schema={schema}
          onSubmit={handleSubmit}
          id="students"
        >
          <p>NOME COMPLETO</p>
          <Input name="name" type="text" placeholder="Nome Aluno" />
          <p>ENDEREÇO DE E-MAIL</p>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <div className="myContainer">
            <div>
              <p>DATA NASCIMENTO</p>
            </div>
            <div>
              <p>PESO (em kg)</p>
            </div>
            <div className="myheight">
              <p>ALTURA</p>
            </div>
          </div>
          <div className="myContainer">
            <div>
              <ReactDatePicker
                className="myDatePicker"
                name="birthDate"
                dateFormat="dd/MM/yyyy"
                locale={pt}
                selected={birth_date}
                onChange={date => setBirthDate(date)}
                placeholderText="dd/mm/yyyy"
                ref={ref}
              />
            </div>
            <div>
              <Input
                name="weight"
                step="0.1"
                type="text"
                placeholder="83.4kg"
              />
            </div>
            <div className="myheight">
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
