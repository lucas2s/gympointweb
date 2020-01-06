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
  ButtonEdit,
  ButtonDelete,
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
            <thead>
              <tr>
                <th><strong>ALUNO</strong></th>
                <th><strong>PLANO</strong></th>
                <th><strong>INICIO</strong></th>
                <th><strong>TERMINO</strong></th>
                <th><strong>ATIVA</strong></th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length > 0 ? (
                enrollments.map(item => (
                  <tr key={item.id}>
                    <td>
                      <p>{item.student.name}</p>
                    </td>
                    <td>
                      <p>{item.plan.title}</p>
                    </td>
                    <td>
                      <p>{item.startDate}</p>
                    </td>
                    <td>
                      <p>{item.endDate}</p>
                    </td>
                    <td>
                      {item.active && !item.canceled ? (
                        <MdCheckCircle size={23} color="#42cb59" />
                      ) : (
                        <MdNotInterested size={23} color="#c4c4c4" />
                      )}
                    </td>
                    <td>
                      <ButtonEdit type="button" onClick={() => handleEdit(item)}>
                        editar
                      </ButtonEdit>
                    </td>
                    <td>
                      <ButtonDelete type="button" onClick={() => handleDelete(item)}>
                        apagar
                      </ButtonDelete>
                    </td>
                  </tr>
                ))
              ) : (
              <tr>
                <h1>Não foi encontrado nenhuma matricula</h1>
              </tr>
              )}
            </tbody>
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
