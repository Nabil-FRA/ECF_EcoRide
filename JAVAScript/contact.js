// Sélectionner les éléments du formulaire
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('Nameinput');
const prenomInput = document.getElementById('Prenominput');
const emailInput = document.getElementById('Emailinput');
const messageInput = document.getElementById('Messageinput');

// Fonction pour valider les champs requis
function validateRequired(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour valider l'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Ajouter des validations en temps réel
form.addEventListener('input', (event) => {
    const input = event.target;

    if (input === emailInput) {
        if (input.value.trim() && !isValidEmail(input.value)) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
        } else {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
        }
    } else {
        validateRequired(input);
    }
});

// Ajouter une validation à la soumission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche la soumission par défaut

    let isFormValid = true;

    // Valider chaque champ
    [nameInput, prenomInput, emailInput, messageInput].forEach((input) => {
        const isFieldValid = validateRequired(input);
        if (!isFieldValid) isFormValid = false;

        if (input === emailInput && !isValidEmail(input.value)) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            isFormValid = false;
        }
    });

    // Si tout est valide
    if (isFormValid) {
        alert('Message envoyé avec succès !');
        form.submit();
    }
});