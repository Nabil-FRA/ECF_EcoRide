// Sélectionner les éléments du formulaire
const form = document.querySelector('form');
const inputs = [ // Liste des champs à valider
    document.getElementById('Nameinput'),
    document.getElementById('Prenominput'),
    document.getElementById('Emailinput'),
    document.getElementById('PasswordInput'),
    document.getElementById('ValidatePasswordInput')
];

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

// Fonction pour valider le mot de passe (8 caractères minimum, complexité)
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Ajouter un écouteur d'événement pour la validation en temps réel (keyup)
inputs.forEach((input) => {
    input.addEventListener('keyup', () => {
        validateRequired(input);

        // Validation spécifique pour l'email
        if (input.id === 'Emailinput') {
            if (input.value.trim() && !isValidEmail(input.value)) {
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
            } else {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
            }
        }

        // Validation spécifique pour le mot de passe
        if (input.id === 'PasswordInput') {
            if (input.value.trim() && !isValidPassword(input.value)) {
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
            } else {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
            }
        }

        // Validation spécifique pour la confirmation de mot de passe
        if (input.id === 'ValidatePasswordInput') {
            const passwordInput = document.getElementById('PasswordInput');
            if (input.value !== passwordInput.value) {
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
            } else {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
            }
        }
    });
});

// Ajouter un écouteur d'événement pour la soumission du formulaire
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche la soumission par défaut

    let isFormValid = true;

    // Activer la validation pour chaque champ
    inputs.forEach((input) => {
        const isFieldValid = validateRequired(input);
        if (!isFieldValid) {
            isFormValid = false; // Marque le formulaire comme invalide si un champ échoue
        }
    });

    // Validation spécifique pour l'email
    const emailInput = document.getElementById('Emailinput');
    if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
        alert("Veuillez entrer une adresse email valide.");
        isFormValid = false;
    }

    // Validation spécifique pour le mot de passe
    const passwordInput = document.getElementById('PasswordInput');
    if (passwordInput.value.trim() && !isValidPassword(passwordInput.value)) {
        passwordInput.classList.remove("is-valid");
        passwordInput.classList.add("is-invalid");
        alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
        isFormValid = false;
    }

    // Validation spécifique pour les mots de passe
    const validatePasswordInput = document.getElementById('ValidatePasswordInput');
    if (passwordInput.value !== validatePasswordInput.value) {
        validatePasswordInput.classList.remove("is-valid");
        validatePasswordInput.classList.add("is-invalid");
        alert('Les mots de passe ne correspondent pas.');
        isFormValid = false;
    }

    // Si toutes les validations passent
    if (isFormValid) {
        alert('Inscription réussie !');
        form.submit(); // Soumet le formulaire
    }
});

