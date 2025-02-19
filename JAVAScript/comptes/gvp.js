console.log("🚀 Script chargé !");

// ✅ Sélection des éléments du DOM
const radioButtons = document.querySelectorAll('input[name="statut"]');
const vehiculeBlock = document.getElementById('vehicule-block');
const btnSubmit = document.getElementById('btnSubmit');
const btnAddPref = document.getElementById('btnAddPref');
const customPrefInput = document.getElementById('customPref');
const customPrefValueInput = document.getElementById('customPrefValue');
const customPrefList = document.getElementById('customPrefList');
const fumeurCheckbox = document.getElementById('fumeur');
const animauxCheckbox = document.getElementById('animaux');
const voyageLink = document.getElementById('voyage-link');

// ✅ Fonction pour mettre à jour l'affichage du bloc véhicule et du lien "Saisir un voyage"
function updateVehiculeBlock() {
    const statut = document.querySelector('input[name="statut"]:checked')?.value || "passager";
    vehiculeBlock.style.display = (statut === 'chauffeur' || statut === 'both') ? 'block' : 'none';

    console.log(`🔄 Changement de statut : ${statut}`);

    // ✅ Afficher ou masquer le lien "Saisir un voyage"
    if (voyageLink) {
        voyageLink.style.display = (statut === 'chauffeur' || statut === 'both') ? "block" : "none";
        console.log((statut === 'chauffeur' || statut === 'both') ? "✅ Affichage du lien 'Saisir un voyage'" : "❌ Masquage du lien 'Saisir un voyage'");
    }
}

// 🎯 Écouteur d'événements pour changer l'affichage en fonction du statut sélectionné
radioButtons.forEach(rb => rb.addEventListener('change', updateVehiculeBlock));
updateVehiculeBlock(); // Initialisation au chargement

// ✅ Ajout des préférences personnalisées
btnAddPref?.addEventListener('click', () => {
    const prefKey = customPrefInput.value.trim();
    const prefValue = customPrefValueInput.value.trim();

    if (prefKey && prefValue) {
        const li = document.createElement('li');
        li.textContent = `${prefKey} = ${prefValue}`;
        customPrefList.appendChild(li);
        console.log(`✅ Préférence personnalisée ajoutée : ${prefKey} = ${prefValue}`);
        customPrefInput.value = '';
        customPrefValueInput.value = '';
    } else {
        alert("❌ Veuillez remplir les deux champs pour ajouter une préférence personnalisée.");
    }
});

// ✅ Gestion du clic sur "Valider"
btnSubmit?.addEventListener('click', async () => {
    console.log("✅ Bouton Valider cliqué !");

    const statut = document.querySelector('input[name="statut"]:checked')?.value || "passager";
    console.log("🛠️ Statut sélectionné :", statut);

    const isChauffeur = (statut === 'chauffeur' || statut === 'both');
    const isPassager = (statut === 'passager' || statut === 'both');

    console.log("🔄 isChauffeur:", isChauffeur, "isPassager:", isPassager);

    // 📌 Récupération de l'email et du token
    const userEmail = localStorage.getItem('userEmail');
    const authToken = localStorage.getItem("accessToken");

    if (!userEmail || !authToken) {
        console.error("❌ ERREUR : Aucun email ou token utilisateur trouvé !");
        alert("Erreur : Vous devez être connecté.");
        return;
    }

    console.log("📧 Email utilisateur :", userEmail);
    console.log("🔑 Token d'authentification :", authToken);

    try {
        // 1️⃣ **Mettre à jour le statut utilisateur**
        console.log("🚀 Envoi de la requête de mise à jour du statut...");
        const statusResponse = await fetch("http://127.0.0.1:8000/api/profile/status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                email: userEmail,
                isChauffeur: isChauffeur,
                isPassager: isPassager
            })
        });

        const statusData = await statusResponse.json();
        console.log("📩 Réponse API (status) :", statusData);

        if (!statusResponse.ok) {
            throw new Error(statusData.message || "Erreur lors de la mise à jour du statut.");
        }

        alert("✅ Statut mis à jour avec succès !");

        // 2️⃣ **Si l'utilisateur est chauffeur, enregistrer le véhicule et les préférences**
        if (isChauffeur) {
            console.log("🚗 L'utilisateur est chauffeur, enregistrement du véhicule...");

            const getValue = (id) => document.getElementById(id)?.value.trim() || null;
            const immat = getValue('immatriculation');
            const datePremiereImmat = getValue('datePremiereImmat');
            const marque = getValue('marque'); 
            const modele = getValue('modele');
            const couleur = getValue('couleur');
            const energie = document.getElementById('energie')?.value || null;

            if (!immat || !datePremiereImmat || !marque || !modele || !couleur || !energie) {
                console.error("❌ ERREUR : Tous les champs véhicule ne sont pas remplis !");
                alert("Veuillez remplir toutes les informations du véhicule.");
                return;
            }

            console.log("🛠️ Énergie sélectionnée :", energie);

            // ✅ **Préférences**
            const preferences = [];
            if (fumeurCheckbox.checked) preferences.push({ propriete: "fumeur", valeur: "oui" });
            if (animauxCheckbox.checked) preferences.push({ propriete: "animaux", valeur: "oui" });

            // ✅ **Ajout des préférences personnalisées**
            customPrefList.querySelectorAll('li').forEach(li => {
                const [propriete, valeur] = li.textContent.split(" = ");
                preferences.push({ propriete, valeur });
            });

            console.log("📋 Préférences à envoyer :", JSON.stringify(preferences));

            // 📌 Données à envoyer
            const voitureData = { immatriculation: immat, date_premiere_immatriculation: datePremiereImmat, modele, couleur, energie };

            console.log("📤 Données envoyées (register-chauffeur) :", JSON.stringify({
                email: userEmail,
                marque,
                voiture: voitureData,
                preferences
            }));

            const chauffeurResponse = await fetch("http://127.0.0.1:8000/api/profile/register-chauffeur", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify({ email: userEmail, marque, voiture: voitureData, preferences })
            });

            const rawResponse = await chauffeurResponse.text();
            console.log("📄 Réponse brute API (register-chauffeur) :", rawResponse);

            try {
                const chauffeurData = JSON.parse(rawResponse);
                console.log("📩 Réponse API (register-chauffeur) :", chauffeurData);

                if (!chauffeurResponse.ok) throw new Error(chauffeurData.message || "Erreur lors de l'enregistrement du chauffeur.");

                alert("✅ Chauffeur enregistré avec succès !");
            } catch (error) {
                console.error("❌ Erreur JSON lors du parsing :", error);
                alert("❌ Une erreur est survenue, réponse inattendue du serveur.");
            }
        }
    } catch (error) {
        console.error("❌ Erreur API :", error);
        alert("❌ Une erreur est survenue : " + error.message);
    }
});
