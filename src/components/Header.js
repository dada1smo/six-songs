import { useNavigate } from 'react-router-dom';

import {
  ContainerHeaderAppBar,
  HeaderAppBar,
  LogoHeaderAppBar,
} from '../styles/Header';
import addIcon from '../images/add-icon.svg';
import { PrimaryButton } from '../styles/Button';
import { Logo } from '../styles/Logo';

export default function Header() {
  const router = useNavigate();

  const goToAddMix = (e) => {
    router('/');
  };

  return (
    <HeaderAppBar>
      <ContainerHeaderAppBar>
        <LogoHeaderAppBar href="/">
          <Logo height={32} />
        </LogoHeaderAppBar>

        <PrimaryButton type="button" onClick={goToAddMix}>
          <img src={addIcon} alt="" />
          Criar novo mix
        </PrimaryButton>
      </ContainerHeaderAppBar>
    </HeaderAppBar>
  );
}
