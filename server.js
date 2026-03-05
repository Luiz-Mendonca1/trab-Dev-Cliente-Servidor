const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const alunosRoutes = require('./routes/alunos.routes');

app.use('/api', alunosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});