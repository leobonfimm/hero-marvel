import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MARVEL_BASE_URL,
  params: {
    apikey: process.env.NEXT_PUBLIC_MARVEL_API_KEY,
    hash: process.env.NEXT_PUBLIC_MARVEL_API_HASH
  },
});