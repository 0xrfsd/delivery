let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  senha: {
    type: String,
  },
  cep: {
    type: String,
  },
  tipo: {
    type: String
  },
  carrinho: {
    type: Array,
  },
  cpf: {
    type: Number,
  },
  telefone: {
    type: Number,
  },
  estrelas: {
    type: Number,
  },
  cidade: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  ultimoPedido: {
    type: Object,
  },
  historicoPedidos: {
    type: Object,
  },
});

module.exports = mongoose.model("User", userSchema);
