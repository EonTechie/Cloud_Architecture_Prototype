const express = require('express');
const app = express();
app.use(express.json());

app.post('/check', (req, res) => {
  const { token } = req.body;
  if (token === '123') res.json({ valid: true });
  else res.status(401).json({ valid: false });
});

app.listen(4000, () => console.log("Auth service running on 4000"));
