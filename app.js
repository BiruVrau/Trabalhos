const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Pessoa = require('./models/pessoa');

const app = express();

// Configurar Mongoose
mongoose.connect('mongodb://localhost:27017/pessoaCrud');

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Servir a página HTML
app.get('/', async (req, res) => {
    const pessoas = await Pessoa.find();
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Endpoint para adicionar uma nova pessoa
app.post('/add', async (req, res) => {
    const { nome, email, idade } = req.body;
    const novaPessoa = new Pessoa({ nome, email, idade });
    await novaPessoa.save();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

app.get('/pessoas', async (req, res) => {
    const pessoas = await Pessoa.find();
    res.json(pessoas);
});
