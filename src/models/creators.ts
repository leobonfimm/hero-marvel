interface Thumbnail {
  path: string;
  extension: string;
}

interface Item {
  resourceURI: string;
  name: string;
  type: string;
}

interface Comic {
  available: number;
  items: Item[];
}

interface Series {
  available: number;
  items: Item[];
}

interface Storie {
  available: number;
  items: Item[];
}

interface Events {
  available: number;
  items: {
    name: string;
  }[];
}

interface Results {
  id: number;
  fullName: string;
  thumbnail: Thumbnail;
  comics: Comic;
  series: Series;
  stories: Storie;
  events: Events;
}

export interface Creators {
  results: Results[];
}