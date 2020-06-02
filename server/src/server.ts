import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Teste')

    response.json([
        'a','b','c'
    ]);
});

app.listen(3333)