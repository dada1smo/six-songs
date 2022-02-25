import styled from 'styled-components';

import { Theme } from './Theme';

export const ModalStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${Theme.neutral[900]}80;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
  z-index: 4000;
`;

export const ModalContentStyled = styled.div`
  min-width: 30%;
  background-color: ${Theme.neutral[800]};
  transform: translateY(-200px);
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
`;

export const ModalTitleStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 8px 0;
`;

export const ModalBodyStyled = styled.div`
  padding: 8px 20px 16px;
`;
