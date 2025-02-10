console.log("🚀 Fichier covoiturage.js bien chargé !");

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

            const response = await fetch(url);
            console.log("📨 Réponse HTTP reçue :", response.status);

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
