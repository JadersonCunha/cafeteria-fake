document.addEventListener('DOMContentLoaded', () => {

    const btnTop = document.getElementById("btn-top");
    const inputCafe = document.getElementById("input-cafe");
    const btnCafe = document.getElementById("btn-cafe");
    const btnLimpar = document.getElementById("btn-limpar");

   
    const modalResultado = document.getElementById('modal-resultado');
    const fecharModalResultado = document.getElementById('fechar-modal-resultado');
    const conteudoResultado = document.getElementById('conteudo-resultado');

    function abrirModalResultado(html) {
        conteudoResultado.innerHTML = html;
        modalResultado.style.display = 'flex';
    }

    function fecharModal() {
        modalResultado.style.display = 'none';
    }

    if (fecharModalResultado) {
        fecharModalResultado.addEventListener('click', fecharModal);
    }
    if (modalResultado) {
        modalResultado.addEventListener('click', (e) => {
            if (e.target === modalResultado) fecharModal();
        });
    }

    window.onscroll = function() {
        btnTop.style.display = (window.scrollY > 300) ? 'block' : 'none';
    };

    btnTop.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    
    const handleSearch = async (query) => {
        abrirModalResultado('<h2 class="title-box">Buscando...</h2>');

        let resposta = "";
        try {
            const response = await fetch('/.netlify/functions/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query })
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor.');
            }

            const data = await response.json();
            
            resposta = data.result || "Não foi possível obter resposta da IA.";
        } catch (error) {
            console.error('Falha ao se comunicar com o agente IA:', error);
            resposta = "Erro ao buscar resposta da IA.";
        }

        
        resposta = resposta.replace(/\*/g, '');

        const html = `
            <h2 class="title-box">Resultado da Pesquisa</h2>
            <h3 class="subtitulo-box">Sua pergunta: <span style="font-weight:normal">${query}</span></h3>
            <div style="text-align:justify; margin-top:1.5rem;">${resposta.replace(/\n/g, '<br>')}</div>
        `;
        abrirModalResultado(html);
    };

   
    btnCafe.addEventListener("click", () => {
        const query = inputCafe.value.trim();
        if (query) {
            handleSearch(query);
        }
    });

   
    inputCafe.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            const query = inputCafe.value.trim();
            if (query) {
                handleSearch(query);
            }
        }
    });

    
    btnLimpar.addEventListener("click", () => {
        inputCafe.value = "";
        
        fecharModal();
        inputCafe.focus();
    });

    
    const btnSaibaMais = document.querySelector('.about .btn');
    const modalSobre = document.getElementById('modal-sobre');
    const fecharModalSobre = document.getElementById('fechar-modal-sobre');

    if (btnSaibaMais && modalSobre && fecharModalSobre) {
        btnSaibaMais.addEventListener('click', (e) => {
            e.preventDefault();
            modalSobre.style.display = 'flex';
        });
        fecharModalSobre.addEventListener('click', () => {
            modalSobre.style.display = 'none';
        });
        
        modalSobre.addEventListener('click', (e) => {
            if (e.target === modalSobre) {
                modalSobre.style.display = 'none';
            }
        });
    }

});