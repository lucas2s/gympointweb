import React from 'react';
import { render } from '@testing-library/react';

import StudentsList from '~/pages/Students/List';

describe('Students List', () => {
  it('Permitir listar Students', () => {
    const { getByText, getByTestId, debug } = render(<StudentsList />);

    debug();

    expect(getByTestId('title-page')).toContainElement(
      getByText('Gerenciando alunos')
    );
  });
});
