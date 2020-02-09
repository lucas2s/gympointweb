import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';

import { signOut } from '~/store/modules/auth/actions';
import { Container, Content } from './styles';
import logo from '~/assets/images/logoheader.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState('navbar');

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  useLayoutEffect(() => {
    function menuSize() {
      if (window.innerWidth > 740) {
        setMenuOpen('navbar');
      }
    }
    window.addEventListener('resize', menuSize);
    menuSize();
  }, []);

  function handleMenu() {
    if (menuOpen === 'navbar') {
      setMenuOpen('navbar open');
    } else {
      setMenuOpen('navbar');
    }
  }

  function handleCloseMenu() {
    if (window.innerWidth < 740) {
      setMenuOpen('navbar');
    }
  }

  const { name } = useSelector(state => state.user.user);

  return (
    <Container>
      <Content>
        <Link to="/">
          <img src={logo} alt="GymPoint" />
        </Link>
        <button type="button" className="menu" onClick={() => handleMenu()}>
          <IoMdMenu size={20} color="#ee4d64" />
        </button>
        <div className={menuOpen}>
          <nav>
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
                  onClick={handleCloseMenu}
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
                  onClick={handleCloseMenu}
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
                  onClick={handleCloseMenu}
                >
                  MATRÍCULAS
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="chosen"
                  to="/questions/list"
                  onClick={handleCloseMenu}
                >
                  PEDIDOS DE AUXÍLIO
                </NavLink>
              </li>
            </ul>
          </nav>
          <aside>
            <strong>{name}</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </aside>
        </div>
      </Content>
    </Container>
  );
}
