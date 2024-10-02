$(document).ready(function() {
    // Verifica se existem cards no localStorage
    let cards = JSON.parse(localStorage.getItem('cards')) || [];

    // Função para exibir mensagens
    function showMessage(message, type) {
        $('.message').remove();
        $('.container').prepend(`<div class="message ${type}">${message}</div>`);
        setTimeout(function() {
            $('.message').fadeOut(500, function() { $(this).remove(); });
        }, 3000);
    }

    // Função para exibir os cards
    function displayCards() {
        $('.container').html(`
            <h1>Seus Cards</h1>
            <div id="card-container"></div>
            <div class="button-group">
                <button id="voltar">Voltar</button>
            </div>
        `);

        if (cards.length === 0) {
            $('#card-container').html('<p>Você ainda não criou nenhum card.</p>');
        } else {
            cards.forEach(function(card, index) {
                $('#card-container').append(`
                    <div class="card">
                        <p>${card}</p>
                        <div class="card-buttons">
                            <button class="deletar-card" data-index="${index}">Deletar</button>
                        </div>
                    </div>
                `);
            });
        }
    }

    // Função para exibir o formulário
    function displayForm() {
        $('.container').html(`
            <h1>Criar um Card</h1>
            <form id="card-form">
                <label for="input-novo-texto">Texto do Card</label>
                <input type="text" id="input-novo-texto" placeholder="Digite o texto do card..." required>
                <div class="button-group">
                    <button type="submit" id="botao-criar-card">Criar Card</button>
                    <button type="button" id="ver-cards">Ver Cards</button>
                </div>
            </form>
        `);
    }

    // Exibe o formulário inicialmente
    displayForm();

    // Evento para criar um novo card
    $(document).on('submit', '#card-form', function(event) {
        event.preventDefault();
        let cardText = $('#input-novo-texto').val();
        if (cardText.trim() !== '') {
            cards.push(cardText);
            localStorage.setItem('cards', JSON.stringify(cards));
            showMessage('Card criado com sucesso!', 'success');
            $('#input-novo-texto').val('');
        } else {
            showMessage('Por favor, insira o texto do card.', 'error');
        }
    });

    // Evento para visualizar os cards
    $(document).on('click', '#ver-cards', function() {
        displayCards();
    });

    // Evento para voltar ao formulário
    $(document).on('click', '#voltar', function() {
        displayForm();
    });

    // Evento para deletar um card
    $(document).on('click', '.deletar-card', function() {
        let index = $(this).data('index');
        cards.splice(index, 1);
        localStorage.setItem('cards', JSON.stringify(cards));
        showMessage('Card deletado com sucesso!', 'success');
        displayCards();
    });
});
