
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const produtosRoutes = require('./routes/produtos.routes');
const authRoutes = require('./routes/auth.routes');

// Registrar rotas
app.use('/api', produtosRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
