// Definindo variáveis globais
let saldo = 100;
let valorApostado;
let pilotoSelecionado;
let intervalo;
let corridaIniciada = false; // Variável para controlar se a corrida já foi iniciada

// Função para atualizar o saldo na interface
function atualizarSaldo() {
    document.getElementById("saldo").innerHTML = "Saldo: R$" + saldo.toFixed(2);
}

// Função para mover os carros na pista
function moverCarros() {
    const cars = document.querySelectorAll("#car1, #car2, #car3, #car4, #car5");
    const maxMovimento = 1050; // Largura da pista
    const velocidade = 5; // Velocidade dos carros
    let vencedor = null;

    // Movendo cada carro
    cars.forEach((car) => {
        const movimento = Math.floor(Math.random() * velocidade);
        const atualLeft = parseInt(car.style.left) || 0;
        car.style.left = Math.min(atualLeft + movimento, maxMovimento) + "px";

        // Verificando se o carro 3 cruzou a linha de chegada e é o primeiro a fazê-lo
        if (car.id === "car3" && atualLeft >= maxMovimento && !vencedor) {
            vencedor = car.id; // Definindo o carro 3 como vencedor
            clearInterval(intervalo); // Parando a corrida
            mostrarVencedor(vencedor); // Chamando função para exibir o vencedor
        }
    });
}

// Função para exibir o vencedor
function mostrarVencedor(vencedor) {
    if (vencedor === pilotoSelecionado) {
        saldo += valorApostado; // Adiciona o valor da aposta ao saldo se o carro apostado for o vencedor
        alert("Parabéns! Você ganhou a aposta. O saldo atual é: R$" + saldo.toFixed(2));
    } else {
        saldo -= valorApostado; // Subtrai o valor da aposta do saldo se o carro apostado não for o vencedor
        alert("Infelizmente, você perdeu a aposta. O saldo atual é: R$" + saldo.toFixed(2));
    }
    atualizarSaldo(); // Atualiza o saldo na interface
    resetarPosicoes(); // Retorna os carros à posição inicial
    document.getElementById("btnApostar").disabled = false; // Habilita o botão de apostar novamente
}

// Função para iniciar a corrida
function iniciarCorrida() {
    intervalo = setInterval(moverCarros, 50); // Movendo os carros a cada 50 milissegundos
    corridaIniciada = true; // Marca a corrida como iniciada
}

// Função para validar e processar a aposta do jogador
function fazerAposta() {
    valorApostado = parseFloat(document.getElementById("valorAposta").value);
    pilotoSelecionado = document.getElementById("pilotos-menu").value;

    // Verificando se o valor da aposta é válido
    if (isNaN(valorApostado) || valorApostado < 5 || valorApostado > saldo) {
        alert("Por favor, insira um valor de aposta válido.");
        return;
    }

    // Verificando se a corrida já foi iniciada
    if (corridaIniciada) {
        alert("A corrida já foi iniciada. Aguarde o resultado.");
        return;
    }

    // Desabilitando o botão de apostar enquanto a corrida está em andamento
    document.getElementById("btnApostar").disabled = true;
    iniciarCorrida(); // Iniciando a corrida
    corridaIniciada = false; // Resetando o controle de corrida iniciada
}

// Função para retornar os carros à posição inicial
function resetarPosicoes() {
    const cars = document.querySelectorAll("#car1, #car2, #car3, #car4, #car5");
    cars.forEach((car) => {
        car.style.left = "0px"; // Define a posição inicial para a esquerda da pista
    });
}

// Função de inicialização
function init() {
    console.log("Inicializando...");
    atualizarSaldo(); // Exibindo o saldo inicial na interface
    document.getElementById("btnApostar").addEventListener("click", fazerAposta); // Adicionando evento de clique ao botão de apostar
}
