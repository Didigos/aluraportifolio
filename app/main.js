document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('mensagem');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário para permitir validação

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        let isValid = true;

        // Limpar mensagens de erro
        clearErrors();

        // Validação do nome
        if (nameValue === '') {
            showError(nameInput, 'O campo nome é obrigatório.');
            isValid = false;
        } else if (nameValue.length < 3) {
            showError(nameInput, 'O nome deve ter pelo menos 3 caracteres.');
            isValid = false;
        }

        // Validação do email
        if (emailValue === '') {
            showError(emailInput, 'O campo e-mail é obrigatório.');
            isValid = false;
        } else if (!validateEmail(emailValue)) {
            showError(emailInput, 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        // Validação da mensagem
        if (messageValue === '') {
            showError(messageInput, 'O campo mensagem é obrigatório.');
            isValid = false;
        } else if (messageValue.length < 10) {
            showError(messageInput, 'A mensagem deve ter pelo menos 10 caracteres.');
            isValid = false;
        }

        // Se o formulário for válido, envie-o
        if (isValid) {
            form.submit();
        }
    });

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        formGroup.appendChild(errorElement);
        input.classList.add('error');
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function (message) {
            message.remove();
        });

        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(function (input) {
            input.classList.remove('error');
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
