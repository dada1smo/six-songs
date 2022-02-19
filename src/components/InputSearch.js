import styled from 'styled-components';
import { IconButton } from '../styles/Button';
import { Input } from '../styles/Input';
import searchIcon from '../images/search-icon.svg';

const Search = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;

  & input {
    flex-grow: 1;
  }
`;

export default function InputSearch({ value, onChange, onSubmit }) {
  return (
    <Search onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="Pesquisar músicas..."
        value={value}
        onChange={onChange}
        maxLength={56}
      />
      <IconButton type="submit">
        <img src={searchIcon} alt="" />
      </IconButton>
    </Search>
  );
}
