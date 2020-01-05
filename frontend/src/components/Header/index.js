import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Notifications from '~/components/Notification';
// import logo from '~/assets/logo.png';
import logo from '~/assets/logo.svg';
import { Container, Content, Profile } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleLogOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <span>GYMPOINT</span>
          <Link to="/students/list">ALUNOS</Link>
          <Link to="/plans/list">PLANOS</Link>
          <Link to="/registrations/list">MATRÍCULAS</Link>
          <Link to="/helporders">PEDIDOS DE AUXÍLIO</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">MEU PERFIL</Link>
              <Link to="/" onClick={handleLogOut}>
                SAIR
              </Link>
            </div>
            <img
              src={
                profile.avatar_url ||
                'https://api.adorable.io/avatars/285/abott@adorable.png'
              }
              alt=""
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
