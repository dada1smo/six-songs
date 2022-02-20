import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputAddMix from '../components/InputAddMix';
import logo from '../images/logo.svg';
import { Logo } from '../styles/Logo';

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
  const [mix, setMix] = useState('');
  const router = useNavigate();

  const handleChange = (e) => {
    setMix(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mix.length > 3) {
      router(`/mix/${mix}`);
    }
  };

  return (
    <Wrapper>
      <Logo height={52} />

      <h2>Crie e compartilhe as músicas que marcaram um momento.</h2>

      <InputAddMix
        value={mix}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Wrapper>
  );
}
