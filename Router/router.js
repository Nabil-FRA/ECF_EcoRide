import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// ✅ Définition de la fonction loadAdminFeatures
function loadAdminFeatures() {
    console.log("🔧 Fonctionnalités Admin chargées !");
    // Ajoutez ici des fonctionnalités spécifiques pour l'admin
}

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html", []);

const getRouteByUrl = (url) => {
    let currentRoute = allRoutes.find(route => route.url === url);
    return currentRoute ? currentRoute : route404;
};

function getRole() {
    let role = localStorage.getItem("role");
    if (!role) {
        console.warn("⚠️ Rôle absent de localStorage, tentative depuis les cookies...");
        role = getCookie("role");
    }
    console.log("🔍 Rôle détecté :", role);

    const roleMap = {
        "admin": "ROLE_ADMIN",
        "employee": "ROLE_EMPLOYEE",
        "client": "ROLE_CLIENT"
    };

    return roleMap[role] || "ROLE_UNKNOWN";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

function isConnected() {
    return Boolean(localStorage.getItem("accessToken"));
}

function showAndHideElementsForRoles(role) {
    console.log("🔍 Gestion des éléments pour le rôle :", role);

    const adminSection = document.getElementById("admin-section");
    const employeeSection = document.getElementById("employee-section");
    const clientSection = document.getElementById("client-section");

    if (adminSection) adminSection.style.display = "none";
    if (employeeSection) employeeSection.style.display = "none";
    if (clientSection) clientSection.style.display = "none";

    switch (role) {
        case "ROLE_ADMIN":
            if (adminSection) {
                adminSection.style.display = "block";
                loadAdminFeatures(); // ✅ Appel de la fonction ici
                console.log("👑 Section ADMIN affichée !");
            }
            break;
        case "ROLE_EMPLOYEE":
            if (employeeSection) {
                employeeSection.style.display = "block";
                console.log("👷 Section EMPLOYÉ affichée !");
            }
            break;
        case "ROLE_CLIENT":
            if (clientSection) {
                clientSection.style.display = "block";
                console.log("👤 Section CLIENT affichée !");
            }
            break;
        default:
            console.warn("❌ Rôle inconnu après conversion :", role);
    }
}

const LoadContentPage = async () => {
    console.log("🔄 Début du chargement de la page...");

    const path = window.location.pathname;
    const actualRoute = getRouteByUrl(path);
    console.log("🌍 URL détectée :", path);
    console.log("📌 Route trouvée :", actualRoute);

    const allRolesArray = actualRoute.authorize || [];

    if (allRolesArray.length > 0) {
        const roleUser = getRole();
        console.log("🔍 Vérification du rôle utilisateur :", roleUser);

        if (allRolesArray.includes("disconnected") && isConnected()) {
            console.warn("🚫 Accès interdit aux utilisateurs connectés !");
            window.location.replace("/");
            return;
        }

        if (!allRolesArray.includes(roleUser)) {
            console.warn("🚫 Accès interdit pour ce rôle !");
            window.location.replace("/Signin");
            return;
        }
    }

    try {
        const response = await fetch(actualRoute.pathHtml);
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        const html = await response.text();
        document.getElementById("main-page").innerHTML = html;
        console.log("✅ Page chargée avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors du chargement de la page :", error);
    }

    if (actualRoute.pathJS) {
        const scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", actualRoute.pathJS);
        scriptTag.onload = () => console.log(`✅ ${actualRoute.pathJS} chargé avec succès !`);
        scriptTag.onerror = () => console.error(`❌ Erreur lors du chargement de ${actualRoute.pathJS}`);
        document.body.appendChild(scriptTag);
    }
    

    document.title = actualRoute.title + " - " + websiteName;

    const userRole = getRole();
    showAndHideElementsForRoles(userRole);
};

const routeEvent = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    LoadContentPage();
};

window.onpopstate = LoadContentPage;
window.route = routeEvent;
LoadContentPage();
