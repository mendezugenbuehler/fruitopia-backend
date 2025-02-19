const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config;

const app = express();
const BASE_URL = 'https://www.fruityvice.com/api/fruit';

//Middleware
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'welcome to the backend' });
});

app.get('/fruits', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

//Search Route
app.get('/fruits', async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const response = await axios.get(`${BASE_URL}/${name.toLowerCase()}`);
    const data = response.data;
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'failed to fetch fruit data' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running, http://localhost:${process.env.PORT}`);
});