$(document).ready(function () {
    // Página de Registro
    if ($('#register-form').length) {
        $('#register-form').on('submit', registerUser);
        $('#phone').on('input', maskPhone);
    }

    // Página de Login
    if ($('#login-form').length) {
        $('#login-form').on('submit', loginUser);
        $('#go-register').on('click', function () {
            window.location.href = 'register.html';
        });

        // Mensagem de sucesso após registro
        const params = new URLSearchParams(window.location.search);
        if (params.get('registered')) {
            showMessage('Cadastro realizado com sucesso!', 'success');
        }
    }

    // Página do Dashboard
    if ($('#user-card').length) {
        displayUserInfo();
    }
});

// Função de Registro
function registerUser(event) {
    event.preventDefault();

    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const password = $('#password').val();
    const photoFile = $('#photo')[0].files[0];

    // Validação
    if (!name || !email || !phone || !password || !photoFile) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }

    if (password.length < 4) {
        showMessage('A senha deve ter no mínimo 4 dígitos.', 'error');
        return;
    }

    // Ler a foto como Base64
    const reader = new FileReader();
    reader.onloadend = function () {
        const userData = {
            name,
            email,
            phone,
            password,
            photo: reader.result
        };
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = 'index.html?registered=true';
    };
    reader.readAsDataURL(photoFile);
}

// Função de Login
function loginUser(event) {
    event.preventDefault();

    const email = $('#login-email').val().trim();
    const password = $('#login-password').val();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        // Salvar sessão
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        showMessage('Email ou senha incorretos.', 'error');
    }
}

// Função para exibir mensagens
function showMessage(message, type) {
    const messageDiv = $('<div>', {
        class: `message ${type}`,
        text: message
    });

    $('.container').prepend(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Máscara do telefone
function maskPhone() {
    let value = $(this).val();
    $(this).val(phoneMask(value));
}

function phoneMask(value) {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.substring(0, 11); // Limitar a 11 dígitos
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    return value;
}

// Exibir informações do usuário no Dashboard
function displayUserInfo() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) return;

    // Verificar se o usuário está logado
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
        return;
    }

    // Configurar foto e mensagem na Navbar
    $('#navbar-photo').attr('src', storedUser.photo);
    $('#navbar-welcome').text('Bem-vindo ao sistema Desenvolvimento WEB I');

    // Configurar informações do Card
    $('#user-photo').attr('src', storedUser.photo);
    $('#user-name').text(storedUser.name);
    $('#user-email').text('Email: ' + storedUser.email);
    $('#user-phone').text('Telefone: ' + storedUser.phone);

    // Alternar detalhes do Card
    $('#user-card').on('click', function () {
        $('.card-details').slideToggle();
    });

    // Funcionalidade do Menu Dropdown
    $('.user-menu').on('click', function (event) {
        event.stopPropagation();
        $(this).toggleClass('show');
    });

    // Funcionalidade de Logout
    $('#logout').on('click', function () {
        sessionStorage.removeItem('loggedIn');
        window.location.href = 'index.html';
    });

    // Fechar dropdown ao clicar fora
    $(window).on('click', function () {
        if ($('.user-menu').hasClass('show')) {
            $('.user-menu').removeClass('show');
        }
    });
}
