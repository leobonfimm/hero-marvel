import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from 'next/image';
import { Tabs, Tab } from "@material-ui/core";

import { TabPanel } from "../../components/TabPanel";

import { api } from "../../service/api";


import styles from './styles.module.scss';
import { Creators } from "../../models/creators";


export default function Home({ results }: Creators) {
  const [tabSelected, setTabSelected] = useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newTabSelected: number) {
    setTabSelected(newTabSelected);
  }

  return (
    <>
      <Head>
        <title>{results[0].fullName} | Marvel</title>
      </Head>

      <main className={styles.content}>
        {results[0].thumbnail &&
          <>
            <Image
              src={`${results[0].thumbnail.path}.${results[0].thumbnail.extension}`}
              alt={results[0].fullName}
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
                <Tab label="Creator" />
                <Tab label="Comic" />
                <Tab label="Series" />
                <Tab label="Stories" />
                <Tab label="Events" />
              </Tabs>

              <div className={styles.tabPanelContainer}>
                <TabPanel value={tabSelected} index={0}>
                  <div className={styles.containerItemDetail}>
                    <h1>{results[0].fullName}</h1>
                  </div>
                </TabPanel>

                <TabPanel value={tabSelected} index={1}>
                  <div className={styles.containerItems}>
                    <h1>Available: {results[0].comics.available}</h1>

                    <div className={styles.contentRenderItems}>
                      {results[0].comics && results[0].comics.items.map(comic => (
                        <div key={comic.name} className={styles.contentContextItem}>
                          <h2>{comic.name}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabSelected} index={2}>
                  <div className={styles.containerItems}>
                    <h1>Available: {results[0].series.available}</h1>

                    <div className={styles.contentRenderItems}>
                      {results[0].series && results[0].series.items.map(serie => (
                        <div key={serie.name} className={styles.contentContextItem}>
                          <h2>{serie.name}</h2>
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