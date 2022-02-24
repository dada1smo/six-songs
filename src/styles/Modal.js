import styled from "styled-components";

import { Theme } from "./Theme";

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
`;

export const ModalContentStyled = styled.div`
  min-width: 30%;
  background-color: ${Theme.neutral[800]};
  transform: translateY(-200px);
  transition: all 0.3s ease-in-out;
`;

export const ModalTitleStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

export const ModalBodyStyled = styled.div`
  padding: 10px;
`;

// export const ModalButtonCloseStyled = styled.button`
//   width: 10%;
//   height: 15%;
//   color: ${Theme.neutral["000"]};
//   background-color: ${Theme.neutral[800]};
//   border: 1px solid ${Theme.neutral["000"]};
//   border-radius: 8px;
//
//   &:hover {
//     cursor: pointer;
//     background: ${(props) => props.selected ? Theme.highlight[500] : Theme.primary[500]};
//   }
// `;
