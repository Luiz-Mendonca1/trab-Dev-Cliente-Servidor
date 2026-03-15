
// Configuração da URL base da API
const apiURL = "/api/produtos";

// Menu lateral 
const menu = document.querySelector('.menu-lateral')
const btn = document.querySelector('.btn-expandir')

btn.addEventListener('click', function(){
    menu.classList.toggle('fechar')
})

// Menu lateral final

// Elementos do DOM
const form = document.getElementById('produto-form');
const listaProdutos = document.getElementById('lista-produtos');
const btnSalvar = document.getElementById('btn-salvar');
const inputId = document.getElementById('produto-id');

// ===============================
// 1. LISTAR PRODUTOS
// ===============================
async function carregarProdutos() {
    try {
        const response = await fetch(apiURL);
        const produtos = await response.json();
        
        listaProdutos.innerHTML = ''; // Limpa a tabela antes de preencher

        produtos.forEach(p => {
            listaProdutos.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
                    <td>${p.quantidade}</td>
                    <td>${p.categoria}</td>
                    <td>
                        <button onclick="prepararEdicao(${p.id}, '${p.nome}', ${p.preco}, ${p.quantidade}, '${p.categoria}')">Editar</button>
                        <button class="btn-delete" onclick="excluirProduto(${p.id})">Excluir</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

// ===============================
// 2. CADASTRAR OU ATUALIZAR
// ===============================
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = inputId.value;
    const dados = {
        nome: document.getElementById('nome').value,
        preco: parseFloat(document.getElementById('preco').value),
        quantidade: parseInt(document.getElementById('quantidade').value),
        categoria: document.getElementById('categoria').value
    };

    // Validação básica
    if (dados.preco < 0 || dados.quantidade < 0) {
        alert("Preço e quantidade não podem ser negativos!");
        return;
    }

    try {
        let response;
        if (id) {
            // Modo Edição (PUT)
            response = await fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        } else {
            // Modo Cadastro (POST)
            response = await fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        }

        if (response.ok) {
            form.reset();
            inputId.value = '';
            btnSalvar.innerText = 'Cadastrar Produto';
            carregarProdutos(); // Atualiza a lista
        }
    } catch (error) {
        alert("Erro ao salvar o produto.");
    }
});

// ===============================
// 3. PREPARAR EDIÇÃO (PREENCHER FORM)
// ===============================
window.prepararEdicao = (id, nome, preco, quantidade, categoria) => {
    inputId.value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('preco').value = preco;
    document.getElementById('quantidade').value = quantidade;
    document.getElementById('categoria').value = categoria;
    
    btnSalvar.innerText = 'Atualizar Estoque/Preço';
    window.scrollTo(0, 0); // Sobe a página para o utilizador ver o form
};

// ===============================
// 4. EXCLUIR PRODUTO
// ===============================
window.excluirProduto = async (id) => {
    if (confirm('Deseja realmente excluir este produto?')) {
        try {
            await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
            carregarProdutos();
        } catch (error) {
            alert("Erro ao excluir produto.");
        }
    }
};

// Inicialização
carregarProdutos();
