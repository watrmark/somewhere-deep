import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // Use relative path in production
  : 'https://z5xrvtgto5.execute-api.us-east-2.amazonaws.com/dev';  // Use your actual API Gateway URL

const api = axios.create({
  baseURL: API_URL,
});

export default { api, API_URL };
