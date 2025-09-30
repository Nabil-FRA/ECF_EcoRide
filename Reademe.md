Prérequis :
La seule chose dont vous avez besoin sur votre machine est Docker et Docker Compose.
Docker Desktop (qui inclut Docker Compose). Toutes les autres dépendances (Node.js, npm etc.) sont gérées à l'intérieur du conteneur.
1.	Clonez le projet :
git clone https://github.com/Nabil-FRA/ECF_EcoRide.git
cd nom-du-dossier-projet

2.	Lancez le conteneur :
Cette commande va construire l'image Docker (la première fois) et démarrer le service en arrière-plan : docker-compose up --build -d.
Votre application front-end est maintenant accessible à l'adresse http://localhost:3000 (ou tout autre port que vous avez configuré dans docker-compose.yml).
