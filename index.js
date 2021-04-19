// API == Server == Express == Mongoose == Bcrypt

let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

const JWT_SECRET = "**SEGREDO**";

let User = require("./models/User");
let Order = require("./models/Order");
let Commerce = require("./models/Commerce");

const user = "ricardo";
const password = "Azd202020";
const database = "dbOne";
const server = `mongodb+srv://${user}:${password}@cluster0.xtsw7.mongodb.net/${database}?retryWrites=true&w=majority`;
const config = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(server, config).then(() => {
  console.log("Database connection successfully!");
});

const db = mongoose.connection;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.get("/api/", (req, res) => {
  console.log("API is working!");
});

app.post("/register", async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const psenha = req.body.senha;
  const tipo = req.body.tipo;
  const carrinho = req.body.carrinho;

  const exists = await User.findOne({ email }).lean();

  if (tipo.length == 0) {
    return res.json({ status: "error", error: "Your tipo cannot be null" });
  }

  if (nome.length == 0) {
    return res.json({ status: "error", error: "Your name cannot be null" });
  }

  if (email.length == 0) {
    return res.json({ status: "error", error: "Your email cannot be null" });
  }

  if (exists) {
    return res.json({
      status: "error",
      error: "This email have already been registered",
    });
  }

  if (psenha.length < 8) {
    return res.json({
      status: "error",
      error: "Your senha must contain at least 8 characters",
    });
  }

  const senha = await bcrypt.hash(psenha, 10);

  const user = new User({
    email: email,
    username: nome,
    senha: senha,
    tipo: tipo,
    carrinho: carrinho,
  });
  await user.save();

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      nome: user.username,
      tipo: user.tipo,
      carrinho: user.carrinho,
    },
    JWT_SECRET
  );

  return res.json({ status: "ok", data: token });
});

app.post("/cart", async (req, res) => {
  const userId = req.body.userId;
  
  const items = req.body.items;
  const qtd = req.body.qtd;
  const total = req.body.total;

  const id = { _id: userId };
  const update = { carrinho: { items, qtd, total} };
  
  await User.findByIdAndUpdate(id, update, {
    new: true,
    useFindAndModify: false,
    upsert: true // Make this update into an upsert
  });

  return res.json({ status: "ok", data: 'cart added'})
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  const user = await User.findOne({ email }).lean();

  if (email.length == 0) {
    return res.json({ status: "error", error: "Your email cannot be null" });
  }

  if (!user) {
    return res.json({ status: "error", error: "This email does not exist" });
  }

  if (senha.length == 0) {
    return res.json({ status: "error", error: "Your password cannot be null" });
  }

  if (await bcrypt.compare(senha, user.senha)) {
    const token = jwt.sign(
      {
        id: user._id,
        nome: user.username,
        email: user.email,
        tipo: user.tipo,
      },
      JWT_SECRET
    );

    return res.json({ status: "ok", data: token });
  } else {
    return res.json({ status: "error", error: "Invalid password" });
  }
});

app.post("/order", async (req, res) => {
  const userId = req.body.userId;
  const commerceId = req.body.commerceId;
  const driverId = req.body.driverId;
  const orderObj = req.body.orderObj;
  const price = req.body.price;
  const status = req.body.status;

  const order = new Order({
    userId: userId,
    commerceId: commerceId,
    driverId: driverId,
    orderObj: orderObj,
    price: price,
    status: status,
  });
  await order.save();

  const token = jwt.sign(
    {
      userId: user.userId,
      commerceId: user.commerceId,
      driverId: user.driverId,
      orderObj: user.orderObj,
      price: user.price,
      status: user.status,
    },
    JWT_SECRET
  );

  return res.json({ status: "order registered!", data: token });
});

app.post("/commerce", async (req, res) => {
  const image = req.body.image;
  const nome = req.body.nome;
  const categoria = req.body.categoria;
  const descricao = req.body.descricao;
  const cnpj = req.body.cnpj;
  const cidade = req.body.cidade;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const categoriasObj = req.body.categoriasObj;
  const delivery = req.body.delivery;
  const pedidoMinimo = req.body.pedidoMinimo;
  const abre = req.body.abre;
  const fecha = req.body.fecha;

  const commerce = new Commerce({
    image: image,
    nome: nome,
    categoria: categoria,
    descricao: descricao,
    cnpj: cnpj,
    cidade: cidade,
    latitude: latitude,
    longitude: longitude,
    categoriasObj: categoriasObj,
    delivery: delivery,
    pedidoMinimo: pedidoMinimo,
    abre: abre,
    fecha: fecha,
  });
  await commerce.save();

  const token = jwt.sign(
    {
      image: commerce.image,
      nome: commerce.nome,
      categoria: commerce.categoria,
      descricao: commerce.descricao,
      cnpj: commerce.cnpj,
      latitude: commerce.latitude,
      longitude: commerce.longitude,
      categoriasObj: commerce.categoriasObj,
      delivery: commerce.delivery,
      pedidoMinimo: commerce.pedidoMinimo,
      abre: commerce.abre,
      fecha: commerce.fecha,
    },
    JWT_SECRET
  );

  return res.json({ status: "commerce registered!", data: token });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// const express = require('express');
// const mongoose = require('mongoose');

// const user = 'ricardo'
// const password = 'Azd202020'
// const database = 'startup'
// const server = `mongodb+srv://${user}:${password}@cluster0.94tuo.mongodb.net/${database}?retryWrites=true&w=majority`
// const config = { useNewUrlParser: true, useUnifiedTopology: true }

// mongoose.connect(server, config).then(() => {
//     console.log('Database connection succesfully!')
// })

// const production = express();
// const development = express();

// const PORT = 3000;

// development.get('/', function(req, res) {
//     res.send('Hello World!');
// })

// production.use('/dev', development);

// production.listen(PORT, () => {
//     console.log(`Server running on PORT: ${PORT}`);
// })
