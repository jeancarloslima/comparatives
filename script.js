const listas = document.querySelectorAll('.lista-alternativas');
let acertos = 0;
let erros = 0;

listas.forEach(lista => {
    const respostaCerta = lista.getAttribute('resposta-certa');
    const alternativas = lista.querySelectorAll('.alternativa-item');
    const feedbackDiv = lista.parentElement.querySelector('.feedback');

    let respondido = false;

    alternativas.forEach(alternativa => {
        alternativa.addEventListener('click', () => {
            if (respondido) return;

            respondido = true;

            alternativas.forEach(alt => alt.classList.remove('active'));

            alternativa.classList.add('active');

            const respostaSelecionada = alternativa.textContent.trim().toLowerCase();
            const respostaCorreta = respostaCerta.trim().toLowerCase();

            if (respostaSelecionada === respostaCorreta) {
                alternativa.classList.add('correta');
                feedbackDiv.innerHTML = `<i class="fas fa-check-circle"></i> Resposta correta!`;
                feedbackDiv.classList.add('correta');
                acertos++;
            } else {
                alternativa.classList.add('incorreta');
                feedbackDiv.innerHTML = `<i class="fas fa-times-circle"></i> Resposta incorreta! A correta era: <span style="text-decoration: underline;">${respostaCerta}</span>.`;
                feedbackDiv.classList.add('incorreta');
                erros++;

                alternativas.forEach(alt => {
                    if (alt.textContent.trim().toLowerCase() === respostaCorreta) {
                        alt.classList.add('correta');
                    }
                });
            }

            const todasRespondidas = [...listas].every(l => {
                const items = l.querySelectorAll('.alternativa-item');
                return [...items].some(item => item.classList.contains('correta') || item.classList.contains('incorreta'));
            });

            if (todasRespondidas) {
                mostrarResultadoFinal();
            }
        });
    });
});

function mostrarResultadoFinal() {
    const resultadoDiv = document.querySelector('.resultado-final');
    resultadoDiv.innerHTML = `<i class="fas fa-flag-checkered"></i> Você acertou <span style="color:#b6e648;">${acertos}</span> e errou <span style="color:#ee5045;">${erros}</span>.`;
}
