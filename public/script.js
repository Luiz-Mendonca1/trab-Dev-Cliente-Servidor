
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

        listaProdutos.innerHTML = ''; // Limpa a tabela

        produtos.forEach(p => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
                <td>${p.quantidade}</td>
                <td>${p.categoria}</td>
                `;
            listaProdutos.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

// Inicialização
carregarProdutos();
