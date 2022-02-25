import { useEffect } from 'react';

import { IconButton, PrimaryButton } from '../styles/Button';
import {
  ModalBodyStyled,
  ModalContentStyled,
  ModalTitleStyled,
  ModalStyled,
} from '../styles/Modal';
import removeIcon from '../images/remove-icon.svg';

const styleModalShow = {
  opacity: 1,
  pointerEvents: 'visible',
};
const styleModalContentShow = {
  transform: 'translateY(0)',
};

export default function Modal({ show, onClose, children }) {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) onClose();
  };
  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);

    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <ModalStyled onClick={onClose} style={show ? styleModalShow : null}>
      <ModalContentStyled
        onClick={(e) => e.stopPropagation()}
        style={show ? styleModalContentShow : null}
      >
        <ModalTitleStyled>
          <IconButton onClick={onClose}>
            <img src={removeIcon} alt="" />
          </IconButton>
        </ModalTitleStyled>

        <ModalBodyStyled>{children}</ModalBodyStyled>
      </ModalContentStyled>
    </ModalStyled>
  );
}
