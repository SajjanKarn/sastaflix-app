import axios from 'axios';

const client = axios.create({
  baseURL: 'https://yts.mx/api/v2'
});

export default client;
