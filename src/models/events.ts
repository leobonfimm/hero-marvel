interface Thumbnail {
  path: string;
  extension: string;
}

interface Url {
  type: string;
  url: string;
}

interface Creators {
  available: number;
  items: {
    name: string;
    role: string;
  }[];
}

interface Characters {
  available: number;
  items: {
    name: string;
  }[];
}

interface Stories {
  available: number;
  items: {
    name: string;
    type: string;
  }[];
}

interface Comics {
  available: number;
  items: {
    name: string;
  }[];
}

interface Series {
  available: number;
  items: {
    name: string;
  }[];
}

interface Results {
  id: number;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  creators: Creators;
  characters: Characters;
  stories: Stories;
  comics: Comics;
  series: Series;
  urls: Url[];
}

export interface Events {
  results: Results[];
}