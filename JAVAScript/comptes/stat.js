/* public/js/stats.js */
const authToken = localStorage.getItem("accessToken");

fetch("http://127.0.0.1:8000/api/stats", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    const ctx1 = document.getElementById('covoituragesChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: data.covoiturages.map(item => item.jour),
            datasets: [{
                label: 'Covoiturages par jour',
                data: data.covoiturages.map(item => item.total),
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });

    const ctx2 = document.getElementById('creditsChart').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: data.credits.map(item => item.jour),
            datasets: [{
                label: 'Crédits par jour',
                data: data.credits.map(item => parseInt(item.credits)),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true
            }]
        }
    });

    console.log('TotalCredits:', data.totalCredits);

    document.getElementById('totalCredits').textContent = `Total de crédits gagnés : ${data.totalCredits}`;
})
.catch(error => console.error('Erreur lors du chargement des statistiques :', error));