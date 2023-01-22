import express from 'express';
import dotenv from 'dotenv';
import ProdRouter from './api/routes/ProductRoutes'
import CartRouter from './api/routes/CartRoutes';
dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', ProdRouter)
app.use('/', CartRouter)

app.get('/', (req, res) => {
    res.send('express set up')
})

app.listen(port, () => {
    console.log(`Serever is running at localhost:${port}`)
})
