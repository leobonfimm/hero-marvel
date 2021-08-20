interface Thumbnail {
  path: string;
  extension: string;
}

interface Creator {
  available: number;
  items: {
    name: string;
    role: string;
  }[];
}

interface Character {
  available: number;
  items: {
    name: string;
  }[];
}

interface Storie {
  available: number;
  items: {
    name: string;
    type: string;
  }[];
}

interface Events {
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
  creators: Creator;
  characters: Character;
  stories: Storie;
  events: Events;
}

export interface Comics {
  results: Results[];
}