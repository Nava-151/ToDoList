const express = require('express');
const renderApi = require('@api/render-api');

const app = express();
const PORT = process.env.PORT || 3000;

renderApi.auth('rnd_qJEXf7yqzg68uH3oC4v6nCz1kkjM');

app.get('/', async (req, res) => {
  try {
    const { data } = await renderApi.listServices({ includePreviews: 'true', limit: '20' });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data from Render API');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
