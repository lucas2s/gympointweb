import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import StudentsList from '~/pages/Students/List';

describe('Students List', () => {
  it('Permitir listar Students', async () => {
    const { getByTestId, queryByTestId, getAllByTestId } = render(
      <StudentsList />
    );
    expect(getByTestId('loading')).toHaveTextContent('Carregando Alunos...');
    await waitForElement(() => getByTestId('title-page'));
    expect(queryByTestId('loading')).toBeFalsy();
    expect(getByTestId('title-page')).toHaveTextContent('Gerenciando alunos');

    expect(getAllByTestId('column-aluno').length).toBeGreaterThan(0);
  });
});
