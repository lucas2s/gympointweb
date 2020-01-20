import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { addMonths, parseISO, format } from 'date-fns';
import { Input, Form, Select } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import { confirmAlert } from 'react-confirm-alert';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

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
import { formatPrice } from '~/util/format';

const schema = Yup.object().shape({});

export default function StoreUpdate() {
  const { id } = useParams();

  const [titleForm, setTitle] = useState();
  const [plans, setPlans] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [plan, setPlan] = useState();
  const [planId, setPlanId] = useState();
  const [priceTotal, setPriceTotal] = useState();
  const [endDate, setEndDate] = useState();
  const [students, setStudents] = useState();
  const [student, setStudent] = useState();

  const loadOptions = async (inputValue, callback) => {
    try {
      const response = await api.get('students', {
        params: {
          student: inputValue,
        },
      });

      if (response.status === 200) {
        setStudents(
          response.data.students.map(studentMap => ({
            value: studentMap.id,
            label: studentMap.name,
          }))
        );
        callback(students);
      } else {
        setStudents();
        callback();
      }
    } catch (err) {
      setStudents();
      callback();
    }
  };

  function handleAluno(selectedOption) {
    setStudent(selectedOption);
  }

  useMemo(() => {
    function calculaPrice() {
      if (plan) {
        setPriceTotal(formatPrice(plan.price * plan.duration));
      } else {
        setPriceTotal(formatPrice(0));
      }
    }
    calculaPrice();
  }, [plan]);

  useMemo(() => {
    function calculaPrice() {
      if (plan && startDate) {
        setEndDate(format(addMonths(startDate, plan.duration), 'dd/MM/yyyy'));
      } else {
        setEndDate(format(new Date(), 'dd/MM/yyyy'));
      }
    }
    calculaPrice();
  }, [startDate, plan]);

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await api.get('plans');
        setPlans(response.data.plans);

        if (id) {
          setTitle('Edição de matrícula');
          const enrollment = await api.get(`enrollments/${id}`);
          const { start_date } = enrollment.data.enrollment;
          const planEnroll = enrollment.data.enrollment.plan;
          const studentEnroll = enrollment.data.enrollment.student;
          setStartDate(parseISO(start_date));

          setPlan(planEnroll);
          setPlanId(planEnroll.id);

          setStudent({
            value: studentEnroll.id,
            label: studentEnroll.name,
          });
        } else {
          setTitle('Cadastro de matrícula');
        }
      } catch (err) {
        setTitle('Cadastro de matrícula');
      }
    }
    loadPlans();
  }, [id]);

  function handleSelect(e) {
    const enrollId = e.target.value;
    setPlan(plans.find(item => String(item.id) === String(enrollId)));
    setPlanId(id);
  }

  async function storeEnrollment() {
    try {
      const response = await api.post('enrollments', {
        student_id: student.value,
        plan_id: plan.id,
        startDate,
      });

      if (response.status === 200) {
        toast.success('Matricula realizada com sucesso!');
        history.push('/enrollments/list');
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error(`Ocorreu um erro no Gerenciamento de Matriculas`);
    }
  }

  async function updateEnrollment() {
    try {
      const response = await api.put(`enrollments/${id}`, {
        student_id: student.value,
        plan_id: plan.id,
        startDate,
      });

      if (response.status === 200) {
        toast.success('Alteração da matrícula realizada com sucesso!');
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error(`Ocorreu um erro no Gerenciamento de Matriculas`);
    }
  }

  function handleSubmit() {
    if (id) {
      confirmAlert({
        title: 'Alteração',
        message: `Deseja alterar a matrícula do aluno ${student.label} ?`,
        buttons: [
          {
            label: 'Alterar',
            onClick: () => {
              updateEnrollment();
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
        message: `Deseja realizar a matricula ${student.label} ?`,
        buttons: [
          {
            label: 'Incluir',
            onClick: () => {
              storeEnrollment();
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
        <Form schema={schema} id="enrollments" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="student">ALUNO</label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              value={student}
              defaultOptions
              onChange={handleAluno}
              placeholder="Buscar Aluno"
              className="mySelectAsync"
            />
          </div>
          <aside className="myContainer">
            <div>
              <label htmlFor="plans">PLANO</label>
            </div>
            <div className="myDiv">
              <label htmlFor="startDate">DATA DE INÍCIO</label>
            </div>
            <div className="myDiv">
              <label htmlFor="endDate">DATA DE TÉRMINO</label>
            </div>
            <div className="myDiv">
              <label htmlFor="priceTotal">VALOR FINAL</label>
            </div>
          </aside>
          <div className="myContainer">
            <div>
              <Select
                className="mySelect"
                name="palnId"
                options={plans}
                value={planId}
                onChange={handleSelect}
                placeholder="Selecione um Plano"
              />
            </div>
            <div className="myDiv">
              <DatePicker
                name="startDate"
                selected={startDate}
                onChange={date => setStartDate(date)}
                minDate={new Date()}
                className="myDatePicker myInput"
              />
            </div>
            <div className="myDiv">
              <Input
                className="myInput"
                name="endDate"
                value={endDate}
                type="text"
                disabled
              />
            </div>
            <div className="myDiv">
              <Input
                className="myInput"
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
