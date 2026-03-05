const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos.controller');

//baseado no sistema de alunos se adapta para realizar as funções de acordo com o CRUD
router.get('/produtos', produtosController.listarProdutos); 
router.post('/produtos', produtosController.cadastrarProduto); 
router.put('/produtos/:id', produtosController.atualizarEstoquePreco); 
router.delete('/produtos/:id', produtosController.excluirProduto); 

module.exports = router;