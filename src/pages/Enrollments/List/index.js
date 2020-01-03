/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { MdAdd, MdCheckCircle, MdNotInterested } from 'react-icons/md';
import { toast } from 'react-toastify';
import {format, parseISO} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';

import {
  Container,
  Content,
  ContentTable,
  Table,
  Row,
  TdAluno,
  TdPlano,
  TdData,
  TdAtiva,
  TdEdit,
  TdDelete,
  Page,
} from './styles';

const timeSP = 'America/Sao_Paulo'; 

export default function ListEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [page = 1, setPage] = useState();
  const [loading = false, setLoading] = useState();

  useEffect(() => {
    async function loadEnrollments() {
      try {
        setLoading(true);
        const response = await api.get('enrollments', {
          params: {
            page,
          },
        });

        console.tron.log(response.data.enrollments[0].start_date);
        console.tron.log(response.data.enrollments[0].end_date);

        setEnrollments(response.data.enrollments.map(enrollment => ({
          ...enrollment,
          startDate: format(zonedTimeToUtc(parseISO(enrollment.start_date),timeSP),
            "dd 'de' MMMMMMM 'de' yyyy", {
            locale: pt
          }),
          endDate: format(parseISO(enrollment.end_date),
            "dd 'de' MMMMMMM 'de' yyyy", {
            locale: pt
          })
        })));

        setLoading(false);
      } catch (err) {
        setEnrollments([]);
        setLoading(false);
      }
    }
    loadEnrollments();
  }, [page]);

  async function handleEdit(enrollEdit) {
    if (enrollEdit.active) {
      toast.error("Matricula ativa, não pode ser editada");
    } else {
      history.push(`/enrollments/update/${enrollEdit.id}`);
    }
  }

  async function handleDelete(enrollDelete) {
    try {
      if (enrollDelete.active) {
        toast.error("Matricula ativa, não pode ser excluída");
        return
      }
      const deleted = confirm(`Deseja excluir a matricula?`);
      if (deleted) {
        const response = await api.delete(`enrollments/${enrollDelete.id}`);
        if (response.status !== 200) {
          toast.warn('Não foi possível excluir a matrícula!');
        } else {
          toast.success('Matrícula excluida com sucesso!');
          setEnrollments(
            enrollments.filter(
              enroomentMap => enroomentMap.id !== enrollDelete.id
            )
          );
        }
      } else {
        toast.warn('Exclusão Cancelada!');
      }
    } catch (err) {
      toast.error('Erro para excluir a matrícula.');
    }
  }

  async function handlePage(rel) {
    await (rel === 'next' ? setPage(page + 1) : setPage(page - 1));
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando matrículas</h1>
        <div>
          <button
            type="button"
            onClick={() => {
              history.push('/enrollments/store');
            }}
          >
            <MdAdd size={22} color="#FFF" />
            CADASTRAR
          </button>
        </div>
      </Content>
      <ContentTable>
        {loading ? (
          <Row>
            <h1>Carregando matrículas...</h1>
          </Row>
        ) : (
          <Table>
            <Row>
              <TdAluno>
                <strong>ALUNO</strong>
              </TdAluno>
              <TdPlano>
                <strong>PLANO</strong>
              </TdPlano>
              <TdData>
                <strong>INICIO</strong>
              </TdData>
              <TdData>
                <strong>TERMINO</strong>
              </TdData>
              <TdAtiva>
                <strong>Ativa</strong>
              </TdAtiva>
            </Row>
            {enrollments.length > 0 ? (
              enrollments.map(item => (
                <Row key={item.id}>
                  <TdAluno>
                    <p>{item.student.name}</p>
                  </TdAluno>
                  <TdPlano>
                    <p>{item.plan.title}</p>
                  </TdPlano>
                  <TdData>
                    <p>{item.startDate}</p>
                  </TdData>
                  <TdData>
                    <p>{item.endDate}</p>
                  </TdData>
                  <TdAtiva>
                    {item.active && !item.canceled ? (
                      <MdCheckCircle size={23} color="#42cb59" />
                    ) : (
                      <MdNotInterested size={23} color="#c4c4c4" />
                    )}
                  </TdAtiva>
                  <TdEdit>
                    <button type="button" onClick={() => handleEdit(item)}>
                      editar
                    </button>
                  </TdEdit>
                  <TdDelete>
                    <button type="button" onClick={() => handleDelete(item)}>
                      apagar
                    </button>
                  </TdDelete>
                </Row>
              ))
            ) : (
              <Row>
                <h1>Não foi encontrado nenhuma matricula</h1>
              </Row>
            )}
          </Table>
        )}
      </ContentTable>
      <Page>
        <button
          type="button"
          value="last"
          onClick={() => handlePage('last')}
          disabled={page < 2}
        >
          Página Anterior
        </button>
        <span>{page}</span>
        <button
          type="button"
          value="next"
          onClick={() => handlePage('next')}
          disabled={enrollments.length < 10}
        >
          Próxima Página
        </button>
      </Page>
    </Container>
  );
}
