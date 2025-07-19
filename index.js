import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hola mundo desde Express !!!');
});

app.listen(process.env.PORT || 3000, 
    () => {console.log('Servidor funcionando en http://localhost:3000');}
);
