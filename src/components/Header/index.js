import React from 'react';
import { NavLink } from 'react-router-dom';

import { Container, Content } from './styles';
import logo from '~/assets/images/logoheader.png';

export default function Header() {
  function handleLogout() {
    console.tron.log('Logout');
  }

  return (
    <Container>
      <Content>
        <nav>
          <NavLink to="/">
            <img src={logo} alt="GymPoint" />
          </NavLink>
          <ul>
            <li>
              <NavLink activeClassName="chosen" to="/students/list">
                ALUNOS
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="chosen" to="/plans/list">
                PLANOS
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="chosen" to="/enrollments/list">
                MATRÍCULAS
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="chosen" to="/questions/list">
                PEDIDOS DE AUXÍLIO
              </NavLink>
            </li>
          </ul>
        </nav>
        <aside>
          <strong>Diego Fernandes</strong>
          <button type="button" onClick={handleLogout}>
            sair do sitema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
