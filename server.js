const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Smart Resue Evaluator API is running');
});

const evaluatorRoutes = require('./routes/evaluator');
app.use('/api/evaluator', evaluatorRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});