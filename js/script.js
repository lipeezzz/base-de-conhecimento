let cardContainer = document.querySelector(".card-container");
let dados = [];
let caixaBusca = document.querySelector("#caixa-busca");
  
async function iniciarBusca() {
    let resposta = await fetch("datajson/data.json");
    dados = await resposta.json();
    renderizarCards(dados);

    caixaBusca.addEventListener("input", () => {
        const termoBusca = caixaBusca.value;
        const dadosFiltrados = filtrarDados(termoBusca);
        renderizarCards(dadosFiltrados);
    });
}

function filtrarDados(termo) {
    const termoFormatado = termo.toLowerCase().trim();
    if (!termoFormatado) {
        return dados; // Retorna todos os dados se a busca estiver vazia
    }

    return dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termoFormatado) ||
               dado.descricao.toLowerCase().includes(termoFormatado);
    });
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar os cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
         <p>${dado.ano}</p>
         <p>${dado.descricao}</p>
         <a href="${dado.link}" target="_blank">Saiba mais</a>
         `;

         cardContainer.appendChild(article);
    }
}