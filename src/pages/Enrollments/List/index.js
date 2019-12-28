/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { MdAdd, MdCheckCircle, MdNotInterested } from 'react-icons/md';
import { toast } from 'react-toastify';

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

        setEnrollments(response.data.enrollments);

        setLoading(false);
      } catch (err) {
        setEnrollments([]);
        setLoading(false);
      }
    }
    loadEnrollments();
  }, [enrollments.length, page]);

  async function handleDelete(enrollelete) {
    try {
      const deleted = confirm(`Deseja excluir a matricula?`);
      if (deleted) {
        const response = await api.delete(`enrollments/${enrollelete.id}`);
        if (response.status !== 200) {
          toast.warn('Não foi possível excluir a matrícula!');
        } else {
          toast.success('Matrícula excluida com sucesso!');
          setEnrollments(
            enrollments.filter(
              enroomentMap => enroomentMap.id !== enrollelete.id
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
                    <p>{item.start_date}</p>
                  </TdData>
                  <TdData>
                    <p>{item.end_date}</p>
                  </TdData>
                  <TdAtiva>
                    {item.active ? (
                      <MdCheckCircle size={23} color="#42cb59" />
                    ) : (
                      <MdNotInterested size={23} color="#c4c4c4" />
                    )}
                  </TdAtiva>
                  <TdEdit>
                    <button
                      type="button"
                      onClick={() => {
                        history.push(`/plans/enrollments/${item.id}`);
                      }}
                    >
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
