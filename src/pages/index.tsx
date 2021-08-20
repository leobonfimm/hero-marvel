import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Card } from '../components/Card';
import { api } from '../service/api';

import styles from './home.module.scss';

interface Thumbnail {
  path: string;
  extension: string;
}

interface ItemData {
  id: number;
  name: string;
  title: string;
  firstName: string;
  description: string;
  thumbnail: Thumbnail;
}

interface ResponseData {
  count: number;
  limit: number;
  results: ItemData[];
}

export default function Home() {
  const [type, setType] = useState('characters');
  const [responseData, setResponseData] = useState<ResponseData>({} as ResponseData);

  useEffect(() => {
    api
      .get(`${type}`)
      .then(response => {
        const { data } = response.data;

        console.log(response.data);

        if (data) {
          setResponseData(data)
        } else {
          setResponseData(response.data)
        }
      })
      .catch(err => console.log(err));
  }, [type]);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setType(event.target.value);
  }

  return (
    <>
      <Head>
        <title>Marvel</title>
      </Head>

      <main className={styles.container}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="input-type">Type</InputLabel>
          <Select
            labelId="input-type"
            id="select-type"
            label="Type"
            value={type}
            onChange={handleChange}
          >
            <MenuItem value="characters">Characters</MenuItem>
            <MenuItem value="comics">Comics</MenuItem>
            <MenuItem value="creators">Creators</MenuItem>
            <MenuItem value="events">Events</MenuItem>
            <MenuItem value="series">Series</MenuItem>
          </Select>
        </FormControl>

        <section className={styles.content}>
          {responseData.results !== undefined && responseData.results.map(item => (
            <Card
              key={item.id}
              id={item.id}
              title={item.name || item.firstName || item.title}
              thumbnail={item.thumbnail ? item.thumbnail.path : undefined}
              extension={item.thumbnail ? item.thumbnail.extension : undefined}
              type={type}
            />
          ))}
        </section>
      </main>
    </>
  )
}
