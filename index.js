const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/perguntas', function(req, res) {
    res.render('perguntas');
});

app.listen(9090, (erro) => {
    if(erro) {
        console.log(erro, 'Ops, servidor não conseguiu subir ...');
    } else {
        console.log('Servidor rodando no endereço: http://localhost:9090');
    }
});