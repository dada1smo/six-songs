import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardSong, { CardSkeleton } from '../components/CardSong';
import InputSearch from '../components/InputSearch';
import { Device } from '../styles/Breakpoints';
import { Theme } from '../styles/Theme';

const Wrapper = styled.div`
  padding: 40px 60px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 20% 80%;
  column-gap: 16px;
  height: 100vh;

  @media ${Device.laptop} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 20% 40% 40%;
    gap: 16px;
  }

  & h1 {
    grid-column: 1 / span all;
  }

  & .search {
    grid-column: 1 / span 5;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: auto;
    padding: 0 16px 20px 0;

    @media ${Device.laptop} {
      grid-column: 1 / span all;
      grid-row: 2 / span 1;
    }

    &::-webkit-scrollbar {
      width: 12px;
      height: 100%;
    }

    &::-webkit-scrollbar-thumb {
      background: ${Theme.neutral[700]};
      border-radius: 4px;
    }
  }

  & .selected {
    grid-column: 6 / span 7;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: auto;
    padding: 0 16px 20px 0;

    @media ${Device.laptop} {
      grid-column: 1 / span all;
      grid-row: 3 / span 1;
    }

    &::-webkit-scrollbar {
      width: 12px;
      height: 100%;
    }

    &::-webkit-scrollbar-thumb {
      background: ${Theme.neutral[700]};
      border-radius: 4px;
    }
  }
`;

const SelectedSongsList = styled.div`
  display: flex;
  gap: 12px;

  & div {
    width: 100%;
  }
`;

export default function Mix() {
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(search);
  };

  useEffect(() => {
    const getSongs = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://api.genius.com/search/?access_token=${process.env.REACT_APP_API_KEY}&q=${searchTerm}`
        );
        const results = data.response.hits.map((song) => song.result);
        console.log(results);
        const idResult = results.map((song) => song.id);
        selectedIds.forEach((id) => {
          if (idResult.includes(id)) {
            const exists = results.findIndex((song) => song.id === id);
            results[exists].selected = true;
          }
        });
        setSearchResults(results);
      } finally {
        setLoading(false);
      }
    };
    if (searchTerm.length > 3) {
      getSongs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    setSelectedIds(selectedSongs.map((song) => song.id));
  }, [selectedSongs]);

  const handleSelectSong = (id) => {
    const selected = searchResults.find((song) => song.id === id);
    const selectedIndex = searchResults.findIndex((song) => song.id === id);
    searchResults[selectedIndex].selected = true;
    setSelectedSongs([...selectedSongs, selected]);
  };

  const handleRemoveSong = (id) => {
    const selected = selectedSongs.filter((song) => song.id !== id);
    const selectedResult = searchResults
      .filter((song) => song.id === id)
      .map((song) => song.id);
    console.log(selectedResult);
    if (selectedResult > 0) {
      const selectedIndex = searchResults.findIndex(
        (song) => song.id === selectedResult[0]
      );
      searchResults[selectedIndex].selected = false;
    }
    setSelectedSongs([...selected]);
  };

  const handleMoveUp = (id) => {
    const selected = selectedSongs.find((song) => song.id === id);
    const selectedIndex = selectedSongs.findIndex((song) => song.id === id);
    selectedSongs.splice(selectedIndex, 1);
    selectedSongs.splice(selectedIndex - 1, 0, selected);
    setSelectedSongs([...selectedSongs]);
  };

  const handleMoveDown = (id) => {
    const selected = selectedSongs.find((song) => song.id === id);
    const selectedIndex = selectedSongs.findIndex((song) => song.id === id);
    selectedSongs.splice(selectedIndex, 1);
    selectedSongs.splice(selectedIndex + 1, 0, selected);
    setSelectedSongs([...selectedSongs]);
  };

  return (
    <Wrapper>
      <h1>This is the mix creation page!</h1>
      <div className="search">
        <InputSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={handleSearch}
        />
        {loading
          ? [...Array(10)].map((skeleton) => <CardSkeleton />)
          : searchResults.map(
              ({
                id,
                title,
                artist_names,
                song_art_image_thumbnail_url,
                selected,
              }) => {
                return (
                  <CardSong
                    key={id}
                    id={id}
                    title={title}
                    artist={artist_names}
                    cover={song_art_image_thumbnail_url}
                    handleSelect={selected ? false : handleSelectSong}
                    selected={selected}
                  />
                );
              }
            )}
      </div>
      <div className="selected">
        {selectedSongs.map(
          (
            { id, title, artist_names, song_art_image_thumbnail_url },
            index
          ) => {
            return (
              <SelectedSongsList key={id}>
                <h2>#{index + 1}</h2>
                <CardSong
                  id={id}
                  isFirst={index === 0}
                  isLast={index === selectedSongs.length - 1}
                  title={title}
                  artist={artist_names}
                  cover={song_art_image_thumbnail_url}
                  handleRemove={handleRemoveSong}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                />
              </SelectedSongsList>
            );
          }
        )}
      </div>
    </Wrapper>
  );
}
