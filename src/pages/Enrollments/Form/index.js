/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { parseISO } from 'date-fns';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import DatePicker from '~/components/DataPicker';
import Select from '~/components/ReactSlect';

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

const schema = Yup.object().shape({});

export default function StoreUpdate() {
  const { id } = useParams();

  const [titleForm, setTitle] = useState();
  const [enrollment, setEnrollment] = useState({});
  const [plans, setPlans] = useState([]);

  const priceTotal = useMemo(() => formatPrice(10), []);

  const end_date = 0;

  useEffect(() => {
    async function loadEnrollment() {
      try {
        if (id) {
          setTitle('Edição de matrícula');
        } else {
          setTitle('Cadastro de matrícula');
        }
      } catch (err) {
        setTitle('Cadastro de matrícula');
      }
    }
    loadEnrollment();
  }, [id]);

  function handleChange(selectedOption) {
    setEnrollment(
      enrollment.id,
      enrollment.enrollment.start_date,
      enrollment.end_date,
      enrollment.price,
      enrollment.canceled_at,
      enrollment.student,
      (enrollment.plan = plans[selectedOption])
    );
  }

  return (
    <Container>
      <Content>
        <h1>{titleForm}</h1>
        <div>
          <BtnVoltar
            type="button"
            onClick={() => {
              history.push('/enrollments/list');
            }}
          >
            <MdArrowBack size={22} color="#FFF" />
            VOLTAR
          </BtnVoltar>
          <BtnSalvar type="submit" form="enrollments">
            <MdSave size={20} color="#FFF" />
            SALVAR
          </BtnSalvar>
        </div>
      </Content>
      <ContentForm>
        <Form schema={schema} id="enrollments">
          <div>
            <label htmlFor="student">ALUNO</label>
            <Input
              name="aluno"
              type="text"
              placeholder="Informe o ID do aluno"
            />
          </div>
          <aside className="myContainer">
            <div>
              <label htmlFor="plans">PLANO</label>
            </div>
            <div>
              <label htmlFor="startDate">DATA DE INÍCIO</label>
            </div>
            <div>
              <label htmlFor="endDate">DATA DE TÉRMINO</label>
            </div>
            <div>
              <label htmlFor="priceTotal">VALOR FINAL</label>
            </div>
          </aside>
          <div className="myContainer">
            <div>
              <Select
                name="plans"
                options={plans}
                isMulti={false}
                onChange={value => handleChange(value)}
              />
            </div>
            <div>
              <DatePicker name="startDate" />
            </div>
            <div>
              <Input name="endDate" type="text" disabled />
            </div>
            <div>
              <Input name="priceTotal" type="text" disabled />
            </div>
          </div>
        </Form>
      </ContentForm>
    </Container>
  );
}
