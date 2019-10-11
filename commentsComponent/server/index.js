const express = require('express');

const app = express();
const PORT = 3001;


app.use(express.json());

app.get(/*endpoint*/ (req, res) => {});

app.post(/*endpoint*/ (req, res) => {})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));