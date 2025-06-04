const alternativas = document.querySelectorAll(".alternativa-item");
let acertos = 0;
let erros = 0;

alternativas.forEach((alternativa) => {
    alternativa.addEventListener("click", () => {
        const listaAltenativas = alternativa.parentElement;
        const respotaCerta = listaAltenativas.getAttribute("resposta-certa");
        const outrasAlternativas = listaAltenativas.querySelectorAll(".alternativa-item");
        const exercio = listaAltenativas.parentElement;
        const feedback = exercio.querySelector(".feedback");

        if (alternativa.textContent === respotaCerta) {
            outrasAlternativas.forEach((outraAlternativa) => {
                if (outraAlternativa.textContent !== respotaCerta) {
                    outraAlternativa.classList.add("incorreta");
                } else {
                    alternativa.classList.add("correta");
                }
            });

            feedback.innerHTML = `<i class="fa-solid fa-check"></i> Correto!`;
            feedback.classList.add("correta");
            acertos++;
        } else {
            outrasAlternativas.forEach((outraAlternativa) => {
                if (outraAlternativa.textContent !== respotaCerta) {
                    outraAlternativa.classList.add("incorreta");
                } else {
                    outraAlternativa.classList.add("correta");
                }
            });

            feedback.innerHTML = `<i class="fa-solid fa-xmark"></i> Errado! A resposta certa era: ${respotaCerta}`;
            feedback.classList.add("incorreta");
            erros++;
        };

        listaAltenativas.style.pointerEvents = "none";
        verificaFim();
    })
});

function verificaFim() {
    const listaAltenativas = document.querySelectorAll(".lista-alternativas");
    let questoesRestantes = 20;

    listaAltenativas.forEach((lista) => {
        if (lista.style.pointerEvents === "none") {
            questoesRestantes--;
        }
    });

    if (questoesRestantes === 0) {
        const resultadoFinal = document.querySelector(".resultado-final");
        
        resultadoFinal.innerHTML = `<i class="fa-solid fa-flag-checkered"></i>  Você acertou ${acertos} e errou ${erros}!`
    }
}