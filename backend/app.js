const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

const AUTH_URL = process.env.AUTH_URL;
const MONGO_URL = process.env.MONGO_URL;

app.post('/data', async (req, res) => {
  const { token } = req.body;

  try {
    const authRes = await axios.post(AUTH_URL, { token });
    if (!authRes.data.valid) return res.status(401).send("Unauthorized");
  } catch (e) {
    return res.status(500).send("Auth error");
  }

  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const db = client.db('test');
  const items = await db.collection('data').find().toArray();
  client.close();

  res.json(items);
});

app.listen(3001, () => console.log("Backend running on 3001"));
