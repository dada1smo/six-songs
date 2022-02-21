import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, PrimaryButton } from '../styles/Button';

export default function All() {
  const [collection, setCollection] = useState([]);

  const getCollection = async () => {
    const { data } = await axios.get(
      'https://ironrest.herokuapp.com/six-songs'
    );
    setCollection(data);
  };

  const handleRemove = async (id) => {
    const { data } = await axios.delete(
      `https://ironrest.herokuapp.com/six-songs/${id}`
    );
    getCollection();
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <>
      <ul>
        {collection.map(({ name, mixTitle, _id, songs }) => {
          return (
            <li key={_id}>
              {mixTitle}
              <PrimaryButton onClick={() => handleRemove(_id)}>
                Remover
              </PrimaryButton>
              <ol style={{ paddingLeft: 32 }}>
                {songs.map(({ title, id, artist_names }) => {
                  return (
                    <li key={id}>
                      {title}, {artist_names}
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ul>
    </>
  );
}
