const db = require('../database/database');

//baseado no sistema anterior encontra

// CADASTRAR PRODUTO
exports.cadastrarProduto = (req, res) => {
  const { nome, preco, quantidade, categoria } = req.body;
  const sql = "INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [nome, preco, quantidade, categoria], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ mensagem: "Produto cadastrado!", id: result.insertId });
  });
};

// LISTAR PRODUTOS
exports.listarProdutos = (req, res) => {
  db.query("SELECT * FROM produtos", (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
};

// ATUALIZAR PREÇO OU QUANTIDADE
exports.atualizarEstoquePreco = (req, res) => {
  const id = req.params.id;
  const { preco, quantidade } = req.body; 
  
  db.query(
    "UPDATE produtos SET preco = ?, quantidade = ? WHERE id = ?",
    [preco, quantidade, id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ mensagem: "Produto não encontrado" });
      res.json({ mensagem: "Estoque/Preço atualizado com sucesso!" });
    }
  );
};

// EXCLUIR PRODUTO
exports.excluirProduto = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM produtos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "Produto removido do sistema!" });
  });
};