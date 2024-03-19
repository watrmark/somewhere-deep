import axios from 'axios';

const baseURL = 'http://localhost:5001';

const api = axios.create({
    baseURL: baseURL,
});

export default {api, baseURL};
