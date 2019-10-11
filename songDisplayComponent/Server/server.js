const express = require('express');

const app = express();

// Sidebar is on port 5000; use 5001
const port = 5001;

app.get('/', (req, res) => {
  res.end('Get / WORKS');
});

app.listen(port, () => console.log(`Express App running on port ${port}`));
