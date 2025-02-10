const scriptTag = document.querySelector('script[data-covoiturage-id]');
const covoiturageId = scriptTag ? scriptTag.getAttribute("data-covoiturage-id") : null;

if (!covoiturageId) {
    console.error("❌ Aucun ID de covoiturage trouvé !");
    alert("Une erreur est survenue : aucun covoiturage sélectionné.");
    window.location.href = "/Covoiturage"; // Redirection en cas d'erreur
}

// Construire l'URL de l'API avec l'ID
const url = `http://127.0.0.1:8000/api/covoiturage/details/${covoiturageId}`;
console.log(`🔍 Récupération des détails pour le covoiturage ID: ${covoiturageId}`);

fetch(url, {
  method: "GET",
  redirect: "follow"
})
  .then((response) => response.json())
  .then((result) => {
    // Charger les détails principaux
    document.getElementById("chauffeur-name").textContent = `Chauffeur: ${result.chauffeur?.pseudo || 'Inconnu'}`;
    document.getElementById("chauffeur-note").textContent = `Note: ${result.chauffeur?.note || 'Non spécifiée'}`;
    document.getElementById("chauffeur-photo").textContent = `Photo: ${result.chauffeur?.photo || 'Non disponible'}`;
    
    // Charger les informations du véhicule
    document.getElementById("vehicule-marque").textContent = `Marque: ${result.vehicule?.marque || 'Non spécifiée'}`;
    document.getElementById("vehicule-modele").textContent = `Modèle: ${result.vehicule?.modele || 'Non spécifié'}`;
    document.getElementById("vehicule-energie").textContent = `Énergie: ${result.vehicule?.energie || 'Non spécifiée'}`;

    // Charger les préférences du conducteur
    const preferencesList = document.getElementById("preferences-list");
    result.preferences.forEach(pref => {
      const li = document.createElement("li");
      li.textContent = `${pref.propriete}: ${pref.valeur}`;
      preferencesList.appendChild(li);
    });

    // Charger les avis du conducteur
    const avisList = document.getElementById("avis-list");
    result.avis.forEach(avis => {
      const li = document.createElement("li");
      li.textContent = `Note: ${avis.note} - Commentaire: ${avis.commentaire}`;
      avisList.appendChild(li);
    });

    // Charger les autres informations
    document.getElementById("date-depart").textContent = `Date de départ: ${result.dateDepart}`;
    document.getElementById("heure-depart").textContent = `Heure de départ: ${result.heureDepart}`;
    document.getElementById("places-restantes").textContent = `Places restantes: ${result.placesRestantes}`;
    document.getElementById("prix").textContent = `Prix: ${result.prix} €`;
  })
  .catch((error) => console.error("Erreur lors de la récupération des détails:", error));