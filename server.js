const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const produtosRoutes = require('./routes/produtos.routes');
app.use('/api', produtosRoutes); 

app.listen(3000, () => {
  console.log('Sistema de Estoque rodando na porta 3000');
});