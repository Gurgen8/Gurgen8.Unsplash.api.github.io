import axios from 'axios';

const ACCESS_KEY = 'Ot9LeDnIHj2jaR0FAhxE_cqvT6xg9KppD5DKa31xqCQ';
const ACCESS_SECRET = 'VxIdGm4OdJs6OUPEO3gouAWU89KB89TnxV5iriHPBQU';

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    contentType: 'application/json',
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

class Api {
  static search(page, query = {}) {
    return api.get('/search/photos', {
      params: {
        page,
        ...query
      },
    });
  }
}

export default Api;
