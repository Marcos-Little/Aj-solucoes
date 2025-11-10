document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carrosel');
    const items = document.querySelectorAll('.carrosel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelectorAll('.carrosel-indicador');

    let currentIndex = 0;
    const itemCount = items.length;
    let interval;

    // Função para atualizar o carrossel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Atualizar indicadores
        indicators.forEach((indicador, index) => {
            indicador.classList.toggle('active', index === currentIndex);
        });

        // Reiniciar o temporizador automático
        resetInterval();
    }

    // Navegação automática
    function startInterval() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }, 5000);
    }

    // Reiniciar intervalo ao interagir
    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    });

    // Navegação por indicadores
    indicators.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Iniciar navegação automática
    startInterval();

    // Pausar quando o mouse estiver sobre o carrossel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    carousel.addEventListener('mouseleave', () => {
        resetInterval();
    });

    // Configuração inicial
    updateCarousel();

    // Suporte para touch em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe para a esquerda - próximo item
            currentIndex = (currentIndex + 1) % itemCount;
        } else if (touchEndX > touchStartX + 50) {
            // Swipe para a direita - item anterior
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        }
        updateCarousel();
    }
});