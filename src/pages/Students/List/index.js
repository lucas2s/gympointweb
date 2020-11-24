import React, { useEffect, useState, useCallback } from 'react';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';

import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';

import {
  Container,
  Content,
  ContentTable,
  Table,
  Row,
  ButtonEdit,
  ButtonDelete,
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

        setStudents(response.data);
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

  async function handleSearch({ studentSearch }) {
    await setStudent(studentSearch);
  }

  async function deleteStudent(id) {
    try {
      const response = await api.delete(`students/${id}`);
      if (response.status !== 200) {
        toast.warn('Não foi possível apagar o aluno!');
      } else {
        toast.success('Aluno apagado com sucesso!');
        if (students.length < 10) {
          setStudents(students.filter(studentMap => studentMap.id !== id));
        } else {
          loadStudents();
        }
      }
    } catch (err) {
      toast.error('Erro para apagar o aluno.');
    }
  }

  function handleDelete(studentDelete) {
    confirmAlert({
      title: 'Exclusão',
      message: `Deseja apagar o aluno ${studentDelete.name} ?`,
      buttons: [
        {
          label: 'Apagar',
          onClick: () => {
            deleteStudent(studentDelete.id);
          },
        },
        {
          label: 'Cancelar',
          onClick: () => toast.warn('Exclusão Cancelada!'),
        },
      ],
    });
  }

  if (loading) {
    return (
      <Row>
        <h1>Carregando Alunos...</h1>
      </Row>
    );
  }

  return (
    <Container>
      <Content>
        <h1 data-testid="title-page">Gerenciando alunos</h1>
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
        {students && (
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
      <Pagination
        page={page}
        setPage={setPage}
        list={students && students.length}
      />
    </Container>
  );
}
