const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pergunta = require('./database/pergunta');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    // vamos ler o nosso model Pergunta
    // select * from all pergunta;
    pergunta.findAll({raw: true}).then((perguntas) => {
        console.log(perguntas);
        res.render('index', {
            perguntas: perguntas
        });
    })
});

app.get('/novo', (req, res) => {
    res.render('novo');
});

app.post('/salvar', (req, res) => {
    let title = req.body.titulo;
    let description = req.body.descricao;

    // salvar a perguntar no Banco
    pergunta.create({
        title: title, 
        description: description,
    }).then(() => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error);
    });

    console.log(`Dados do formulario salvo: Titulo: ${title}  Descricao: ${description}`);
});

// buscando conexão com o banco.
const connection = require('./database/database');

connection.authenticate().then(() => {
    console.log('MySQL: Conexão feita com sucesso!');
}).catch((error) => {
    console.log(error);
});

app.listen(9090, (erro) => {
    if(erro) {
        console.log(erro, 'Ops, servidor não conseguiu subir ...');
    } else {
        console.log('Servidor rodando no endereço: http://localhost:9090');
    }
});