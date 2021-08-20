interface Item {
  resourceURI: string;
  name: string;
  type: string;
}

interface Url {
  type: string;
  url: string;
}

interface Event {
  available: number;
  items: Item[];
}

interface Stories {
  available: number;
  items: Item[];
}

interface Comics {
  available: number;
  items: Item[];
}

interface Series {
  available: number;
  items: Item[];
}

interface Thumbnail {
  path: string;
  extension: string;
}

interface Results {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Event;
  urls: Url[];
}

export interface Characters {
  results: Results[];
}