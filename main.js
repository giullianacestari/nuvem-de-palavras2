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

    // ! Dúvida: será que não dá pra adicionar os dois `for` em um só?
    // * Cria um objeto para armazenar a frequência das palavras
    let frequencia = [];
    for (let i = 0; i < palavras.length; i++) {
      frequencia[palavras[i]] = 0;
    }

    //console.log(frequencia);

    //* Conta a frequência das palavras
    for (let i = 0; i < palavras.length; i++) {
      let palavra = palavras[i];
      frequencia[palavra] += 1;

      // console.log(palavra);
      // console.log(frequencia);
    }
    //! --------------------------------------------termina aqui

    // * Transforma o objeto em um array de objetos
    let itens = [];
    for (let palavra in frequencia) {
      itens.push({ texto: palavra, frequencia: frequencia[palavra] });
    }

    //console.log(itens);

    // * Limitar o número de itens
    let itensLimitados = [];
    for (let i = 0; i < itens.length && i < 5; i++) {
      itensLimitados[itensLimitados.length] = itens[i];
    }

    //console.log(itensLimitados);

    // !Dúvida: essa variável não é usada em nenhum momento, mas se eu retiro isso o código da linha 61 não funciona.
    let frequenciaOrdenada = itensLimitados.sort(
      (a, b) => b.frequencia - a.frequencia
    );

    //console.log(frequenciaOrdenada);

    // * Limpa o container antes de adicionar novos elementos
    container.innerHTML = "";

    // * Esconde a palavra mais frequente
    let palavraMaisFrequente = itensLimitados.shift();

    // * Cria um elemento para a palavra mais frequente
    let elemento = document.createElement("div"); //! repetição
    elemento.classList.add("nova-palavra"); //! repetição
    elemento.style.fontSize = `${
      //! repetição
      palavraMaisFrequente.frequencia * 10 < 10
        ? 10
        : palavraMaisFrequente.frequencia * 40
    }px`;
    elemento.textContent = palavraMaisFrequente.texto;

    // * Estilos adicionais para garantir centralização
    elemento.style.position = "absolute"; //! repetição
    elemento.style.padding = "30px";
    elemento.style.left = "50%";
    elemento.style.top = "50%";
    elemento.style.transform = "translate(-50%, -50%)";

    container.appendChild(elemento);

    // * Adiciona os elementos ao container
    for (let i = 0; i < itensLimitados.length; i++) {
      let item = itensLimitados[i];
      let elemento = document.createElement("div"); //! repetição

      elemento.classList.add("nova-palavra"); //! repetição

      elemento.style.fontSize = `${
        //! repetição
        item.frequencia * 10 < 10 ? 10 : item.frequencia * 20
      }px`;
      elemento.textContent = item.texto;
      elemento.style.position = "absolute"; //! repetição

      // * Gera valores aleatórios para left e top dentro dos limites do container
      const larguraQuadro = container.clientWidth;
      const alturaQuadro = container.clientHeight;
      const larguraPalavra = elemento.clientWidth;
      const alturaPalavra = elemento.clientHeight;

      const larguraDisponivel = larguraQuadro - larguraPalavra;
      const alturaDisponivel = alturaQuadro - alturaPalavra;

      const posicaoEsquerda =
        larguraDisponivel > 0 ? Math.random() * larguraDisponivel : 0;
      const posicaoTopo =
        alturaDisponivel > 0 ? Math.random() * alturaDisponivel : 0;

      elemento.style.left = `${posicaoEsquerda}px`;
      elemento.style.top = `${posicaoTopo}px`;

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
* fica sempre no meio


*/
