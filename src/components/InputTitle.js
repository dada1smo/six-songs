import styled from 'styled-components';
import { IconButton } from '../styles/Button';
import { Input } from '../styles/Input';
import editIcon from '../images/edit-icon.svg';
import { Theme } from '../styles/Theme';
import checkIconLight from '../images/check-icon-light.svg';

const Title = styled.div`
  background: ${(props) =>
    props.active ? `${Theme.neutral[900]}` : 'transparent'};
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: 0.3s;
  border: ${(props) =>
    props.active ? `1px solid ${Theme.neutral[900]}` : 'none'};

  & input {
    flex: 1;
  }

  &:focus-within {
    border: ${(props) =>
      props.active ? `1px solid ${Theme.highlight[500]}` : 'none'};
  }

  h1 {
    border-bottom: 1px solid ${Theme.neutral[800]};
  }
`;

const InputLg = styled(Input)`
  background: transparent;
  font-size: 24px;
  font-weight: 600;
  border: none;
  padding: 0;
  border-radius: 0;
  min-width: 40vw;

  &:focus {
    border: none;
  }
`;

export default function InputTitle({
  value,
  onChange,
  edit = false,
  handleEditTitle,
  onKeyPress,
  handleSubmit,
}) {
  return (
    <Title active={edit}>
      {!edit ? (
        <>
          <h2>{value}</h2>
          <IconButton>
            <img src={editIcon} onClick={handleEditTitle} alt="" />
          </IconButton>
        </>
      ) : (
        <>
          <h2>6 músicas</h2>
          <InputLg
            type="text"
            preffix="6 músicas"
            placeholder={value}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            maxLength={32}
          />
          <IconButton>
            <img src={checkIconLight} onClick={handleSubmit} alt="" />
          </IconButton>
        </>
      )}
    </Title>
  );
}
