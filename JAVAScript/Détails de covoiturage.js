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

  // JavaScript pour le bouton 'Participer' sur la page des détails de covoiturage

document.getElementById('btnParticiper').addEventListener('click', function() {
  console.log('Bouton Participer cliqué');
  const token = localStorage.getItem('accessToken');
  console.log('Token récupéré :', token);

  const covoiturageId = scriptTag.getAttribute('data-covoiturage-id');
  console.log('ID du covoiturage :', covoiturageId);

  if (!token) {
      console.log('Utilisateur non connecté');
      alert('Vous devez être connecté pour participer !');
      window.location.href = '/Signin';
      return;
  }

  if (confirm('Voulez-vous vraiment utiliser 2 crédits pour participer à ce covoiturage ?')) {
      console.log('Confirmation acceptée');
      const requestOptions = {
          method: "POST",
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          redirect: 'follow'
      };

      console.log('Envoi de la requête fetch...');
      fetch(`http://127.0.0.1:8000/api/covoiturage/${covoiturageId}/participer?confirm=true`, requestOptions)
          .then(response => {
              console.log('Réponse reçue :', response);
              return response.json();
          })
          .then(result => {
              console.log('Résultat JSON :', result);
              if (result.message.includes('confirmée')) {
                  alert('Participation réussie !');
                  window.location.reload();
              } else {
                  alert(result.message);
              }
          })
          .catch(error => console.error('Erreur lors de la requête fetch :', error));
  } else {
      console.log('Confirmation annulée');
  }
});