import express from 'express';
import dotenv from 'dotenv';
import ProdRouter from './api/routes/ProductRoutes'
import CartRouter from './api/routes/CartRoutes';
dotenv.config();
import { ExpressHandlebars, engine } from 'express-handlebars';

const app = express();

// setting up the handlebars

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/../src/views/layouts')
app.engine('handlebars', engine({
    defaultLayout: 'index',
    extname: 'handlebars',
    layoutsDir: __dirname + '/../src/views/layouts'
}));

app.use(express.static(__dirname + '/../src/public'));

const port = process.env.PORT;


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', ProdRouter)
app.use('/', CartRouter)

app.get('/', (req, res) => {
    // render a welcome messaged

    let Welcome = {
        First: 'First',
        Second: 'Project',
    }
    res.render('index', Welcome)
})

app.listen(port, () => {
    console.log(`Serever is running at localhost:${port}`)
})
