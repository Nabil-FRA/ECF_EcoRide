// 1️⃣ Récupérer le token depuis localStorage
const ADMIN_TOKEN = localStorage.getItem("accessToken");

// 2️⃣ Vérifier qu'on a bien un token
if (!ADMIN_TOKEN) {
  console.error("Aucun token trouvé dans localStorage");
  alert("Vous devez être connecté pour accéder à cette page.");
} else {
  // 3️⃣ Récupérer la liste des utilisateurs
  fetch('http://127.0.0.1:8000/api/admin/utilisateurs', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + ADMIN_TOKEN,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.json();
  })
  .then(users => {
    console.log('Utilisateurs récupérés :', users);

    // Récupération du <tbody> dans le DOM
    const tableBody = document.querySelector('#user-table tbody');
    if (!tableBody) {
      console.error('Élément #user-table tbody introuvable dans le DOM.');
      return;
    }

    // 4️⃣ Afficher les utilisateurs dans le tableau
    users.forEach(user => {
      const row = document.createElement('tr');

      // ID
      const cellId = document.createElement('td');
      cellId.textContent = user.id;
      row.appendChild(cellId);

      // Nom
      const cellNom = document.createElement('td');
      cellNom.textContent = user.nom;
      row.appendChild(cellNom);

      // Prénom
      const cellPrenom = document.createElement('td');
      cellPrenom.textContent = user.prenom;
      row.appendChild(cellPrenom);

      // Email
      const cellEmail = document.createElement('td');
      cellEmail.textContent = user.email;
      row.appendChild(cellEmail);

      // Rôles
      const cellRole = document.createElement('td');
      cellRole.textContent = user.role;
      row.appendChild(cellRole);

      // Action (Bouton Suspendre)
      const cellAction = document.createElement('td');
      const suspendButton = document.createElement('button');
      suspendButton.textContent = 'Suspendre';

      // 🚫 Gérer la suspension de l'utilisateur
      suspendButton.addEventListener('click', () => {
        if (!confirm(`Voulez-vous suspendre l'utilisateur ID ${user.id} ?`)) {
          return;
        }

        fetch(`http://127.0.0.1:8000/api/admin/utilisateur/suspend/${user.id}`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + ADMIN_TOKEN,
            'Content-Type': 'application/json'
          }
        })
        .then(resp => resp.json())
        .then(data => {
          alert(data.message || JSON.stringify(data));
          // location.reload(); // Optionnel : rafraîchir la page
        })
        .catch(err => {
          console.error('Erreur suspension :', err);
          alert('Erreur de suspension');
        });
      });

      cellAction.appendChild(suspendButton);
      row.appendChild(cellAction);

      // Ajout de la ligne au tableau
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Erreur :', error);
    alert('Une erreur est survenue : ' + error.message);
  });
}
