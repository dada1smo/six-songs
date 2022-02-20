import styled from 'styled-components';
import { Theme } from './Theme';

export const Input = styled.input`
  background: ${Theme.neutral[900]};
  color: ${Theme.neutral['000']};
  border: 1px solid ${Theme.neutral[900]};
  outline: none;
  font-size: 16px;
  padding: 12px 20px;
  border-radius: 8px;
  font-family: ${Theme.ibmPlexSans};
  transition: 0.3s;

  &:focus {
    border: 1px solid ${Theme.highlight[500]};
  }
`;
