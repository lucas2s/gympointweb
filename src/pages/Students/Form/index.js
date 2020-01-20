import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { Input, Form } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import { confirmAlert } from 'react-confirm-alert';

import * as Yup from 'yup';
import InputFormatNumber from '~/components/InputFormatNumber';
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
    .min(40, 'Peso deve ser maior que 40kg')
    .required('O peso é obrigatório')
    .typeError('O peso é obrigatório'),
  height: Yup.number('Valor deve ser numérico')
    .positive('Insira uma altura válido')
    .min(1, 'Altura deve ser maior que 1 metro')
    .max(2.4, 'Altura deve ser menor que 2.40 metros')
    .required('A altura é obrigatória')
    .typeError('A altura é obrigatória'),
  birth_date: Yup.date()
    .required('Data nasciemtno obrigatória')
    .typeError('Data de nascimento inválida'),
});

export default function StoreUpdate() {
  const { id } = useParams();

  const [student = {}, setStudent] = useState({});
  const [birth_date, setBirthDate] = useState();
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
  }, [id]);

  async function updateStudent(name, email, weight, height) {
    try {
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
    } catch (err) {
      toast.error(`Ocorreu um erro no Gerenciamento de Alunos`);
    }
  }

  async function storeStudent(name, email, weight, height, resetForm) {
    try {
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
    } catch (err) {
      toast.error(`Ocorreu um erro no Gerenciamento de Alunos`);
    }
  }

  function handleSubmit({ name, email, weight, height }, { resetForm }) {
    if (id) {
      confirmAlert({
        title: 'Alteração',
        message: `Deseja alterar o aluno ${name} ?`,
        buttons: [
          {
            label: 'Alterar',
            onClick: () => {
              updateStudent(name, email, weight, height);
            },
          },
          {
            label: 'Cancelar',
            onClick: () => toast.warn('Alteração Cancelada!'),
          },
        ],
      });
    } else {
      confirmAlert({
        title: 'Inclusão',
        message: `Deseja incluir o aluno ${name} ?`,
        buttons: [
          {
            label: 'Incluir',
            onClick: () => {
              storeStudent(name, email, weight, height, resetForm);
            },
          },
          {
            label: 'Cancelar',
            onClick: () => toast.warn('Inclusão Cancelada!'),
          },
        ],
      });
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
                placeholderText="Data Nascimento"
              />
            </div>
            <div className="myDiv">
              <InputFormatNumber
                name="weight"
                placeholder="83.4kg"
                decimalSeparator="."
                decimalScale={1}
                fixedDecimalScale
                suffix="kg"
              />
            </div>
            <div className="myDiv">
              <InputFormatNumber
                name="height"
                placeholder="1.88m"
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                suffix="m"
              />
            </div>
          </div>
        </Form>
      </ContentForm>
    </Container>
  );
}
