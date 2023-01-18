import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('express set up')
})

app.get('/products/:pid', (req, res) => {
    let pid: number = parseInt(req.params.pid)
    res.send(`get product through id ${pid}`)
})
app.get('/products', (req, res) => {
    let { limit } = req.query
    res.send(`get all products with limit of ${limit}`)
})

app.listen(port, () => {
    console.log(`Serever is running at localhost:${port}`)
})
