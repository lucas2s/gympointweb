/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Content,
  ContentTable,
  Table,
  Row,
  TdName,
  TdEmail,
  TdAge,
  TdEdit,
  TdDelete,
  Page,
} from './styles';

export default function ListStudents() {
  const [students, setStudents] = useState([]);
  const [student = '', setStudent] = useState();
  const [page = 1, setPage] = useState();

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get('students', {
          params: {
            student,
            page,
          },
        });

        setStudents(response.data.students);
      } catch (err) {
        setStudents([]);
      }
    }
    loadStudents();
  }, [page, student]);

  async function handlePage(rel) {
    await (rel === 'next' ? setPage(page + 1) : setPage(page - 1));
  }

  async function handleSearch({ studentSearch }) {
    await setStudent(studentSearch);
  }

  async function handleDelete(studentDelete) {
    try {
      const deleted = confirm(`Deseja apagar o aluno ${studentDelete.name} ?`);
      if (deleted === true) {
        const response = await api.delete(`students/${studentDelete.id}`);
        if (response.status !== 200) {
          toast.warn('Não foi possível apagar o aluno!');
        } else {
          toast.success('Aluno apagado com sucesso!');
          setStudents(
            students.filter(studentMap => studentMap.id !== studentDelete.id)
          );
        }
      } else {
        toast.warn('Deleção Cancelada!');
      }
    } catch (err) {
      toast.error('Erro para apagar o aluno.');
    }
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando alunos</h1>
        <div>
          <button
            type="button"
            onClick={() => {
              history.push('/students/store', { title: 'Cadastro de aluno' });
            }}
          >
            CADASTRAR
          </button>
          <Form onSubmit={handleSearch}>
            <Input name="studentSearch" placeholder="Buscar aluno" />
          </Form>
        </div>
      </Content>

      <ContentTable>
        <Table>
          <Row>
            <TdName>
              <strong>NOME</strong>
            </TdName>
            <TdEmail>
              <strong>EMAIL</strong>
            </TdEmail>
            <TdAge>
              <strong>IDADE</strong>
            </TdAge>
          </Row>
          {students.length > 0 ? (
            students.map(item => (
              <Row key={item.id} className="border_bottom">
                <TdName>
                  <p>{item.name}</p>
                </TdName>
                <TdEmail>
                  <p>{item.email}</p>
                </TdEmail>
                <TdAge>
                  <p>{item.age}</p>
                </TdAge>
                <TdEdit>
                  <button
                    type="button"
                    onClick={() => {
                      history.push(`/students/update/${item.id}`, {
                        title: 'Edição de aluno',
                      });
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
              <h1>Não foi encontrado nenhum aluno</h1>
            </Row>
          )}
        </Table>
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
          disabled={students.length < 10}
        >
          Próxima Página
        </button>
      </Page>
    </Container>
  );
}
