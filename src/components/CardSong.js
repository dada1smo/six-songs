import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import addIcon from '../images/add-icon.svg';
import checkIcon from '../images/check-icon.svg';
import removeIcon from '../images/remove-icon.svg';
import arrowUpIcon from '../images/arrow-up-icon.svg';
import arrowDownIcon from '../images/arrow-down-icon.svg';
import { IconButton } from '../styles/Button';

const Card = styled.div`
  background: ${Theme.neutral[900]};
  display: flex;
  align-items: center;
  gap: 32px;
  border-radius: 8px;
  padding: 12px 16px;
  justify-content: space-between;

  & .song {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  & h3 {
    margin-bottom: 4px;
  }

  & figure {
    position: relative;
    height: 80px;
    width: 80px;
    min-height: 80px;
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      max-width: 64px;
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

  & .actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 40px;
  }
`;

const Skeleton = styled(Card)`
  & figure {
    &:after {
      background: linear-gradient(
        -45deg,
        ${Theme.highlight[500]},
        ${Theme.primary[500]},
        ${Theme.neutral[900]}
      );
      background-size: 400% 400%;
      animation: gradient 2s ease infinite;
    }
  }

  & .placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      -45deg,
      ${Theme.neutral[800]},
      ${Theme.neutral[900]},
      ${Theme.neutral[800]}
    );
    background-size: 400% 400%;
    animation: gradient 2s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default function CardSong({
  id,
  title,
  artist,
  cover,
  handleSelect,
  handleRemove,
  handleMoveUp,
  handleMoveDown,
  selected,
  isFirst,
  isLast,
}) {
  return (
    <Card>
      <div className="song">
        {(handleMoveUp || handleMoveDown) && (
          <div className="actions">
            {handleMoveUp && (
              <IconButton disabled={isFirst} onClick={() => handleMoveUp(id)}>
                <img src={arrowUpIcon} alt="" />
              </IconButton>
            )}
            {handleMoveDown && (
              <IconButton disabled={isLast} onClick={() => handleMoveDown(id)}>
                <img src={arrowDownIcon} alt="" />
              </IconButton>
            )}
          </div>
        )}
        <figure>
          <img src={cover} alt={`Cover for ${title}`} />
        </figure>
        <div>
          <h3>{title}</h3>
          <p>{artist}</p>
        </div>
      </div>
      <div className="actions">
        {handleSelect && (
          <IconButton onClick={() => handleSelect(id)}>
            <img src={addIcon} alt="" />
          </IconButton>
        )}
        {selected && (
          <IconButton disabled selected onClick={() => handleSelect(id)}>
            <img src={checkIcon} alt="" />
          </IconButton>
        )}
        {handleRemove && (
          <IconButton onClick={() => handleRemove(id)}>
            <img src={removeIcon} alt="" />
          </IconButton>
        )}
      </div>
    </Card>
  );
}

export function CardSkeleton() {
  return (
    <Skeleton>
      <div className="song">
        <figure></figure>
      </div>
      <div className="placeholder"></div>
    </Skeleton>
  );
}
