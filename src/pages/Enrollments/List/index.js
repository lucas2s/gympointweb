import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd, MdCheckCircle, MdNotInterested } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { confirmAlert } from 'react-confirm-alert';

import Pagination from '~/components/Pagination';

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
} from './styles';

const timeSP = 'America/Sao_Paulo';

export default function ListEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [page = 1, setPage] = useState();
  const [loading = false, setLoading] = useState();

  const loadEnrollments = useCallback(() => {
    async function load() {
      try {
        setLoading(true);
        const response = await api.get('enrollments', {
          params: {
            page,
          },
        });

        setEnrollments(
          response.data.enrollments.map(enrollment => ({
            ...enrollment,
            startDate: format(
              zonedTimeToUtc(parseISO(enrollment.start_date), timeSP),
              "dd 'de' MMMMMMM 'de' yyyy",
              {
                locale: pt,
              }
            ),
            endDate: format(
              parseISO(enrollment.end_date),
              "dd 'de' MMMMMMM 'de' yyyy",
              {
                locale: pt,
              }
            ),
          }))
        );

        setLoading(false);
      } catch (err) {
        setEnrollments([]);
        setLoading(false);
      }
    }
    load();
  }, [page]);

  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments, page]);

  async function handleEdit(enrollEdit) {
    if (enrollEdit.active) {
      toast.error('Matricula ativa, não pode ser editada');
    } else {
      history.push(`/enrollments/update/${enrollEdit.id}`);
    }
  }

  async function deleteEnrollment(enrollDelete) {
    try {
      const response = await api.delete(`enrollments/${enrollDelete.id}`);
      if (response.status !== 200) {
        toast.warn('Não foi possível excluir a matrícula!');
      } else {
        toast.success('Matrícula excluida com sucesso!');
        if (enrollments.length < 10) {
          setEnrollments(
            enrollments.filter(
              enroomentMap => enroomentMap.id !== enrollDelete.id
            )
          );
        } else {
          loadEnrollments();
        }
      }
    } catch (err) {
      toast.error('Erro para excluir a matrícula.');
    }
  }

  function handleDelete(enrollDelete) {
    if (enrollDelete.active) {
      toast.error('Matricula ativa, não pode ser excluída');
      return;
    }

    confirmAlert({
      title: 'Exclusão',
      message: 'Deseja excluir a matricula?',
      buttons: [
        {
          label: 'Apagar',
          onClick: () => {
            deleteEnrollment(enrollDelete.id);
          },
        },
        {
          label: 'Cancelar',
          onClick: () => toast.warn('Exclusão Cancelada!'),
        },
      ],
    });
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
            <h1>Carregando matriculas...</h1>
          </Row>
        ) : enrollments.length <= 0 ? (
          <Row>
            <h1>Não foi encontrado nenhuma matricula</h1>
          </Row>
        ) : (
          <Table>
            <thead>
              <tr>
                <th className="colLeft">
                  <strong>ALUNO</strong>
                </th>
                <th>
                  <strong>PLANO</strong>
                </th>
                <th>
                  <strong>INICIO</strong>
                </th>
                <th>
                  <strong>TERMINO</strong>
                </th>
                <th>
                  <strong>ATIVA</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map(item => (
                <tr key={item.id}>
                  <td className="colLeft">
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
                    <ButtonDelete
                      type="button"
                      onClick={() => handleDelete(item)}
                    >
                      apagar
                    </ButtonDelete>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={enrollments} />
    </Container>
  );
}
