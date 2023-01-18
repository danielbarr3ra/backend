import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('express set up')
})

app.listen(port, () => {
    console.log(`Serever is running at localhost:${port}`)
})
