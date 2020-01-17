/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useEffect, useState, useCallback } from 'react';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import api from '~/services/api';
import history from '~/services/history';

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

export default function ListStudents() {
  const [students, setStudents] = useState([]);
  const [student = '', setStudent] = useState();
  const [page = 1, setPage] = useState();
  const [loading = false, setLoading] = useState();

  const loadStudents = useCallback(() => {
    async function load() {
      try {
        setLoading(true);
        const response = await api.get('students', {
          params: {
            student,
            page,
          },
        });

        setStudents(response.data.students);
        setLoading(false);
      } catch (err) {
        setStudents([]);
        setLoading(false);
      }
    }
    load();
  }, [page, student]);

  useEffect(() => {
    loadStudents();
  }, [page, student, loadStudents]);

  async function handlePage(rel) {
    await (rel === 'next' ? setPage(page + 1) : setPage(page - 1));
  }

  async function handleSearch({ studentSearch }) {
    await setStudent(studentSearch);
  }

  async function handleDelete(studentDelete) {
    try {
      const deleted = confirm(`Deseja apagar o aluno ${studentDelete.name} ?`);
      if (deleted) {
        const response = await api.delete(`students/${studentDelete.id}`);
        if (response.status !== 200) {
          toast.warn('Não foi possível apagar o aluno!');
        } else {
          toast.success('Aluno apagado com sucesso!');
          if (students.length < 10) {
            setStudents(
              students.filter(studentMap => studentMap.id !== studentDelete.id)
            );
          } else {
            loadStudents();
          }
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
              history.push('/students/store');
            }}
          >
            <MdAdd size={22} color="#FFF" />
            CADASTRAR
          </button>
          <Form onSubmit={handleSearch}>
            <span>
              <MdSearch size={22} color="#999999" />
            </span>
            <Input name="studentSearch" placeholder="Buscar aluno" />
          </Form>
        </div>
      </Content>
      <ContentTable>
        {loading ? (
          <Row>
            <h1>Carregando Alunos...</h1>
          </Row>
        ) : students.length <= 0 ? (
          <Row>
            <h1>Não foi encontrado nenhum aluno</h1>
          </Row>
        ) : (
          <Table>
            <thead>
              <tr>
                <th className="colLeft">
                  <strong>ALUNO</strong>
                </th>
                <th className="colLeft">
                  <strong>EMAIL</strong>
                </th>
                <th>
                  <strong>IDADE</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map(item => (
                <tr key={item.id}>
                  <td className="colLeft">
                    <p>{item.name}</p>
                  </td>
                  <td className="colLeft">
                    <p>{item.email}</p>
                  </td>
                  <td>
                    <p>{item.age}</p>
                  </td>
                  <td>
                    <ButtonEdit
                      type="button"
                      onClick={() => {
                        history.push(`/students/update/${item.id}`);
                      }}
                    >
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
      <Page>
        <button
          type="button"
          value="last"
          onClick={() => handlePage('last')}
          disabled={page < 2}
        >
          <AiFillCaretLeft />
        </button>
        <span>{page}</span>
        <button
          type="button"
          value="next"
          onClick={() => handlePage('next')}
          disabled={students.length < 10}
        >
          <AiFillCaretRight />
        </button>
      </Page>
    </Container>
  );
}
