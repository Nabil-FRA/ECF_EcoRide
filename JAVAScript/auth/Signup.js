// Sélection des éléments nécessaires
const formButton = document.querySelector('.btn.btn-primary.inscription');
const formInscription = document.getElementById("formulaire-d-inscription");


// Validation des champs

/**
 * Vérifie si un champ est rempli
 * @param {HTMLInputElement} input 
 * @returns {boolean}
 */
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

/**
 * Vérifie si un email est valide
 * @param {string} email 
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Vérifie si un mot de passe est valide
 * @param {string} password 
 * @returns {boolean}
 */
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Gestion du formulaire

/**
 * Valide les champs du formulaire
 * @returns {boolean}
 */
function validateForm() {
    let isFormValid = true;

    // Récupération des champs
    const nameInput = document.getElementById('Nameinput');
    const prenomInput = document.getElementById('Prenominput');
    const emailInput = document.getElementById('Emailinput');
    const passwordInput = document.getElementById('PasswordInput');
    const validatePasswordInput = document.getElementById('ValidatePasswordInput');

    // Valider les champs obligatoires
    [nameInput, prenomInput, emailInput, passwordInput, validatePasswordInput].forEach(input => {
        if (!validateRequired(input)) isFormValid = false;
    });

    // Valider l'email
    if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
        alert("Veuillez entrer une adresse email valide.");
        isFormValid = false;
    }

    // Valider le mot de passe
    if (passwordInput.value.trim() && !isValidPassword(passwordInput.value)) {
        passwordInput.classList.remove("is-valid");
        passwordInput.classList.add("is-invalid");
        alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
        isFormValid = false;
    }

    // Vérifier la correspondance des mots de passe
    if (passwordInput.value !== validatePasswordInput.value) {
        validatePasswordInput.classList.remove("is-valid");
        validatePasswordInput.classList.add("is-invalid");
        alert("Les mots de passe ne correspondent pas.");
        isFormValid = false;
    }

    return isFormValid;
}

/**
 * Envoie les données à l'API et redirige en cas de succès
 */
async function submitForm() {
    // Récupérer les données du formulaire
    const dataForm = new FormData(formInscription);

    // Convertir les données en JSON
    const raw = JSON.stringify({
        nom: dataForm.get("nom"),        // Correspondance avec l'API
        prenom: dataForm.get("prenom"), // Correspondance avec l'API
        email: dataForm.get("email"),
        password: dataForm.get("mdp"),  // Correspondance avec l'API
    });

    console.log("Données envoyées :", raw);

    // Configurer la requête
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: raw,
        redirect: 'follow'
    };

    try {
        // Envoyer la requête à l'API
        const response = await fetch("https://ecoride75-c75920cb157e.herokuapp.com/api/register", requestOptions);

        if (response.ok) {
            const result = await response.json(); // Utilisation de JSON si la réponse est au format JSON
            alert("Inscription réussie !");
            console.log("Réponse de l'API :", result);

            // Rediriger l'utilisateur après une inscription réussie
            window.location.href = "/Signin"; // Remplacez "/home" par l'URL cible
        } else {
            const error = await response.json(); // Parse JSON pour une erreur bien formatée
            console.error("Erreur de l'API :", error);
            alert("Erreur lors de l'inscription : " + (error.message || "Détails non disponibles."));
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur réseau, veuillez réessayer plus tard.");
    }
}

// Ajout de l'événement au bouton
formButton.addEventListener('click', (event) => {
    event.preventDefault(); // Empêche la soumission par défaut

    // Valider et soumettre le formulaire si tout est correct
    if (validateForm()) {
        submitForm();
    }
});
