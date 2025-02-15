// 🔑 Récupération du token API stocké dans localStorage (comme sur la page de connexion)
console.log("🔑 Token stocké :", localStorage.getItem("accessToken"));

const storedToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

// ✅ Vérifier si un token est disponible, sinon rediriger vers la page de connexion
if (!storedToken) {
    console.error("❌ Aucun token trouvé ! L'utilisateur doit se reconnecter.");
    alert("Vous devez vous reconnecter.");
    window.location.href = "/login"; // Redirection vers la page de connexion
}

// 📌 Création du token au bon format
const token = `Bearer ${storedToken}`;
console.log("🔑 Token utilisé :", token);

// 🔧 Sélection des éléments du DOM
const form = document.getElementById("covoiturage-form");
const voitureSelect = document.getElementById("voitureId");

// 📡 Préparation des headers pour les requêtes API
const myHeaders = new Headers();
myHeaders.append("Authorization", token);
myHeaders.append("Content-Type", "application/json");

// 🚗 Récupération des voitures de l'utilisateur
console.log("📡 Envoi de la requête pour récupérer les voitures...");

fetch("http://127.0.0.1:8000/api/voitures/utilisateur", {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
})
.then(response => {
    console.log("🔍 Réponse brute de l'API voitures :", response);
    return response.json();
})
.then(data => {
    console.log("🚗 Voitures reçues :", data);

    if (data.message) {
        alert("⚠️ Aucune voiture trouvée. Ajoutez-en une avant de créer un covoiturage.");
        return;
    }

    voitureSelect.innerHTML = ""; // Nettoyer la liste pour éviter les doublons
    const addedVoitures = new Set();

    data.forEach(voiture => {
        if (!addedVoitures.has(voiture.id)) {
            let option = document.createElement("option");
            option.value = voiture.id;
            option.textContent = `${voiture.marque} ${voiture.modele}`;
            voitureSelect.appendChild(option);
            addedVoitures.add(voiture.id);
        }
    });

    console.log("🚗 Liste des voitures affichées :", Array.from(addedVoitures));
})
.catch(error => console.error("❌ Erreur lors du chargement des voitures :", error));

// 🚀 Gestion du formulaire de création de covoiturage
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page

    // 📌 Récupération des données du formulaire
    const formData = {
        lieuDepart: document.getElementById("lieuDepart").value.trim(),
        lieuArrivee: document.getElementById("lieuArrivee").value.trim(),
        prixPersonne: parseFloat(document.getElementById("prixPersonne").value),
        dateDepart: document.getElementById("dateDepart").value,
        heureDepart: document.getElementById("heureDepart").value,
        dateArrivee: document.getElementById("dateArrivee").value,
        heureArrivee: document.getElementById("heureArrivee").value,
        nbPlace: parseInt(document.getElementById("nbPlace").value, 10),
        statut: document.getElementById("statut").value,
        voitureId: parseInt(document.getElementById("voitureId").value, 10)
    };

    // 📌 Vérification des champs obligatoires
    if (!formData.lieuDepart || !formData.lieuArrivee || !formData.prixPersonne || !formData.voitureId) {
        alert("⚠️ Tous les champs doivent être remplis !");
        console.error("❌ Erreur : Un ou plusieurs champs sont vides.");
        return;
    }

    console.log("📤 Envoi des données de création de covoiturage :", formData);

    fetch("http://127.0.0.1:8000/api/covoiturage/creer", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(formData),
        redirect: "follow"
    })
    .then(response => {
        console.log("📝 Réponse brute du serveur (status) :", response.status);
        console.log("📝 Réponse brute du serveur (headers) :", response.headers);

        return response.json().catch(() => {
            console.error("❌ Erreur : réponse serveur non valide JSON !");
            return null;
        });
    })
    .then(data => {
        console.log("📩 Réponse JSON reçue :", data);

        if (!data) {
            alert("❌ Erreur : réponse invalide du serveur.");
            return;
        }

        if (data.message) {
            console.warn("⚠️ Message du serveur :", data.message);
            alert(`ℹ️ ${data.message}`);
        } else {
            alert("✅ Covoiturage créé avec succès !");
            form.reset();
        }
    })
    .catch(error => console.error("❌ Erreur lors de la création du covoiturage :", error));
});

// ✅ Gestion des événements au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Page covoiturage prête.");
});
