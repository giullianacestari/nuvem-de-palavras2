document.addEventListener("DOMContentLoaded", function () {
  let textarea = document.getElementById("texto");
  const botaoEnviar = document.getElementById("enviar-texto");
  const container = document.getElementById("container");

  // * Evento de clique no botão
  botaoEnviar.addEventListener("click", function () {
    let texto = textarea.value;

    // * Divide o texto em palavras, pegando os espaços como separadores
    let palavras = texto.split(/\s+/);

    //console.log(palavras.length);

    // * Cria um objeto, inicia a frequência de cada palavra com 0
    let frequencia = [];
    for (let i = 0; i < palavras.length; i++) {
      frequencia[palavras[i]] = 0;
    }

    //console.log(frequencia);

    //* Conta a frequência das palavras
    for (let i = 0; i < palavras.length; i++) {
      let palavra = palavras[i];
      frequencia[palavra] += 1;

      //console.log(palavra);
      // console.log(frequencia);
    }

    let palavrasIgnoradas = ["", "a", "o", "e", "de", "da", "do", "em", "um"];

    for (let i = 0; i < palavrasIgnoradas.length; i++) {
      let palavra = palavrasIgnoradas[i];
      delete frequencia[palavra];
    }

    // * Transforma o objeto em um array de objetos
    let itens = [];
    for (let palavra in frequencia) {
      itens.push({ texto: palavra, frequencia: frequencia[palavra] });
    }

    //console.log(itens);

    // * Limitar o número de itens
    let itensLimitados = [];
    for (let i = 0; i < itens.length && i < 6; i++) {
      itensLimitados[itensLimitados.length] = itens[i];
    }

    //console.log(itensLimitados);

    let listaOrdenada = itensLimitados.sort(
      (a, b) => b.frequencia - a.frequencia
    );

    //console.log(listaOrdenada);

    // * Limpa o container antes de adicionar novos elementos
    container.innerHTML = "";

    // * Pega a PRIMEIRA PALAVRA da lista ordenada
    let palavraMaisFrequente = listaOrdenada[0];

    //console.log(palavraMaisFrequente);

    // * Cria um elemento para a palavra mais frequente
    let elemento = document.createElement("div");
    elemento.classList.add("item-1");

    elemento.textContent = palavraMaisFrequente.texto;

    container.appendChild(elemento);

    // * Adiciona os elementos ao container
    for (let i = 1; i < itensLimitados.length; i++) {
      let item = itensLimitados[i];
      let elemento = document.createElement("div");

      elemento.textContent = item.texto;

      elemento.classList.add(`item-${i + 1}`);

      container.appendChild(elemento);
    }
  });
});

/*

@ Pontos de melhoria

1. O código está pegando caracteres especiais, ex: "palavra," e "palavra."

2. Está vazando as laterais do container (palavras fora do quadro).

3. Não está colorindo as palavras.

4. DIVS com posicionamento fixo
  - precisa ordenar
  - precisa modificar o tamanho da palavra de acordo com o container

5. Quanto mais repetidas as palavras, elas crescem mais e mais. Deveria haver um limite e uma escala proporcional para crescimento.

@ Resultados

Consegui centralizar a palavra mais frequente
! utiliza shift()
! código enorme e repetitivo
! precisa ordenar
* fica sempre no meio

HTML
- deixar as divs prontas com HTML e CSS
- adicionar campo de texto (textarea)
- botão

JS
- quebrar o texto em palavras
- pega as 5 principais palavras
- mostra na tela (ul já ordenada)

- tirar caracteres especiais das palavras
- eventlistener do botão
- criar um banco de palavras (tirar preposições, artigos, etc) / arquivo separado com lista

CSS
- estilizar a nuvem de palavras
- ler artigos de estilização (grid-area)


FINAL
- biblioteca anychart (ler documentação, entender funcionamento)




Documentos
https://dev.to/alvaromontoro/create-a-tag-cloud-with-html-and-css-1e90
https://github.com/adisonlampert/workshop-word-cloud
https://css-tricks.com/create-a-tag-cloud-with-some-simple-css-and-even-simpler-javascript/
https://blog.devgenius.io/word-cloud-with-html-and-css-tutorial-1fa17642391e
https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template

*/
