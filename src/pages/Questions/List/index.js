/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Content,
  ContentTable,
  Table,
  Row,
  TdAluno,
  TdResp,
} from './styles';

export default function ListStudents() {
  const [questions, setQuestions] = useState([]);
  const [page = 1, setPage] = useState();
  const [loading = false, setLoading] = useState();

  useEffect(() => {
    async function loadHelpOrders() {
      try {
        setLoading(true);
        const response = await api.get('help-orders', {
          params: {
            page,
          },
        });

        setQuestions(response.data.helpOrdens);
        setLoading(false);
      } catch (err) {
        setQuestions([]);
        setLoading(false);
      }
    }
    loadHelpOrders();
  }, [page]);

  async function handlePage(rel) {
    await (rel === 'next' ? setPage(page + 1) : setPage(page - 1));
  }

  return (
    <Container>
      <Content>
        <h1>Pedidos de auxílio</h1>
      </Content>
      <ContentTable>
        {loading ? (
          <Row>
            <h1>Carregando Pedidos de auxilio...</h1>
          </Row>
        ) : (
          <Table>
            <Row>
              <TdAluno>
                <strong>ALUNO</strong>
              </TdAluno>
            </Row>
            {questions.length > 0 ? (
              questions.map(item => (
                <Row key={item.id}>
                  <TdAluno>
                    <p>{}</p>
                  </TdAluno>
                  <TdResp>
                    <button
                      type="button"
                      onClick={() => {
                        history.push(``);
                      }}
                    >
                      Responder
                    </button>
                  </TdResp>
                </Row>
              ))
            ) : (
              <Row>
                <h1>Não foi encontrado nenhum pedido</h1>
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
          disabled={students.length < 10}
        >
          Próxima Página
        </button>
      </Page>
    </Container>
  );
}
