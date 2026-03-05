const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos.controller');

// Rotas para o sistema de produtos
router.get('/produtos', produtosController.listarProdutos);
router.post('/produtos', produtosController.cadastrarProduto);
router.put('/produtos/:id', produtosController.atualizarProduto);
router.delete('/produtos/:id', produtosController.excluirProduto);

module.exports = router;