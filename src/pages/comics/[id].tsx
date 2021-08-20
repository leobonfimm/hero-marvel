import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from 'next/image';
import { Tabs, Tab } from "@material-ui/core";

import { TabPanel } from "../../components/TabPanel";

import { api } from "../../service/api";


import styles from './styles.module.scss';
import { Comics } from "../../models/comics";


export default function Home({ results }: Comics) {
  const [tabSelected, setTabSelected] = useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newTabSelected: number) {
    setTabSelected(newTabSelected);
  }

  return (
    <>
      <Head>
        <title>{results[0].title} | Marvel</title>
      </Head>

      <main className={styles.content}>
        {results[0].thumbnail &&
          <>
            <Image
              src={`${results[0].thumbnail.path}.${results[0].thumbnail.extension}`}
              alt={results[0].title}
              width="700px"
              height="100%"
            />

            <div className={styles.containerDetail}>
              <Tabs
                value={tabSelected}
                onChange={handleChange}
                variant="scrollable"
                aria-label="Tabs item"
                style={{ backgroundColor: '#202020' }}
              >
                <Tab label="Comic" />
                <Tab label="Character" />
                <Tab label="Events" />
                <Tab label="Stories" />
                <Tab label="Creator" />
              </Tabs>

              <div className={styles.tabPanelContainer}>

                <TabPanel value={tabSelected} index={0}>
                  <div className={styles.containerItemDetail}>
                    <h1>{results[0].title}</h1>

                    <p>{results[0].description}</p>
                  </div>
                </TabPanel>

                <TabPanel value={tabSelected} index={1}>
                  <div className={styles.containerItems}>
                    <h1>Available: {results[0].characters.available}</h1>

                    <div className={styles.contentRenderItems}>
                      {results[0].characters && results[0].characters.items.map(character => (
                        <div key={character.name} className={styles.contentContextItem}>
                          <h2>{character.name}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabSelected} index={2}>
                  <div className={styles.containerItems}>
                    <h1>Available: {results[0].events.available}</h1>

                    <div className={styles.contentRenderItems}>
                      {results[0].events && results[0].events.items.map(event => (
                        <div key={event.name} className={styles.contentContextItem}>
                          <h2>{event.name}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabSelected} index={3}>
                  <div className={styles.containerItems}>
                    <h1>Available: {results[0].stories.available}</h1>

                    <div className={styles.contentRenderItems}>
                      {results[0].stories && results[0].stories.items.map(storie => (
                        <div key={storie.name} className={styles.contentContextItem}>
                          <h2>{storie.name}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabSelected} index={4}>
                  <div className={styles.containerItems}>
                    <h1>Available: {results[0].creators.available}</h1>

                    <div className={styles.contentRenderItems}>
                      {results[0].creators && results[0].creators.items.map(creator => (
                        <div key={creator.name} className={styles.contentContextItem}>
                          <h2>{creator.name} | Role: {creator.role}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>
              </div>
            </div>
          </>
        }
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const { id } = params;
  const { type } = query;

  const response = await api.get(`${type}/${id}?ts=${process.env.NEXT_PUBLIC_MARVEL_API_TS}`);

  const { data } = response.data;

  if (data) {
    const { results } = data;

    return {
      props: {
        results
      }
    }
  }


  const { results } = response.data;

  return {
    props: {
      results
    }
  };
}