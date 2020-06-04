import express from 'express';
import routes from './routes'
const app = express();

app.use(express.json());
app.use(routes);


const users = [
    'ana',
    'bruno',
    'cleiton'
]

app.listen(3333)