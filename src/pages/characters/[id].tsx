import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from 'next/image';
import {
  Tabs,
  Tab,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";

import { TabPanel } from "../../components/TabPanel";

import { api } from "../../service/api";

import { Characters } from "../../models/characters";

import styles from './styles.module.scss';
import { ExpandMore } from "@material-ui/icons";

interface DescriptionComic {
  description: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    accordion: {
      backgroundColor: '#202020',
      color: '#fff',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export default function Home({ results }: Characters) {
  const classes = useStyles();

  const [tabSelected, setTabSelected] = useState(0);
  const [descriptionComic, setDescriptionComic] = useState<DescriptionComic>({} as DescriptionComic);

  function handleChange(event: React.ChangeEvent<{}>, newTabSelected: number) {
    setTabSelected(newTabSelected);
  }

  async function handleChangeAccordionComic(resourceURI: string) {
    const response = await api.get(resourceURI);
    const { data } = response.data;

    if (data) {
      setDescriptionComic(data.results[0].description ? data.results[0].description : 'No description.');
    } else {
      setDescriptionComic(response.data.results[0].description ? response.data.results[0].description : 'No description.');
    }
  }

  return (
    <>
      <Head>
        <title>{results[0].name} | Marvel</title>
      </Head>

      <main className={styles.content}>
        {results[0].thumbnail &&
          <>
            <Image
              src={`${results[0].thumbnail.path}.${results[0].thumbnail.extension}`}
              alt={results[0].name}
              width={700}
              height="100%"
            />

            <div className={styles.containerDetail}>
              <Tabs
                value={tabSelected}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Tabs item"
                style={{ backgroundColor: '#202020' }}
              >
                <Tab label="Character" />
                <Tab label="Comics" />
                <Tab label="Events" />
                <Tab label="Series" />
                <Tab label="Stories" />
              </Tabs>

              <div className={styles.tabPanelContainer}>
                <TabPanel value={tabSelected} index={0}>
                  <div className={styles.containerCharacter}>
                    <h1>{results[0].name}</h1>

                    <p>{results[0].description}</p>
                  </div>
                </TabPanel>

                <TabPanel value={tabSelected} index={1}>
                  <div className={styles.containerComics}>
                    <h1>Available: {results[0].comics.available}</h1>

                    <div className={styles.contentComics}>
                      {results[0].comics && results[0].comics.items.map(comic => (
                        <div key={comic.resourceURI} className={styles.contentComicItem}>
                          <h2>{comic.name}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabSelected} index={2}>
                  <div className={styles.containerComics}>
                    <h1>Available: {results[0].events.available}</h1>

                    <div className={styles.contentComics}>
                      {results[0].events && results[0].events.items.map(event => (
                        <div key={event.resourceURI} className={styles.contentComicItem}>
                          <h2>{event.name}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabSelected} index={3}>
                  <div className={styles.containerComics}>
                    <h1>Available: {results[0].series.available}</h1>

                    <div className={styles.contentComics}>
                      {results[0].series && results[0].series.items.map(serie => (
                        <div key={serie.resourceURI} className={styles.contentComicItem}>
                          <h2>{serie.name}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabSelected} index={4}>
                  <div className={styles.containerComics}>
                    <h1>Available: {results[0].stories.available}</h1>

                    <div className={styles.contentComics}>
                      {results[0].stories && results[0].stories.items.map(storie => (
                        <div key={storie.resourceURI} className={styles.contentComicItem}>
                          <h2>{storie.name}</h2>
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