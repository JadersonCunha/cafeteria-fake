document.addEventListener('DOMContentLoaded', () => {
    const btnTop = document.getElementById("btn-top");
    const inputCafe = document.getElementById("input-cafe");
    const btnCafe = document.getElementById("btn-cafe");
    const btnLimpar = document.getElementById("btn-limpar");
    const cartCountSpan = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const cartFechar = document.getElementById('cart-fechar');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalValue = document.getElementById('cart-total-value');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const btnPagar = document.getElementById('cart-pagar');
    const pagamentoModal = document.querySelector('.pagamento-modal');
    const fecharPagamentoModal = document.querySelector('.fechar-pagamento-modal');
    const pagamentoForm = document.getElementById('pagamento-form');
    const modalResultado = document.getElementById('modal-resultado');
    const fecharModalResultado = document.getElementById('fechar-modal-resultado');
    const conteudoResultado = document.getElementById('conteudo-resultado');
    const btnSaibaMais = document.querySelector('.about .btn');
    const modalSobre = document.getElementById('modal-sobre');
    const fecharModalSobre = document.getElementById('fechar-modal-sobre');
    let cart = [];

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

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <span>${item.name}</span>
                    <span> x${item.quantity}</span>
                </div>
                <div class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-from-cart" data-index="${index}">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        cartTotalValue.textContent = total.toFixed(2);
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.style.display = cart.length > 0 ? 'block' : 'none';
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        }
    });

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    cartFechar.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    btnPagar.addEventListener('click', () => {
        cartModal.style.display = 'none';
        pagamentoModal.style.display = 'flex';
    });

    fecharPagamentoModal.addEventListener('click', () => {
        pagamentoModal.style.display = 'none';
    });

    pagamentoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        abrirModalResultado('<h2 class="title-box">Pagamento Concluído!</h2><p style="text-align: center; font-size: 1.5rem; color: var(--main-color);">Seu pagamento foi processado com sucesso.</p>');
        pagamentoModal.style.display = 'none';
        cart = [];
        updateCart();
    });
});
