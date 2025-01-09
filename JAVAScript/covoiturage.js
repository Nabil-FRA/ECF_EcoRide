document.getElementById("ride-search-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    // Récupérer les valeurs des champs
    const departure = document.getElementById("departure").value;
    const arrival = document.getElementById("arrival").value;
    const date = document.getElementById("date").value;
  
    // Appeler une API fictive (ou réelle)
    try {
      const response = await fetch(`https://api.example.com/rides?departure=${departure}&arrival=${arrival}&date=${date}`);
      const results = await response.json();
  
      // Afficher les résultats
      displayResults(results);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  });
  
  function displayResults(results) {
    const container = document.getElementById("results-container");
    container.innerHTML = ""; // Vider les résultats précédents
  
    if (results.length === 0) {
      container.innerHTML = "<p>Aucun trajet trouvé. Essayez une autre date.</p>";
      return;
    }
  
    results.forEach((ride) => {
      const card = document.createElement("div");
      card.className = "result-card";
      card.innerHTML = `
        <h3>${ride.driver.name} (${ride.driver.rating}⭐)</h3>
        <img src="${ride.driver.photo}" alt="Photo du chauffeur" style="width: 100px; height: 100px; object-fit: cover;">
        <p>Départ : ${ride.departure_time}</p>
        <p>Arrivée : ${ride.arrival_time}</p>
        <p>Prix : ${ride.price}€</p>
        <p>Places disponibles : ${ride.available_seats}</p>
        <button>Voir les détails</button>
      `;
      container.appendChild(card);
    });
  }