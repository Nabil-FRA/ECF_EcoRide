document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JS chargé.");

    const form = document.getElementById("profileForm");

    if (!form) {
        console.error("❌ Formulaire 'profileForm' non trouvé !");
        return;
    }

    const submitButton = document.querySelector("#profileForm button[type='submit']");
    console.log("🔍 Bouton de soumission trouvé :", submitButton);

    if (submitButton) {
        submitButton.addEventListener("click", async (event) => {
            event.preventDefault(); // Empêche la soumission classique
            console.log("📩 Bouton 'Envoyer' cliqué.");

            // Récupération des champs du formulaire
            const pseudoElement = document.getElementById("pseudo");
            const telephoneElement = document.getElementById("telephone");
            const adresseElement = document.getElementById("adresse");
            const dateNaissanceElement = document.getElementById("dateNaissance");
            const plaqueElement = document.getElementById("plaque");
            const modeleElement = document.getElementById("modele");
            const marqueElement = document.getElementById("marque");
            const couleurElement = document.getElementById("couleur");

            console.log("🔎 Vérification des champs...");

            // Vérification de l'existence des champs
            if (!pseudoElement || !telephoneElement || !adresseElement || !dateNaissanceElement) {
                console.error("❌ Un des champs obligatoires est manquant !");
                return;
            }

            const formData = {
                pseudo: pseudoElement.value.trim(),
                telephone: telephoneElement.value.trim(),
                adresse: adresseElement.value.trim(),
                dateNaissance: dateNaissanceElement.value,
                plaque: plaqueElement.value.trim(),
                modele: modeleElement.value.trim(),
                marque: marqueElement.value.trim(),
                couleur: couleurElement.value.trim()
            };

            console.log("📋 Données du formulaire :", formData);

            // Vérification : au moins un champ doit être rempli
            const isFormEmpty = Object.values(formData).every(value => value === "");
            if (isFormEmpty) {
                console.warn("⚠️ Le formulaire est vide. Veuillez remplir au moins un champ.");
                alert("Veuillez remplir au moins un champ avant de soumettre.");
                return;
            }

            try {
                console.log("🚀 Envoi des données au serveur...");

                const response = await fetch("/api/profile", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(formData)
                });

                console.log("⏳ Attente de la réponse du serveur...");

                if (!response.ok) {
                    throw new Error(`❌ Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log("✅ Réponse du serveur :", data);

                if (data.message) {
                    alert(`✅ Succès : ${data.message}`);
                } else {
                    alert("✅ Profil mis à jour avec succès !");
                }
            } catch (error) {
                console.error("❌ Erreur lors de la mise à jour du profil :", error);
                alert("❌ Une erreur est survenue lors de la mise à jour du profil.");
            }
        });
    } else {
        console.error("❌ Bouton de soumission non trouvé !");
    }

    // Pré-remplissage du formulaire avec les données de l'utilisateur
    console.log("📥 Récupération des données du profil...");

    fetch("/api/profile", {
        method: "GET",
        credentials: "include"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`❌ Erreur HTTP lors de la récupération des données: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Données récupérées :", data);

            document.getElementById('pseudo').value = data.pseudo || '';
            document.getElementById('telephone').value = data.telephone || '';
            document.getElementById('adresse').value = data.adresse || '';
            document.getElementById('dateNaissance').value = data.dateNaissance || '';
            document.getElementById('plaque').value = data.plaque || '';
            document.getElementById('modele').value = data.modele || '';
            document.getElementById('marque').value = data.marque || '';
            document.getElementById('couleur').value = data.couleur || '';
        })
        .catch(error => console.error('❌ Erreur lors de la récupération du profil:', error));
});
