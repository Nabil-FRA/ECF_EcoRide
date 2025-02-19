Description :

Dans le cadre de ma formation Graduate devloppeur full stack, j'ai réalisé cette une application web conçu pour encourage les déplaçements écologique par la mise en relation entre conducteurs et passagers qui souhaite faire un trajet avec des voiture éléctriques. 

Ce repository couvre la partie Front-end de l'application. voici la strucutre du projet : 
ecoride-frontend/
├── Images/         # Contient les images utilisées dans l'application
├── JavaScript/     # Contient les fichiers JS
├── Router/         # Gère la navigation côté client
├── Pages/          # Pages  de l'application (HTML)
├── scss/           # Fichiers SCSS (styles de l'application)
├── node_modules/   # Dépendances installées via npm
├── .gitignore      # Fichiers et dossiers ignorés par Git
├── index.html      # point d'entrée principal
├── package.json    # Fichier de configuration npm (scripts, dépendances)
├── package-lock.json
└── README.md       # Documentation du projet

Installation : 
1- Cloner le dépôt: excuter la commande 
" git clone https://github.com/Nabil-FRA/ECF_EcoRide.git"
"cd ECF_EcoRide "
2- Installer les dépendances : excuter la commande 
"npm install"
3- Installer les extensions sur VScode : PHP server et un compilateur SASS. 
4-Lancer l'application avec PHP Server.

Deploiment:

1 - Télécharger File zilla : https://filezilla-project.org/
2 - créer un compte sur l'hébergeur de site :  https://www.alwaysdata.com/fr/
3- Créer votre site en allant sur l'onglet sur l'onglet web puis cliquez sur site. 
4- dans la Configuration avancée copie coller ces instructions : 
RewriteEngine On
RewriteRule ^/[a-zA-Z0-9]+[/]?$ /index.html [QSA,L]

récupérer vos identifiants et les informations nécessaires à la connexion FTP.
5- déployer votre site via file zilla : 
Après connexion au serveur envoyer le contenu de votre site dans le dossier /www/
