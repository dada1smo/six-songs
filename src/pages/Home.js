import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputAddMix from '../components/InputAddMix';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const SubTitle = styled.p`
  font-size: 28px;
  text-align: center;
  width: 450px;
  margin-top: 2rem;
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
      <h1>6 musicas</h1>

      <SubTitle>
        Crie e compartilhe as músicas que marcaram um momento.
      </SubTitle>

      <InputAddMix
        value={mix}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Wrapper>
  );
}
