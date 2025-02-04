document.addEventListener("DOMContentLoaded", () => {
    console.log("🔄 Chargement de la page Mon Compte...");

    // Vérifier si l'utilisateur est connecté
    if (!isConnected()) {
        alert("Vous devez être connecté pour accéder à cette page.");
        window.location.href = "/Signin";
        return;
    }

    // Récupérer le rôle de l'utilisateur depuis localStorage
    const userRole = localStorage.getItem("role");
    console.log("🔍 Rôle récupéré depuis localStorage :", userRole);

    // Vérifier si le rôle est valide
    if (!userRole) {
        alert("Erreur d'authentification. Veuillez vous reconnecter.");
        window.location.href = "/Signin";
        return;
    }

    // Vérifier que les sections existent avant de les afficher
    const adminSection = document.getElementById("admin-section");
    const employeeSection = document.getElementById("employee-section");
    const clientSection = document.getElementById("client-section");

    console.log("📌 Vérification des sections HTML :");
    console.log("Admin Section :", adminSection ? "✅ Présente" : "❌ Absente");
    console.log("Employee Section :", employeeSection ? "✅ Présente" : "❌ Absente");
    console.log("Client Section :", clientSection ? "✅ Présente" : "❌ Absente");

    // Affichage des sections en fonction du rôle
    switch (userRole) {
        case "admin":
        case "ROLE_ADMIN":
            if (adminSection) {
                adminSection.style.display = "block";
                loadAdminFeatures();
                console.log("👑 Affichage de la section ADMIN");
            }
            break;

        case "employee":
        case "ROLE_EMPLOYEE":
            if (employeeSection) {
                employeeSection.style.display = "block";
                loadEmployeeFeatures();
                console.log("👷 Affichage de la section EMPLOYÉ");
            }
            break;

        case "client":
        case "ROLE_CLIENT":
            if (clientSection) {
                clientSection.style.display = "block";
                loadClientFeatures();
                console.log("👤 Affichage de la section CLIENT");
            }
            break;

        default:
            alert("Rôle inconnu, accès interdit.");
            window.location.href = "/Signin";
            return;
    }
});

// Fonction pour vérifier si l'utilisateur est connecté
function isConnected() {
    return Boolean(localStorage.getItem("accessToken"));
}

// Exemple de fonctions pour charger les fonctionnalités
function loadAdminFeatures() {
    console.log("⚙️ Chargement des fonctionnalités ADMIN...");
}

function loadEmployeeFeatures() {
    console.log("⚙️ Chargement des fonctionnalités EMPLOYÉ...");
}

function loadClientFeatures() {
    console.log("⚙️ Chargement des fonctionnalités CLIENT...");
}
