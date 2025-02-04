// Sélection des éléments du DOM
const mailInput = document.getElementById("mailInput");
const passwordInput = document.getElementById("passwordInput");
const btnSignin = document.getElementById("btnSignin");

// Gestion des événements au clic sur le bouton "Connexion"
btnSignin.addEventListener("click", async function () {
    const email = mailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validation des champs
    if (!email || !password) {
        afficherErreur("Veuillez remplir tous les champs.");
        return;
    }

    console.log("Tentative de connexion avec :", { email, password });

    try {
        // Préparation des en-têtes et du corps de la requête
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ email, password });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        // Appel à l'API
        const response = await fetch("http://127.0.0.1:8000/api/login", requestOptions);

        console.log("Statut de la réponse :", response.status);

        // Gestion des erreurs de réponse HTTP
        if (!response.ok) {
            const error = await response.json();
            console.error("Erreur API :", error);
            afficherErreur(error.message || "Identifiants incorrects.");
            return;
        }

        // Lecture de la réponse JSON
        const result = await response.json();
        console.log("Connexion réussie :", result);

        // Vérifiez que le résultat contient les champs nécessaires
        if (!result.apiToken || !result.role) {
            afficherErreur("Réponse inattendue du serveur.");
            return;
        }

        // Stocker le token et le rôle dans localStorage
        localStorage.setItem("accessToken", result.apiToken);
        localStorage.setItem("role", result.role);
        document.cookie = `role=${result.role}; path=/;`;
        console.log("Rôle récupéré depuis localStorage :", localStorage.getItem("role"));

        afficherMessage("Connexion réussie !");
        console.log("Réponse API :", result);
        console.log("Rôle reçu de l'API :", result.role);
        setTimeout(() => {
            window.location.href = "/"; // Redirection après connexion
        }, 500);
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API :", error);
        afficherErreur("Impossible de contacter le serveur.");
    }
});

/**
 * Afficher un message d'erreur à l'utilisateur
 */
function afficherErreur(message) {
    mailInput.classList.add("is-invalid");
    passwordInput.classList.add("is-invalid");
    alert(`Erreur : ${message}`);
}

/**
 * Afficher un message de succès ou d'information
 */
function afficherMessage(message, type = "info") {
    alert(`${type.toUpperCase()} : ${message}`);
}

// Gestion des événements au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page chargée et prête.");
});
