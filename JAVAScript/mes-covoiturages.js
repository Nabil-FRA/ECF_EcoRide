document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('mes-covoiturages-container');
    const authToken = localStorage.getItem('accessToken');

    if (!authToken) {
        container.innerHTML = '<p>Veuillez vous connecter pour voir vos covoiturages.</p>';
        return;
    }

    // --- ÉTAPE 1 : AFFICHER LES COVOITURAGES ---
    fetch('https://ecoride75-c75920cb157e.herokuapp.com/api/covoiturage/mes-covoiturages', {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de réseau ou du serveur.');
        }
        return response.json();
    })
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
            // On ajoute des classes CSS pour pouvoir sélectionner les cellules plus facilement
            tableHTML += `
                <tr id="covoit-row-${covoit.id}">
                    <td>${covoit.lieuDepart}</td>
                    <td>${covoit.lieuArrivee}</td>
                    <td>${new Date(covoit.dateDepart).toLocaleDateString()}</td>
                    <td>${covoit.prixPersonne} €</td>
                    <td class="statut-cell">${covoit.statut}</td>
                    <td class="action-cell">
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

    // --- ÉTAPE 2 : GÉRER LE CLIC SUR "ANNULER" ---
    container.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-annuler')) {
            const covoiturageId = event.target.dataset.id;
            
            if (!confirm(`Êtes-vous sûr de vouloir annuler ?`)) {
                return;
            }

            try {
                const response = await fetch(`https://ecoride75-c75920cb157e.herokuapp.com/api/covoiturage/${covoiturageId}/annuler`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    alert(result.message);
                    
                    // NOUVELLE LOGIQUE : On vérifie la réponse de l'API
                    // Si l'API nous renvoie un covoiturage avec le statut "annulé", c'est que le chauffeur a annulé.
                    if (result.covoiturage && result.covoiturage.statut === 'annulé') {
                        const row = document.getElementById(`covoit-row-${covoiturageId}`);
                        if (row) {
                            const statutCell = row.querySelector('.statut-cell');
                            const actionCell = row.querySelector('.action-cell');
                            
                            // On met à jour la cellule du statut
                            statutCell.textContent = 'annulé';
                            statutCell.style.color = 'red';
                            statutCell.style.fontWeight = 'bold';
                            
                            // On vide la cellule d'action (supprime le bouton)
                            actionCell.innerHTML = '';
                        }
                    } else {
                        // Sinon, c'est un passager qui a annulé, on supprime la ligne.
                        document.getElementById(`covoit-row-${covoiturageId}`).remove();
                    }
                } else {
                    alert(`Erreur: ${result.message}`);
                }
            } catch(error) {
                console.error("Erreur lors de l'appel d'annulation:", error);
                alert("Une erreur technique est survenue.");
            }
        }
    });
});