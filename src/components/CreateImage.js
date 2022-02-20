import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import { PrimaryButton } from '../styles/Button';
import { Logo } from '../styles/Logo';

const canvasHeight = '640px';
const canvasWidth = '360px';

const Canvas = styled.div`
  background: ${Theme.neutral[900]};
  height: ${canvasHeight};
  width: ${canvasWidth};
  min-height: ${canvasHeight};
  min-width: ${canvasWidth};
  max-height: ${canvasHeight};
  max-width: ${canvasWidth};
  padding: 4px 4px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 361px;
    background: linear-gradient(
      180deg,
      ${Theme.primary[500]} 0%,
      ${Theme.highlight[500]} 10%,
      ${Theme.neutral[900]} 20%,
      ${Theme.neutral[900]} 80%,
      ${Theme.primary[500]} 90%,
      ${Theme.highlight[500]} 100%
    );
  }

  .songs {
    background: ${Theme.neutral[900]};
    padding: 32px 20px 20px;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
    position: relative;
    z-index: 12;

    .song {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .info {
      max-height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h4 {
      max-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 22px;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
    }

    & figure {
      position: relative;
      height: 56px;
      width: 56px;
      min-height: 56px;
      min-width: 56px;
      display: flex;
      align-items: center;
      justify-content: center;

      & img {
        max-width: 48px;
        position: relative;
        z-index: 20;
      }

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(
          ${Theme.primary[500]},
          ${Theme.highlight[500]},
          ${Theme.neutral[900]}
        );
        border-radius: 100%;
      }
    }
  }

  .canvasFooter {
    display: flex;
    justify-content: flex-end;

    g {
      fill: ${Theme.neutral['000']};
    }
  }
`;

export default function CreateImage({ mixTitle, songs }) {
  const [image, setImage] = useState('');
  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      logging: true,
      letterRendering: 1,
      allowTaint: false,
      useCORS: true,
      dpi: 144,
      scale: 2,
    });

    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = `${mixTitle}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }

    setImage(data);
  };

  return (
    <div
    // style={{ maxHeight: 36, overflow: 'hidden', height: 36, minHeight: 36 }}
    >
      <PrimaryButton type="button" onClick={handleDownloadImage}>
        Salvar imagem
      </PrimaryButton>
      <Canvas ref={printRef}>
        <div className="songs">
          <h2>{mixTitle}</h2>
          {songs.map(
            (
              { id, title, artist_names, song_art_image_thumbnail_url },
              index
            ) => {
              return (
                <div className="song" key={id}>
                  <h4>#{index + 1}</h4>
                  <figure>
                    <img
                      src={`${song_art_image_thumbnail_url}?time=${new Date().valueOf()}`}
                      alt={`Cover for ${title}`}
                      crossOrigin="anonymous"
                    />
                  </figure>
                  <div className="info">
                    <h4>{title}</h4>
                    <p>{artist_names}</p>
                  </div>
                </div>
              );
            }
          )}
          <div className="canvasFooter">
            <Logo height={14} />
          </div>
        </div>
      </Canvas>
    </div>
  );
}
