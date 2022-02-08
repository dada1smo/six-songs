import styled from 'styled-components';
import { DarkTheme } from './Theme';

export const Button = styled.button`
  display: inline-flex;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  font-family: ${DarkTheme.ibmPlexSans};
  font-weight: 400;
  font-size: 1rem;
  transition: 0.3s;
  outline: 0;
  border: none;
  text-decoration: none;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  position: relative;

  &img {
    width: 24px;
    height: 24px;
  }
`;

export const IconButton = styled(Button)`
  height: 40px;
  width: 40px;
  min-height: 40px;
  min-width: 40px;
  border-radius: 100%;
  opacity: ${(props) => (props.disabled ? '40%' : '100%')};
  background: ${(props) =>
    props.selected ? DarkTheme.hightlight[500] : DarkTheme.neutral[900]};

  &:hover {
    background: ${(props) =>
      props.selected ? DarkTheme.hightlight[500] : DarkTheme.primary[500]};
  }
`;
