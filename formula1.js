
let saldo = 100;
let valorApostado;
let pilotoSelecionado;
let intervalo;
let corridaIniciada = false;


function atualizarSaldo() {
    document.getElementById("saldo").innerHTML = "Saldo: R$" + saldo.toFixed(2);
}


function moverCarros() {
    const cars = document.querySelectorAll("#car1, #car2, #car3, #car4, #car5");
    const maxMovimento = 1050; 
    const velocidade = 5; 
    let vencedor = null;

  
    cars.forEach((car) => {
        const movimento = Math.floor(Math.random() * velocidade);
        const atualLeft = parseInt(car.style.left) || 0;
        car.style.left = Math.min(atualLeft + movimento, maxMovimento) + "px";

   
        if (car.id === "car3" && atualLeft >= maxMovimento && !vencedor) {
            vencedor = car.id; 
            clearInterval(intervalo); 
            mostrarVencedor(vencedor); 
        }
    });
}


function mostrarVencedor(vencedor) {
    if (vencedor === pilotoSelecionado) {
        saldo += valorApostado; 
        alert("Parabéns! Você ganhou a aposta. O saldo atual é: R$" + saldo.toFixed(2));
    } else {
        saldo -= valorApostado; 
        alert("Infelizmente, você perdeu a aposta. O saldo atual é: R$" + saldo.toFixed(2));
    }
    atualizarSaldo(); 
    resetarPosicoes(); 
    document.getElementById("btnApostar").disabled = false; 
}


function iniciarCorrida() {
    intervalo = setInterval(moverCarros, 50); 
    corridaIniciada = true; 
}


function fazerAposta() {
    valorApostado = parseFloat(document.getElementById("valorAposta").value);
    pilotoSelecionado = document.getElementById("pilotos-menu").value;

 
    if (isNaN(valorApostado) || valorApostado < 5 || valorApostado > saldo) {
        alert("Por favor, insira um valor de aposta válido.");
        return;
    }

   
    if (corridaIniciada) {
        alert("A corrida já foi iniciada. Aguarde o resultado.");
        return;
    }

    
    document.getElementById("btnApostar").disabled = true;
    iniciarCorrida(); 
    corridaIniciada = false; 


function resetarPosicoes() {
    const cars = document.querySelectorAll("#car1, #car2, #car3, #car4, #car5");
    cars.forEach((car) => {
        car.style.left = "0px"; 
    });
}


function init() {
    console.log("Inicializando...");
    atualizarSaldo(); 
    document.getElementById("btnApostar").addEventListener("click", fazerAposta); 
}
