import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import StuddentEdit from '../Edit';

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
  const [student = ''] = useState();
  const [page = 1, setPage] = useState();

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: {
          student,
          page,
        },
      });

      setStudents(response.data.students);
    }
    loadStudents();
  }, [page, student]);

  async function handlePage(rel) {
    await (rel === 'next' ? setPage(page + 1) : setPage(page - 1));
  }

  function handleEdit(studentEdit) {}

  async function handleDelete(studentDelete) {}

  return (
    <Container>
      <Content>
        <h1>Gerenciando alunos</h1>
        <div>
          <button type="button">CADASTRAR</button>
          <input placeholder="Buscar aluno" />
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
          {students.map(item => (
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
          ))}
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
