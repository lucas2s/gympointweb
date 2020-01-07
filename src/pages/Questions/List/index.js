/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  Container,
  Content,
  ContentTable,
  Table,
  Row,
  TdAluno,
  TdResp,
  Page,
  Modal,
  ModalContent,
} from './styles';

export default function ListStudents() {
  const [questions, setQuestions] = useState([]);
  const [page = 1, setPage] = useState();
  const [loading = false, setLoading] = useState();
  const [question, setQuestion] = useState(null);
  const [modal, setModal] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    async function loadHelpOrders() {
      try {
        setLoading(true);
        const response = await api.get('help-orders', {
          params: {
            page,
          },
        });

        setQuestions(response.data.helpOrders);
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

  async function handleAnswer(item) {
    setModal(true);
    setQuestion(item);
  }

  async function handleSubmit() {
    try {
      if (!answer) {
        toast.error('Resposta não foi informada.');
        return;
      }
      const confirmation = confirm(`Deseja enviar a resposta?`);

      if (!confirmation) {
        toast.warn('Envio da resposta cancelada');
        return;
      }

      const response = await api.post(`help-orders/${question.id}/answers`, {
        answer,
      });

      if (response.status === 200) {
        setQuestions(
          questions.filter(questionMap => questionMap.id !== question.id)
        );
        setAnswer(null);
        setModal(null);
        toast.success('Resposta enviada com sucesso!');
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error(`Ocorreu um erro para enviar a resposta`);
    }
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
                    <p>{item.student.name}</p>
                  </TdAluno>
                  <TdResp>
                    <button type="button" onClick={() => handleAnswer(item)}>
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
          disabled={questions.length < 10}
        >
          Próxima Página
        </button>
      </Page>
      {modal && (
        <Modal>
          <ModalContent>
            <Form onSubmit={handleSubmit} id="answer">
              <strong>PERGUNTA DO ALUNO</strong>
              <p>{question.question}</p>
              <strong>SUA RESPOSTA</strong>
              <textarea
                name="answer"
                form="answer"
                onChange={e => setAnswer(e.target.value)}
                placeholder="Escreva aqui sua resposta"
              />
              <button type="submit">Responder Aluno</button>
              <button
                className="closeModal"
                type="button"
                onClick={() => setModal(null)}
              >
                Fechar
              </button>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
