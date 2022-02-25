import { useNavigate } from 'react-router-dom';

import {
  ContainerHeaderAppBar,
  HeaderAppBar,
  LogoHeaderAppBar,
} from '../styles/Header';
import addIcon from '../images/add-icon.svg';
import { PrimaryButton } from '../styles/Button';
import { Logo } from '../styles/Logo';
import useWindowSize from '../hooks/use-window-size';
import { ScreenSize } from '../styles/Breakpoints';

export default function Header() {
  const router = useNavigate();
  const size = useWindowSize();

  const goToAddMix = (e) => {
    router('/');
  };

  return (
    <HeaderAppBar>
      <ContainerHeaderAppBar>
        <LogoHeaderAppBar href="/">
          <Logo height={32} />
        </LogoHeaderAppBar>

        {size.width > ScreenSize.tablet && (
          <PrimaryButton type="button" onClick={goToAddMix}>
            <img src={addIcon} alt="" />
            Criar novo mix
          </PrimaryButton>
        )}
      </ContainerHeaderAppBar>
    </HeaderAppBar>
  );
}
