import styled from 'styled-components';

import { IconButton } from '../styles/Button';
import { Input } from '../styles/Input';
import addIcon from '../images/add-icon.svg';

const AddMix = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 18%;
  margin-top: 1em;

  & input {
    flex-grow: 1;
  }
`;

export default function InputAddMix({ value, onChange, onSubmit }) {
  return (
    <>
      <h3 style={{ marginTop: '6em' }}>
        Qual o nome do seu novo mix de músicas?
      </h3>

      <AddMix onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="6 músicas ..."
          value={value}
          onChange={onChange}
          maxLength={32}
        />
        <IconButton type="submit">
          <img src={addIcon} alt="" />
        </IconButton>
      </AddMix>
    </>
  );
}
