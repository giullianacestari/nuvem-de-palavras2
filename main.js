document.addEventListener("DOMContentLoaded", function () {
  let textarea = document.getElementById("texto");
  const botaoEnviar = document.getElementById("enviar-texto");
  const container = document.getElementById("container");

  // * Evento de clique no botão
  botaoEnviar.addEventListener("click", function () {
    let texto = textarea.value;

    // * Divide o texto em palavras, pegando os espaços como separadores
    // OPÇÃO 1
    //let palavras = texto.split(" ").join(" ") + " ";
    // OPÇÃO 2
    let palavras = texto.split(/\s+/);

    //  console.log(palavras);

    // * Conta as palavras
    let frequencia = [];
    for (let i = 0; i < palavras.length; i++) {
      let palavra = palavras[i];

      // Se seguirmos a OPÇÃO 1 até aqui, vai pegar TODOS os caracteres separados (espaços, pontos, vírgulas, etc.)
      // Se seguirmos a OPÇÂO 2, vai pegar as palavras (com vírgulas e pontos), mas não conta os espaços como caracteres

      // @ console.log(palavra);

      if (palavra.length >= 5) {
        if (!frequencia[palavra]) {
          // Se a palavra ainda não foi contada
          frequencia[palavra] = 0;
        }
        frequencia[palavra]++;
      }
    }

    // * Transforma o objeto em um array de objetos
    let itens = [];
    for (let palavra in frequencia) {
      itens.push({ texto: palavra, frequencia: frequencia[palavra] });
    }

    // * Ordenação
    // for (let i = 0; i < itens.length; i++) {
    //   for (let j = 0; j < itens.length - 1; j++) {
    //     if (itens[j].frequencia < itens[j + 1].frequencia) {
    //       let temp = itens[j];
    //       itens[j] = itens[j + 1];
    //       itens[j + 1] = temp;
    //     }
    //   }
    // }

    // * Limitar o número de itens
    // OPÇÃO 1
    let itensLimitados = [];
    for (let i = 0; i < itens.length && i < 16; i++) {
      itensLimitados[itensLimitados.length] = itens[i];
    }

    // OPÇÃO 2
    // let itensLimitados = [];
    // for (let i = 0; i < Math.min(itens.length, 16); i++) {
    //   itensLimitados.push(itens[i]);
    // }

    // * Limpa o container antes de adicionar novos elementos
    container.innerHTML = "";

    // * Adiciona os elementos ao container
    for (let i = 0; i < itensLimitados.length; i++) {
      let item = itensLimitados[i];
      let elemento = document.createElement("div");

      elemento.classList.add("nova-palavra");

      // * Exemplo de cálculo de tamanho baseado na frequência
      elemento.style.fontSize = `${
        item.frequencia * 10 < 10 ? 10 : item.frequencia * 10
      }px`;
      // Opção 1: `${item.frequencia * 10 < 10 ? 10 : item.frequencia * 10}px`
      // Opção 2: `${Math.max(20, item.frequencia * 10)}px`

      elemento.textContent = item.texto;
      container.appendChild(elemento);
    }
  });
});
