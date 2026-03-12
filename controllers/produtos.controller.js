const db = require('../database/database');

// Listar Produtos
exports.listarProdutos = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM produtos ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// Cadastrar Produto
exports.cadastrarProduto = async (req, res) => {
    const { nome, preco, quantidade, categoria } = req.body;
    const sql = "INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES ($1, $2, $3, $4) RETURNING id";
    try {
        const result = await db.query(sql, [nome, preco, quantidade, categoria]);
        res.status(201).json({ mensagem: "Produto cadastrado!", id: result.rows[0].id });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// Atualizar Produto
exports.atualizarProduto = async (req, res) => {
    const id = req.params.id;
    const { nome, preco, quantidade, categoria } = req.body;
    const sql = "UPDATE produtos SET nome = $1, preco = $2, quantidade = $3, categoria = $4 WHERE id = $5";
    try {
        const result = await db.query(sql, [nome, preco, quantidade, categoria, id]);
        if (result.rowCount === 0) return res.status(404).json({ mensagem: "Produto não encontrado" });
        res.json({ mensagem: "Produto atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// Excluir Produto
exports.excluirProduto = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM produtos WHERE id = $1", [id]);
        res.json({ mensagem: "Produto excluído!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};