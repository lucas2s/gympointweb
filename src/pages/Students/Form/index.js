/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { Input, Form } from '@rocketseat/unform';
import { parseISO } from 'date-fns';

import * as Yup from 'yup';
import DatePicker from '~/components/DataPicker';

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

  const [student = {}, setStudent] = useState({});
  const [birth_date, setBirthDate] = useState(new Date());
  const [title, setTitle] = useState();

  useEffect(() => {
    async function loadStudent() {
      try {
        if (id) {
          setTitle('Edição de aluno');
          const response = await api.get(`students/${id}`);

          const DateFormated = parseISO(response.data.student.birth_date);

          setStudent(response.data.student);
          setBirthDate(DateFormated);
        } else {
          setTitle('Cadastro de aluno');
        }
      } catch (err) {
        setStudent({});
      }
    }
    loadStudent();
  }, []);

  async function handleSubmit({ name, email, weight, height }, { resetForm }) {
    try {
      if (!id) {
        const confirmation = confirm(`Deseja incluir o aluno ${name} ?`);

        if (!confirmation) {
          toast.warn('Inclusão do aluno cancelada!');
          return;
        }

        const response = await api.post('students', {
          name,
          email,
          weight,
          height,
          birth_date,
        });

        if (response.status === 200) {
          resetForm();
          setBirthDate();
          setStudent({});
          toast.success('Inclusão do aluno realizada com sucesso!');
        } else {
          toast.error(response.data.error);
        }
      } else {
        const confirmation = confirm(`Deseja alterar o aluno ${name} ?`);

        if (!confirmation) {
          toast.warn('Alteração do aluno cancelada!');
          return;
        }

        const response = await api.put(`students/${id}`, {
          name,
          email,
          weight,
          height,
          birth_date,
        });

        if (response.status === 200) {
          toast.success('Alteração do aluno realizada com sucesso!');
        } else {
          toast.error(response.data.error);
        }
      }
    } catch (err) {
      toast.error(`Ocorreu um erro no Gerenciamento de Alunos`);
    }
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
            <MdArrowBack size={22} color="#FFF" />
            VOLTAR
          </BtnVoltar>
          <BtnSalvar type="submit" form="students">
            <MdSave size={20} color="#FFF" />
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
          <label htmlFor="name">NOME COMPLETO</label>
          <Input name="name" type="text" placeholder="Nome Aluno" />
          <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <aside className="myContainer">
            <div>
              <label htmlFor="birthDate">DATA NASCIMENTO</label>
            </div>
            <div>
              <label htmlFor="weight">PESO (em kg)</label>
            </div>
            <div className="myheight">
              <label htmlFor="height">ALTURA</label>
            </div>
          </aside>
          <div className="myContainer">
            <div>
              <DatePicker
                name="birth_date"
                selected={birth_date}
                onChange={date => setBirthDate(date)}
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
            <div className="myDiv">
              <Input
                name="weight"
                step="0.1"
                type="number"
                placeholder="83.4"
              />
            </div>
            <div className="myDiv">
              <Input
                name="height"
                step="0.01"
                type="number"
                placeholder="1.88"
              />
            </div>
          </div>
        </Form>
      </ContentForm>
    </Container>
  );
}
