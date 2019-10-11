const express = require('express');

const app = express();
const PORT = 3001;


app.use(express.json());

app.use('/comments', (req, res) => {
//use express.static(path.join here? instead of a (req, res))
//see groceryList
});

app.get(/*endpoint*/ (req, res) => {});

app.post(/*endpoint*/ (req, res) => {})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));