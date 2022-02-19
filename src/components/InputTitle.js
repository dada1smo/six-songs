import styled from 'styled-components';
import { IconButton } from '../styles/Button';
import { Input } from '../styles/Input';
import editIcon from '../images/edit-icon.svg';
import { Theme } from '../styles/Theme';

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  & input {
    flex-grow: 1;
  }

  h1 {
    border-bottom: 1px solid ${Theme.neutral[800]};
  }
`;

const InputLg = styled(Input)`
  font-size: 28px;
  font-weight: 600;
  background: transparent;
  border: none;
  padding: 0;
  border-radius: 0;
  border-bottom: 1px solid ${Theme.neutral[900]};
  min-width: 40vw;

  &:focus {
    border: none;
    border-bottom: 1px solid ${Theme.hightlight[500]};
  }
`;

export default function InputTitle({
  value,
  onChange,
  edit = false,
  handleEditTitle,
  onKeyPress,
}) {
  return (
    <Title>
      {!edit ? (
        <>
          <h1>{value}</h1>
          <IconButton>
            <img src={editIcon} onClick={handleEditTitle} alt="" />
          </IconButton>
        </>
      ) : (
        <>
          <h1>6 músicas</h1>
          <InputLg
            type="text"
            preffix="6 músicas"
            placeholder={value}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            maxLength={32}
          />
        </>
      )}
    </Title>
  );
}
