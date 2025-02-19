const tokenKey = "accessToken";

/**
 * Met à jour la barre de navigation en fonction de l'état de connexion
 */
function updateNavbar() {
    const isLoggedIn = Boolean(localStorage.getItem(tokenKey)); // Vérifie si un token est présent
    console.log("État de connexion (isLoggedIn) :", isLoggedIn);

    // Affiche ou masque les éléments en fonction de l'état de connexion
    document.querySelectorAll("[data-show='connected']").forEach((el) => {
        el.style.display = isLoggedIn ? "block" : "none";
        console.log("Élément connecté :", el, "Visible :", isLoggedIn);
    });

    document.querySelectorAll("[data-show='disconnected']").forEach((el) => {
        el.style.display = isLoggedIn ? "none" : "block";
        console.log("Élément déconnecté :", el, "Visible :", !isLoggedIn);
    });
}

/**
 * Déconnexion de l'utilisateur
 */
function signout() {
    console.log("Déconnexion déclenchée");
    localStorage.removeItem(tokenKey); // Supprime le token
    alert("Vous avez été déconnecté.");
    updateNavbar(); // Met à jour la navigation
    window.location.href = "/Signin"; // Redirige vers la page de connexion
}

// Gestion des événements au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM chargé, mise à jour de la barre de navigation");
    updateNavbar(); // Met à jour l'affichage initial

    // Gestionnaire d'événement pour le bouton "Déconnexion"
    const signoutBtn = document.getElementById("signout-btn");
    if (signoutBtn) {
        signoutBtn.addEventListener("click", (event) => {
            event.preventDefault();
            signout();
        });
    }
});
