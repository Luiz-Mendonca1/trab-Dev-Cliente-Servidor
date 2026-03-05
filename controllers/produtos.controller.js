const db = require('../database/database');

// SELECT * FROM produtos;
exports.listarProdutos = (req, res) => {
    db.query("SELECT * FROM produtos", (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(results);
    });
};

// INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES (?, ?, ?, ?);
exports.cadastrarProduto = (req, res) => {
    const { nome, preco, quantidade, categoria } = req.body;
    const sql = "INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES (?, ?, ?, ?)";
    db.query(sql, [nome, preco, quantidade, categoria], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: "Produto cadastrado!", id: result.insertId });
    });
};

// UPDATE produtos SET preco = ?, quantidade = ? WHERE id = ?;
exports.atualizarProduto = (req, res) => {
    const id = req.params.id;
    const { preco, quantidade } = req.body;
    const sql = "UPDATE produtos SET preco = ?, quantidade = ? WHERE id = ?";
    db.query(sql, [preco, quantidade, id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ mensagem: "Produto atualizado!" });
    });
};

// DELETE FROM produtos WHERE id = ?;
exports.excluirProduto = (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM produtos WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ mensagem: "Produto excluído!" });
    });
};

// SELECT * FROM produtos WHERE quantidade < ?; (Exemplo de filtro de estoque baixo)
exports.buscarEstoqueBaixo = (req, res) => {
    const limite = req.query.limite || 10;
    db.query("SELECT * FROM produtos WHERE quantidade < ?", [limite], (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(results);
    });
};