let mongoose = require('mongoose');

let commerceSchema = new mongoose.Schema({
    createdAt: {
        type: Date, 
        default: Date.now(),
    },
    image: {
        type: String
    },
    nome: {
        type: String
    },
    categoria: {
        type: String,
    },
    descricao: {
        type: String
    },
    estrelas: {
        type: Number
    },
    cnpj: {
        type: Number
    },
    cidade: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    categoriasObj: {
        type: Object
    },
    delivery: {
        type: Boolean
    },
    pedidoMinimo: {
        type: Number,
    },
    abre: {
        type: Number
    },
    fecha: {
        type: Number
    }
})

module.exports = mongoose.model('Commerce', commerceSchema);