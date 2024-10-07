let contador = 0;
let historicoTransacoes = [];

function atualizarHistorico() {
    const lista = document.getElementById('lista-historico');
    lista.innerHTML = '';

    historicoTransacoes.forEach(transacao => {
        const li = document.createElement('li');
        li.textContent = `Transação: ${transacao.valor} DOT, Complexidade: ${transacao.complexidade}, Custo Gas: ${transacao.custoGas.toFixed(2)} DOT, Custo Gas em ${transacao.moedaTransacao}: ${transacao.gasConvertido}`;
        lista.appendChild(li);
    });
}

document.getElementById('calcular').addEventListener('click', function() {
    let valorTransacao = parseFloat(document.getElementById('valor-transacao').value);
    let complexidade = document.getElementById('complexidade').value;
    let moeda = document.getElementById('moeda').value;
    let precoGas;
    let moedaTransacao;
    let conversao;


    switch (complexidade) {
        case 'baixa':
            precoGas = 0.01;
            break;
        case 'media':
            precoGas = 0.05;
            break;
        case 'alta':
            precoGas = 0.1;
            break;        
    }

    let custoGas = valorTransacao * precoGas;

    switch (moeda) {
        case 'usd':
            moedaTransacao = 'USD';
            conversao = 4.18 * precoGas;
            break;
        case 'eur':
            moedaTransacao = 'EUR';
            conversao = 3.76 * precoGas;
            break;
        case 'brl':
            moedaTransacao = 'BRL';
            conversao = 22.81 * precoGas;
            break;             
    }
    
    let gasConvertido = valorTransacao * conversao;

    if (valorTransacao > 0) {
        contador++
        document.getElementById('contagem').textContent = contador

        
        historicoTransacoes.push({
            valor: valorTransacao,
            complexidade: complexidade.charAt(0).toUpperCase() + complexidade.slice(1),
            custoGas: custoGas,
            moedaTransacao: moedaTransacao,
            gasConvertido: gasConvertido.toFixed(2),
        });

        atualizarHistorico();

        document.getElementById('resultado').innerHTML = `
        <p>Valor da Transação: ${valorTransacao} DOT</p>
        <p>Complexidade: ${complexidade.charAt(0).toUpperCase()+complexidade.slice(1)}</p>
        <p><strong>Custo Estimado do Gas: ${custoGas.toFixed(2)} DOT</strong></p>
        <p>Custo Estimado do Gas em ${moedaTransacao}: ${gasConvertido.toFixed(2)} ${moedaTransacao}</p>
        `;


    } else {
        document.getElementById('resultado').innerHTML ='<p style="color:red;"> Por favor, insira um valor de transação válido.</p>'
    }
});


setInterval(() => {
    historicoTransacoes = [];
    contador = 0;
    resultado = '';
    document.getElementById('lista-historico').innerHTML = '';
    document.getElementById('contagem').textContent = contador;
    document.getElementById('resultado').textContent = resultado;
}, 60000);