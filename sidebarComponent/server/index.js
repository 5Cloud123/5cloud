let express = require('express');

let app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(express.json());

app.use('/sidebar', (req, res) => {});
