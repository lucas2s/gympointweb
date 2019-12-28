/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

import {
  Container,
  Content,
  ContentTable,
  Table,
  Row,
  TdTitle,
  TdDuration,
  TdValue,
  TdEdit,
  TdDelete,
  Page,
} from './styles';

export default function ListPlans() {
  const [plans, setPlans] = useState([]);
  const [page = 1, setPage] = useState();
  const [loading = false, setLoading] = useState();

  useEffect(() => {
    async function loadPlans() {
      try {
        setLoading(true);
        const response = await api.get('plans', {
          params: {
            page,
          },
        });

        const data = response.data.plans.map(plan => ({
          ...plan,
          durationFormated:
            plan.duration === 1
              ? `${plan.duration} mês`
              : `${plan.duration} meses`,
          priceFormatted: formatPrice(plan.price),
        }));

        setPlans(data);
        setLoading(false);
      } catch (err) {
        setPlans([]);
        setLoading(false);
      }
    }
    loadPlans();
  }, [page]);

  async function handlePage(rel) {
    await (rel === 'next' ? setPage(page + 1) : setPage(page - 1));
  }

  async function handleDelete(planDelete) {
    try {
      const deleted = confirm(`Deseja apagar o plano ${planDelete.title} ?`);
      if (deleted) {
        const response = await api.delete(`plans/${planDelete.id}`);
        if (response.status !== 200) {
          toast.warn('Não foi possível apagar o plano!');
        } else {
          toast.success('Plano apagado com sucesso!');
          setPlans(plans.filter(planMap => planMap.id !== planDelete.id));
        }
      } else {
        toast.warn('Deleção Cancelada!');
      }
    } catch (err) {
      toast.error('Erro para apagar o plano.');
    }
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando planos</h1>
        <div>
          <button
            type="button"
            onClick={() => {
              history.push('/plans/store');
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
            <h1>Carregando Planos...</h1>
          </Row>
        ) : (
          <Table>
            <Row>
              <TdTitle>
                <strong>TÍTULO</strong>
              </TdTitle>
              <TdDuration>
                <strong>DURAÇÃO</strong>
              </TdDuration>
              <TdValue>
                <strong>VALOR p/ MÊS</strong>
              </TdValue>
            </Row>
            {plans.length > 0 ? (
              plans.map(item => (
                <Row key={item.id}>
                  <TdTitle>
                    <p>{item.title}</p>
                  </TdTitle>
                  <TdDuration>
                    <p>{item.durationFormated}</p>
                  </TdDuration>
                  <TdValue>
                    <p>{item.priceFormatted}</p>
                  </TdValue>
                  <TdEdit>
                    <button
                      type="button"
                      onClick={() => {
                        history.push(`/plans/update/${item.id}`);
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
                <h1>Não foi encontrado nenhum plano</h1>
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
          disabled={plans.length < 10}
        >
          Próxima Página
        </button>
      </Page>
    </Container>
  );
}
