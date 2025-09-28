document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('mes-covoiturages-container');
    const authToken = localStorage.getItem('accessToken'); // Récupérer le token de l'utilisateur

    if (!authToken) {
        container.innerHTML = '<p>Veuillez vous connecter pour voir vos covoiturages.</p>';
        return;
    }

    // Étape 1 : Récupérer et afficher les covoiturages de l'utilisateur
    fetch('https://ecoride75-c75920cb157e.herokuapp.com/api/covoiturage/mes-covoiturages', {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!data || data.length === 0) {
            container.innerHTML = '<p>Vous n\'avez aucun covoiturage à venir.</p>';
            return;
        }

        let tableHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Départ</th>
                        <th>Arrivée</th>
                        <th>Date</th>
                        <th>Prix</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>`;

        data.forEach(covoit => {
            tableHTML += `
                <tr id="covoit-row-${covoit.id}">
                    <td>${covoit.lieuDepart}</td>
                    <td>${covoit.lieuArrivee}</td>
                    <td>${new Date(covoit.dateDepart).toLocaleDateString()}</td>
                    <td>${covoit.prixPersonne} €</td>
                    <td>${covoit.statut}</td>
                    <td>
                        <button class="btn-annuler" data-id="${covoit.id}">Annuler</button>
                    </td>
                </tr>`;
        });

        tableHTML += '</tbody></table>';
        container.innerHTML = tableHTML;
    })
    .catch(error => {
        console.error('Erreur:', error);
        container.innerHTML = '<p>Erreur lors du chargement de vos covoiturages.</p>';
    });

    // Étape 2 : Gérer le clic sur un bouton "Annuler"
    container.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-annuler')) {
            const covoiturageId = event.target.dataset.id;
            
            if (!confirm(`Êtes-vous sûr de vouloir annuler ce covoiturage ?`)) {
                return;
            }

            const response = await fetch(`https://ecoride75-c75920cb157e.herokuapp.com/api/covoiturage/${covoiturageId}/annuler`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                document.getElementById(`covoit-row-${covoiturageId}`).remove(); // Supprime la ligne du tableau
            } else {
                alert(`Erreur: ${result.message}`);
            }
        }
    });
});