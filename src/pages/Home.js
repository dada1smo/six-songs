import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from '../styles/Logo';
import InputTitle from '../components/InputTitle';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  svg {
    margin-bottom: 40px;
  }
`;

export default function Home() {
  const [title, setTitle] = useState('');
  const router = useNavigate();

  const handleSetTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleFinishEdit = (e) => {
    if (e.key === 'Enter' && title.length > 3) {
      e.preventDefault();
      router(`/mix/${title}`);
    }
  };

  const handleSubmit = (e) => {
    if (title.length > 3) {
      e.preventDefault();
      router(`/mix/${title}`);
    }
  };

  return (
    <Wrapper>
      <Logo height={52} />

      <h2>Crie e compartilhe as músicas que marcaram um momento.</h2>

      {/* <InputAddMix
        value={mix}
        onChange={handleChange}
        onSubmit={handleSubmit}
      /> */}
      <p style={{ margin: '6em 0 2em' }}>
        Qual o nome do seu novo mix de músicas?
      </p>
      <InputTitle
        value={title}
        onChange={handleSetTitle}
        edit={true}
        onKeyPress={handleFinishEdit}
        handleSubmit={handleSubmit}
      />
    </Wrapper>
  );
}
