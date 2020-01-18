import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import * as Yup from 'yup';
import Pagination from '~/components/Pagination';
import api from '~/services/api';

import {
  Container,
  Content,
  ContentTable,
  Table,
  Row,
  ButtonResp,
  Modal,
  ModalContent,
} from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('Favor informar a resposta'),
});

export default function ListStudents() {
  const [questions, setQuestions] = useState([]);
  const [page = 1, setPage] = useState();
  const [loading = false, setLoading] = useState();
  const [question, setQuestion] = useState(null);
  const [modal, setModal] = useState(null);

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

  async function handleAnswer(item) {
    setModal(true);
    setQuestion(item);
  }

  async function AnswerQuestion(answer) {
    try {
      const response = await api.post(`help-orders/${question.id}/answers`, {
        answer,
      });

      if (response.status === 200) {
        setQuestions(
          questions.filter(questionMap => questionMap.id !== question.id)
        );
        setModal(null);
        toast.success('Resposta enviada com sucesso!');
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error(`Ocorreu um erro para enviar a resposta`);
    }
  }

  function handleSubmit({ answer }) {
    confirmAlert({
      title: 'Resposta',
      message: `Deseja salvar a resposta?`,
      buttons: [
        {
          label: 'Salvar',
          onClick: () => {
            AnswerQuestion(answer);
          },
        },
        {
          label: 'Cancelar',
          onClick: () => toast.warn('Resposta Cancelada!'),
        },
      ],
    });
  }

  return (
    <Container>
      <Content>
        <h1>Pedidos de auxílio</h1>
      </Content>
      <ContentTable>
        {loading ? (
          <Row>
            <h1>Carregando Pedidos de auxílio...</h1>
          </Row>
        ) : questions.length <= 0 ? (
          <Row>
            <h1>Não foi encontrado nenhum Pedido de auxílio</h1>
          </Row>
        ) : (
          <Table>
            <thead>
              <tr>
                <th className="colLeft">
                  <strong>ALUNO</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map(item => (
                <tr key={item.id}>
                  <td className="colLeft">
                    <p>{item.student.name}</p>
                  </td>
                  <td>
                    <ButtonResp
                      type="button"
                      onClick={() => handleAnswer(item)}
                    >
                      Responder
                    </ButtonResp>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={questions} />
      {modal && (
        <Modal>
          <ModalContent>
            <Form onSubmit={handleSubmit} id="answer" schema={schema}>
              <strong>PERGUNTA DO ALUNO</strong>
              <p>{question.question}</p>
              <strong>SUA RESPOSTA</strong>
              <Input
                multiline
                name="answer"
                form="answer"
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
