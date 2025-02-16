console.log("🚀 Fichier covoiturage.js bien chargé !");
//--------------------------------------------------------------------------------------------------------
// 🆕 Lecture des paramètres GET et soumission automatique sans DOMContentLoaded

const params = new URLSearchParams(window.location.search);
const depart = params.get('depart');
const arrivee = params.get('arrivee');
const date = params.get('date');

if (depart && arrivee && date) {
    console.log("🔍 Paramètres reçus :", { depart, arrivee, date });

    // Remplir automatiquement les champs
    document.getElementById("depart").value = depart;
    document.getElementById("arrivee").value = arrivee;
    document.getElementById("date").value = date;

    // Ne pas soumettre automatiquement ici
    console.log("📋 Champs remplis automatiquement. Attente de la soumission manuelle...");
}

//----------------------------------------------------------------------------------------
// 🌍 Vérification de l'état du document
if (document.readyState === "complete" || document.readyState === "interactive") {
    console.log("✅ DOM était déjà chargé, exécution immédiate !");
    initCovoiturage();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        console.log("🚀 DOM complètement chargé via `DOMContentLoaded` !");
        initCovoiturage();
    });
}

// ✅ Fonction principale
function initCovoiturage() {
    console.log("🎯 Initialisation de la page Covoiturage...");

    // Sélection du formulaire et bouton
    const searchForm = document.getElementById("search-form");
    const searchButton = searchForm?.querySelector('button[type="submit"]');

    if (!searchForm) {
        console.error("❌ ERREUR : Formulaire introuvable !");
        return;
    }
    console.log("✔️ Formulaire détecté :", searchForm);

    if (!searchButton) {
        console.error("❌ ERREUR : Bouton 'Rechercher' introuvable !");
        return;
    }
    console.log("✔️ Bouton 'Rechercher' détecté :", searchButton);

    // 🚀 Debug : Capture du clic sur le bouton
    searchButton.addEventListener("click", function () {
        console.log("🖱️ Clic détecté sur le bouton Rechercher !");
    });

    // ✅ Écoute de l'événement `submit` pour empêcher le rechargement de la page
    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // ⚠️ Empêche le rechargement
        console.log("🔄 Formulaire soumis, récupération des valeurs...");

        // 📌 Récupération des valeurs du formulaire
        const depart = document.getElementById("depart")?.value.trim();
        const arrivee = document.getElementById("arrivee")?.value.trim();
        const date = document.getElementById("date")?.value.trim();

        console.log(`📡 Départ: ${depart}, Arrivée: ${arrivee}, Date: ${date}`);

        if (!depart || !arrivee || !date) {
            console.warn("⚠️ Tous les champs sont obligatoires !");
            alert("Veuillez remplir tous les champs.");
            return;
        }

        try {
            // 📡 Envoi de la requête API
            const url = `http://127.0.0.1:8000/api/covoiturage/search?depart=${encodeURIComponent(depart)}&arrivee=${encodeURIComponent(arrivee)}&date=${encodeURIComponent(date)}`;
            console.log("🚀 Requête envoyée à :", url);

            const response = await fetch(url, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                } 
              });
            console.log("📨 Réponse HTTP reçue :", response.status);
            console.log("🍪 Cookies disponibles :", document.cookie);


            const data = await response.json();
            console.log("📊 Données reçues :", data);

            // 📌 Sélection des sections de résultats
            const resultsSection = document.getElementById("results-section");
            const resultsContainer = document.getElementById("results-container");
            const noResultsSection = document.getElementById("no-results-section");
            const suggestedDate = document.getElementById("suggested-date");

            // 🗑️ Nettoyage de la section résultats
            resultsContainer.innerHTML = "";

            if (response.ok && data.length > 0) {
                resultsSection.style.display = "block";
                noResultsSection.style.display = "none";

                data.forEach(covoiturage => {
                    const card = document.createElement("div");
                    card.classList.add("covoiturage-card");

                    card.innerHTML = `
                        <div class="covoiturage-card">
                            <div class="chauffeur">
                                <img src="${covoiturage.chauffeur.photo ? `data:image/jpeg;base64,${covoiturage.chauffeur.photo}` : 'default-avatar.png'}" alt="Photo du chauffeur" class="chauffeur-photo">
                                <p><strong>${covoiturage.chauffeur.pseudo}</strong></p>
                                <p>⭐ Note : ${covoiturage.chauffeur.note}/5</p>
                            </div>
                            <div class="details">
                                <p>🛑 Départ : <strong>${covoiturage.dateDepart} à ${covoiturage.heureDepart}</strong></p>
                                <p>🏁 Arrivée : <strong>${covoiturage.dateArrivee} à ${covoiturage.heureArrivee}</strong></p>
                                <p>🚗 Places restantes : <strong>${covoiturage.placesRestantes}</strong></p>
                                <p>💰 Prix : <strong>${covoiturage.prix}€</strong></p>
                                <p>${covoiturage.ecologique ? "🌱 Voyage écologique" : "🚘 Voyage classique"}</p>
                            </div>
                        </div>
                        <button class="btn-detail" data-id="${covoiturage.id}">Détails</button>
                    `;
                    resultsContainer.appendChild(card);

                    document.addEventListener("click", (event) => {
                      if (event.target.classList.contains("btn-detail")) {
                          const covoiturageId = event.target.getAttribute("data-id");
                          window.location.href = `/detailcovoiturage/${covoiturageId}`;
                      }
                  });
                      
                });
            } else {
                resultsSection.style.display = "none";
                noResultsSection.style.display = "block";
                suggestedDate.textContent = data.prochain_covoiturage ? `Prochain covoiturage disponible : ${data.prochain_covoiturage}` : "Aucune alternative trouvée.";
            }
        } catch (error) {
            console.error("❌ Erreur API :", error);
            alert("❌ Une erreur est survenue : " + error.message);
        }
      
    });
}

/**************************************************************************
 * [FILTRES] Ajout minimal à la fin de covoiturage.js
 **************************************************************************/

console.log("🚀 [filters] Ajout du code de filtrage !");

// Sélection des éléments HTML pour les filtres et les résultats
const filterSection = document.getElementById("filter-section");
const filterForm = document.getElementById("filter-form");
const resultsSection = document.getElementById("results-section");
const resultsContainer = document.getElementById("results-container");

// Vérifie que tout existe
if (!filterSection || !filterForm || !resultsSection || !resultsContainer) {
    console.warn("⚠️ Éléments introuvables. Filtres inopérants.");
} else {
    // Surveiller le style de #results-section pour afficher/cacher #filter-section
    // (Facultatif si tu veux afficher le filtre tout le temps)
    const observer = new MutationObserver(() => {
        if (resultsSection.style.display !== "none") {
            filterSection.style.display = "block";  // Montre les filtres
            console.log("🎉 Section filtres visible !");
        } else {
            filterSection.style.display = "none";   // Cache les filtres
            console.log("🚫 Section filtres masquée !");
        }
    });
    observer.observe(resultsSection, { attributes: true, attributeFilter: ["style"] });

    // Soumission du formulaire de filtres
    filterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("📝 Formulaire de filtres soumis.");

        // Récupère les valeurs
        const ecologique = document.getElementById("ecologique").checked ? "1" : "";
        const prixMax = document.getElementById("prixMax").value;
        const dureeMax = document.getElementById("dureeMax").value;
        const noteMin = document.getElementById("noteMin").value;

        // Construit l'URL pour /api/covoiturage/filter
        let filterUrl = "http://127.0.0.1:8000/api/covoiturage/filter?";

        if (ecologique) filterUrl += `ecologique=${ecologique}&`;
        if (prixMax) filterUrl += `prixMax=${prixMax}&`;
        if (dureeMax) filterUrl += `dureeMax=${dureeMax}&`;
        if (noteMin) filterUrl += `noteMin=${noteMin}&`;

        // Retire le dernier "&" s'il existe
        filterUrl = filterUrl.replace(/&$/, "");
        console.log("🔎 URL de filtrage :", filterUrl);

        // Affiche les cookies dispos pour debug
        console.log("🍪 Cookies disponibles :", document.cookie);

        // Appel Fetch pour récupérer la liste filtrée
        fetch(filterUrl, {
            method: "GET",             // (1) On précise la méthode
            credentials: "include",    // (2) On envoie les cookies (PHPSESSID)
            headers: {
                "Content-Type": "application/json" // (3) Indique qu'on gère du JSON
            }
        })
        .then(resp => {
            console.log("📨 Réponse HTTP reçue :", resp.status);
            return resp.json();
        })
        .then(data => {
            console.log("📊 Données filtrées reçues :", data);
            // Vider la zone de résultats
            resultsContainer.innerHTML = "";

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(cov => {
                    const card = document.createElement("div");
                    card.classList.add("covoiturage-card");
                    card.innerHTML = `
                        <div class="covoiturage-card">
                            <div class="chauffeur">
                                <img src="${cov.chauffeur.photo ? `data:image/jpeg;base64,${cov.chauffeur.photo}` : 'default-avatar.png'}" alt="Photo du chauffeur" class="chauffeur-photo">
                                <p><strong>${cov.chauffeur.pseudo}</strong></p>
                                <p>⭐ Note : ${cov.chauffeur.note}/5</p>
                            </div>
                            <div class="details">
                                <p>🛑 Départ : <strong>${cov.dateDepart} à ${cov.heureDepart}</strong></p>
                                <p>🏁 Arrivée : <strong>${cov.dateArrivee} à ${cov.heureArrivee}</strong></p>
                                <p>🚗 Places restantes : <strong>${cov.placesRestantes}</strong></p>
                                <p>💰 Prix : <strong>${cov.prix}€</strong></p>
                                <p>${cov.ecologique ? "🌱 Voyage écologique" : "🚘 Voyage classique"}</p>
                            </div>
                        </div>
                        <button class="btn-detail" data-id="${cov.id}">Détails</button>
                    `;
                    resultsContainer.appendChild(card);
                });
            } else {
                resultsContainer.innerHTML = "<p>Aucun covoiturage ne correspond à ces filtres.</p>";
            }
        })
        .catch(err => {
            console.error("❌ Erreur lors du filtrage :", err);
            alert("❌ Une erreur est survenue : " + err.message);
        });
    });
}

console.log("✅ [filters] Filtres initialisés !");
