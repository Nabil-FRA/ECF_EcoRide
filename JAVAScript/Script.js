// Sélection des éléments nécessaires
const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");
const menuConnexion = document.getElementById("menuConnexion");

// Ajout de l'écouteur si le bouton "Déconnexion" existe
if (signoutBtn) {
    signoutBtn.addEventListener("click", signout);
}

// Vérifier l'état de connexion au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    checkUserStatus();
    showAndHideElementsForRoles();
});

/**
 * Vérifie si l'utilisateur est connecté et met à jour le menu
 */
function checkUserStatus() {
    const token = getToken();

    if (token) {
        // Utilisateur connecté
        menuConnexion.textContent = "Déconnexion";
        menuConnexion.href = "#";
        menuConnexion.addEventListener("click", signout);
    } else {
        // Utilisateur non connecté
        menuConnexion.textContent = "Connexion";
        menuConnexion.href = "/Signin";
    }
}

/**
 * Fonction pour gérer la déconnexion
 */
function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);
    alert("Vous avez été déconnecté.");
    window.location.reload(); // Recharge la page
}

/**
 * Récupérer le rôle de l'utilisateur
 */
function getRole() {
    return getCookie(RoleCookieName);
}

/**
 * Récupérer le token d'accès
 */
function getToken() {
    return getCookie(tokenCookieName);
}

/**
 * Définir un cookie
 */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * Récupérer un cookie
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * Effacer un cookie
 */
function eraseCookie(name) {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

/**
 * Vérifier si l'utilisateur est connecté
 */
function isConnected() {
    const token = getToken();
    return token !== null && token !== undefined && token !== ""; // Vérifie que le token n'est pas vide
}

/**
 * Affiche ou masque les éléments en fonction des rôles et de l'état de connexion
 */
function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();

    const allElementsToEdit = document.querySelectorAll("[data-show]");

    allElementsToEdit.forEach((element) => {
        switch (element.dataset.show) {
            case "disconnected":
                if (userConnected) {
                    element.classList.add("d-none");
                } else {
                    element.classList.remove("d-none");
                }
                break;

            case "connected":
                if (!userConnected) {
                    element.classList.add("d-none");
                } else {
                    element.classList.remove("d-none");
                }
                break;

            case "admin":
                if (!userConnected || role !== "admin") {
                    element.classList.add("d-none");
                } else {
                    element.classList.remove("d-none");
                }
                break;

            case "client":
                if (!userConnected || role !== "client") {
                    element.classList.add("d-none");
                } else {
                    element.classList.remove("d-none");
                }
                break;
        }
    });
}
