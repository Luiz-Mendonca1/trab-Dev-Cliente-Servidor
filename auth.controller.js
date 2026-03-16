const db = require('../database/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-trocar-em-producao';
const JWT_EXPIRES_IN = '2h';

exports.registrar = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });

  try {
    const { rows } = await db.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (rows.length > 0) return res.status(409).json({ mensagem: 'Já existe um usuário com esse e-mail.' });

    const senhaHash = bcrypt.hashSync(senha, 10);
    const role = 'user';

    const insertResult = await db.query(
      'INSERT INTO usuarios (email, senha_hash, role) VALUES ($1, $2, $3) RETURNING id',
      [email, senhaHash, role]
    );

    const userId = insertResult.rows[0].id;
    const token = jwt.sign({ id: userId, email, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.', token, email, role });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });

  try {
    const { rows } = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (rows.length === 0) {
      // Login do admin fixo
      if (email === 'admin@admin.com' && senha === 'qwertyuiop') {
        const senhaHashAdmin = bcrypt.hashSync(senha, 10);
        const roleAdmin = 'admin';

        const insertAdmin = await db.query(
          'INSERT INTO usuarios (email, senha_hash, role) VALUES ($1, $2, $3) RETURNING id',
          [email, senhaHashAdmin, roleAdmin]
        );

        const userId = insertAdmin.rows[0].id;
        const token = jwt.sign({ id: userId, email, role: roleAdmin }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return res.json({ mensagem: 'Login de administrador realizado com sucesso.', token, email, role: roleAdmin });
      }

      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const usuario = rows[0];
    const senhaConfere = bcrypt.compareSync(senha, usuario.senha_hash);

    if (!senhaConfere) return res.status(401).json({ mensagem: 'Credenciais inválidas.' });

    const role = usuario.role || 'user';
    const token = jwt.sign({ id: usuario.id, email: usuario.email, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({ mensagem: 'Login realizado com sucesso.', token, email: usuario.email, role });
  } catch (err) {
    return res.status(500).json({ mensagem: err.message });
  }
};