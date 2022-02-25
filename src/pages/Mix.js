import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CardSong, { CardSkeleton } from '../components/CardSong';
import CreateImage from '../components/CreateImage';
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import InputTitle from '../components/InputTitle';
import { Device } from '../styles/Breakpoints';
import { PrimaryButton } from '../styles/Button';
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

  & .title {
    grid-column: 1 / span all;
    display: flex;
    justify-content: center;
    align-items: center;
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

    .saveMix {
      display: flex;
      justify-content: center;
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
  const { name } = useParams();
  const [title, setTitle] = useState(`6 músicas ${name}`);
  const [editTitle, setEditTitle] = useState(false);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allowSave, setAllowSave] = useState(false);
  const [showCreateImage, setShowCreateImage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSetTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleEditTitle = () => {
    const actualTitle = title.replace('6 músicas ', '');
    setTitle(actualTitle);
    setEditTitle(true);
  };

  const handleFinishEdit = (e) => {
    if (e.key === 'Enter' && title.length > 3) {
      e.preventDefault();
      const fullTitle = `6 músicas ${title}`;
      setTitle(fullTitle);
      setEditTitle(false);
    }
  };

  const handleSubmit = (e) => {
    if (title.length > 3) {
      e.preventDefault();
      const fullTitle = `6 músicas ${title}`;
      setTitle(fullTitle);
      setEditTitle(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(search);
  };

  useEffect(() => {
    const getSongs = async () => {
      const headers = {
        'Access-Control-Allow-Origin': '*',
      };
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.genius.com/search/?access_token=${process.env.REACT_APP_API_KEY}&q=${searchTerm}`,
          headers
        );
        const results = data.response.hits.map((song) => song.result);
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
    if (selectedSongs.length === 6) {
      setAllowSave(true);
    } else {
      setAllowSave(false);
    }
  }, [selectedSongs]);

  const handleSelectSong = (id) => {
    const selectedSong = searchResults.find((song) => song.id === id);
    // const { id, title, artist_names, song_art_image_thumbnail_url, selected } =
    //   selected;
    const selectedIndex = searchResults.findIndex((song) => song.id === id);
    if (selectedSongs.length < 6) {
      searchResults[selectedIndex].selected = true;
      setSelectedSongs([
        ...selectedSongs,
        {
          id: selectedSong.id,
          title: selectedSong.title,
          artist_names: selectedSong.artist_names,
          song_art_image_thumbnail_url:
            selectedSong.song_art_image_thumbnail_url,
          selected: selectedSong.selected,
        },
      ]);
    }
  };

  const handleRemoveSong = (id) => {
    const selected = selectedSongs.filter((song) => song.id !== id);
    const selectedResult = searchResults
      .filter((song) => song.id === id)
      .map((song) => song.id);
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

  const handleSaveMix = async () => {
    setShowModal(!showModal);
    const mix = {
      mixTitle: title,
      songs: selectedSongs,
    };

    // eslint-disable-next-line no-unused-vars
    const { data } = await axios
      .post(`https://ironrest.herokuapp.com/six-songs/`, mix)
      .finally(setShowCreateImage(true));
  };

  return (
    <>
      <Header />
      <Wrapper>
        <div className="title">
          <InputTitle
            value={title}
            onChange={handleSetTitle}
            handleEditTitle={handleEditTitle}
            edit={editTitle}
            onKeyPress={handleFinishEdit}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="search">
          <InputSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={handleSearch}
          />
          {loading
            ? [...Array(10)].map((skeleton, index) => (
                <CardSkeleton key={index} />
              ))
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
          {allowSave && (
            <div className="saveMix">
              <CreateImage
                songs={selectedSongs}
                mixTitle={title}
                handleSave={handleSaveMix}
              />
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
}
