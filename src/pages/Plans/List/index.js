/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';
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

export default function ListPlans() {
  const [plans, setPlans] = useState([]);
  const [page = 1, setPage] = useState();
  const [loading = false, setLoading] = useState();

  const loadPlans = useCallback(() => {
    async function load() {
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
    load();
  }, [page]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans, page]);

  async function handleDelete(planDelete) {
    try {
      const deleted = confirm(`Deseja apagar o plano ${planDelete.title} ?`);
      if (deleted) {
        const response = await api.delete(`plans/${planDelete.id}`);
        if (response.status !== 200) {
          toast.warn('Não foi possível apagar o plano!');
        } else {
          toast.success('Plano apagado com sucesso!');
          if (plans.length < 10) {
            setPlans(plans.filter(planMap => planMap.id !== planDelete.id));
          } else {
            loadPlans();
          }
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
        ) : plans.length <= 0 ? (
          <Row>
            <h1>Não foi encontrado nenhum plano</h1>
          </Row>
        ) : (
          <Table>
            <thead>
              <tr>
                <th className="colLeft">
                  <strong>TÍTULO</strong>
                </th>
                <th>
                  <strong>DURAÇÃO</strong>
                </th>
                <th>
                  <strong>VALOR p/ MÊS</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.map(item => (
                <tr key={item.id}>
                  <td className="colLeft">
                    <p>{item.title}</p>
                  </td>
                  <td>
                    <p>{item.durationFormated}</p>
                  </td>
                  <td>
                    <p>{item.priceFormatted}</p>
                  </td>
                  <td>
                    <ButtonEdit
                      type="button"
                      onClick={() => {
                        history.push(`/plans/update/${item.id}`);
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
      <Pagination page={page} setPage={setPage} list={plans} />
    </Container>
  );
}
