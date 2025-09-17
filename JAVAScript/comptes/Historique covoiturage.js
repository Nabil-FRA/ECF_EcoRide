console.log('Script chargé et exécuté.');

async function fetchHistory() {
    console.log('Début de la fonction fetchHistory');

    try {
        console.log('Envoi de la requête fetch vers l\'API...');
        const response = await fetch('https://ecoride75-c75920cb157e.herokuapp.com/mongo/historique_covoiturage');
        console.log('Réponse brute reçue :', response);

        if (!response.ok) {
            console.error('Erreur HTTP :', response.status);
            return;
        }

        console.log('Conversion de la réponse en JSON...');
        const data = await response.json();
        console.log('Données JSON récupérées :', data);

        const tableBody = document.querySelector('#history-table tbody');
        console.log('Élément tbody sélectionné :', tableBody);

        if (!tableBody) {
            console.error('Erreur : Élément #history-table tbody non trouvé');
            return;
        }

        console.log('Vidage de l\'élément tbody...');
        tableBody.innerHTML = '';

        console.log('Début du traitement des données...');
        data.forEach((item, index) => {
            console.log(`Traitement de l'élément ${index + 1} :`, item);

            let participants = item.participants.map((p, i) => {
                console.log(`Participant ${i + 1} :`, p);
                return `${p.name} (${p.role})`;
            }).join(', ');

            console.log('Participants formatés :', participants);

            let row = `<tr>
                <td>${item.covoiturage_id}</td>
                <td>${participants}</td>
                <td>${item.departure}</td>
                <td>${item.destination}</td>
                <td>${item.date_depart}</td>
                <td>${item.date_arrivee}</td>
                <td>${item.price} €</td>
                <td>${item.statut}</td>
            </tr>`;
            console.log('Ligne HTML créée :', row);

            console.log('Ajout de la ligne au tableau...');
            tableBody.innerHTML += row;
        });

        console.log('Toutes les données ont été traitées et affichées.');

    } catch (error) {
        console.error('Erreur dans fetchHistory :', error);
    } finally {
        console.log('Fin de la fonction fetchHistory.');
    }
}

console.log('Appel immédiat de fetchHistory...');
fetchHistory();


/// JavaScript pour afficher les covoiturages confirmés par l'utilisateur

const authToken = localStorage.getItem('accessToken');

fetch('https://ecoride75-c75920cb157e.herokuapp.com/mongo/confirmation_covoiturage', {
    method: 'GET',
    headers: new Headers({
        'Authorization': `Bearer ${authToken}`
    }),
    redirect: 'follow'
})
.then(response => response.json())
.then(data => {
    console.log('Données JSON reçues :', data);
    const container = document.getElementById('historique-confirme-container');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p>Aucun covoiturage confirmé trouvé.</p>';
        return;
    }

    const table = document.createElement('table');
    table.border = '1';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Lieu Départ</th>
                <th>Lieu Arrivée</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Crédits Utilisés</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');
    data.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.covoiturage.lieuDepart}</td>
            <td>${item.covoiturage.lieuArrivee}</td>
            <td>${item.covoiturage.dateDepart}</td>
            <td>${item.covoiturage.heureDepart}</td>
            <td>${item.creditsUtilises}</td>
        `;
        tbody.appendChild(tr);
    });

    container.appendChild(table);
})
.catch(error => {
    console.error('Erreur lors de la récupération de l\'historique :', error);
    document.getElementById('historique-confirme-container').innerHTML = '<p>Erreur de chargement.</p>';
});
