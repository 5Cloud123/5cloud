const express = require('express');
const path = require('path');

const app = express();

// Sidebar is on port 5000; use 5001
const port = 5001;

// Serve the static index file from the React app
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/', (req, res) => {
  res.end('Get / WORKS');
});

app.listen(port, () => console.log(`Express App running on port ${port}`));
