const mongoose = require('mongoose');

const PessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idade: { type: Number, required: true }
});

module.exports = mongoose.model('Pessoa', PessoaSchema);
