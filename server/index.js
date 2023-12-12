const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const _ = require('lodash');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let currentRequest;

const jsonData = [
    { email: 'jim@gmail.com', number: '221122' },
    { email: 'jam@gmail.com', number: '830347' },
    { email: 'john@gmail.com', number: '221122' },
    { email: 'jams@gmail.com', number: '349425' },
    { email: 'jams@gmail.com', number: '141424' },
    { email: 'jill@gmail.com', number: '822287' },
    { email: 'jill@gmail.com', number: '822286' },
];

app.post('/api/search', async (req, res) => {
    if (currentRequest) {
        currentRequest.cancel();
    }

    const { email, number } = req.body;

    //   логика поиска в JSON-данных
    const filteredData = _.filter(jsonData, (item) => {
        return (
            item.email.toLowerCase().includes(email.toLowerCase()) &&
            (number ? item.number === number : true)
        );
    });

    // Имитация задержки в 5 секунд
    currentRequest = axios.CancelToken.source();
    setTimeout(() => {
        res.json(filteredData);
        currentRequest = null;
    }, 5000);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});