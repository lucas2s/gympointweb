import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';
import { Container, Content } from './styles';
import logo from '~/assets/images/logoheader.png';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  const { name } = useSelector(state => state.user.user);

  return (
    <Container>
      <Content>
        <nav>
          <NavLink to="/">
            <img src={logo} alt="GymPoint" />
          </NavLink>
          <ul>
            <li>
              <NavLink
                activeClassName="chosen"
                to="/students/list"
                isActive={(match, location) => {
                  if (location.pathname.indexOf('/students/') !== -1) {
                    return true;
                  }
                  return false;
                }}
              >
                ALUNOS
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="chosen"
                to="/plans/list"
                isActive={(match, location) => {
                  if (location.pathname.indexOf('/plans/') !== -1) {
                    return true;
                  }
                  return false;
                }}
              >
                PLANOS
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="chosen"
                to="/enrollments/list"
                isActive={(match, location) => {
                  if (location.pathname.indexOf('/enrollments/') !== -1) {
                    return true;
                  }
                  return false;
                }}
              >
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
          <strong>{name}</strong>
          <button type="button" onClick={handleSignOut}>
            sair do sitema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
