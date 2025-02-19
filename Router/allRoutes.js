import Route from "./Route.js";

// Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/Pages/home.html",[]),
    new Route("/Signin", "Connexion", "/Pages/Auth/Signin.html",[], "/JAVAScript/auth/Signin.js"),
    new Route("/Signup", "Inscription", "/Pages/Auth/Signup.html",[], "/JAVAScript/auth/Signup.js"),
    new Route("/Account", "Mon compte", "/Pages/Auth/Account.html",[], "/JAVAScript/auth/Acount.js"),
    new Route("/restpassword", "Réinitialiser-mdp", "/Pages/Auth/reset-password.html", "/JAVAScript/auth/reset-password.js"),
    new Route("/Contact", "Contact", "/Pages/Contact.html",[], "/JAVAScript/contact.js"),
    new Route("/Motdepasse", "Mot de passe", "/Pages/Auth/mot de pass.html",[], "/JAVAScript/auth/mot de passe.js"),
    new Route("/Covoiturage", "Covoiturage", "/Pages/Covoiturage.html",[], "/JAVAScript/covoiturage.js"),
    new Route("/Compteadmin", "Compteadmin", "/Pages/Auth/admincompte.html",[], "/JAVAScript/CRA.js"),
    new Route("/clientinfo", "clientinfo", "/Pages/Compte_client/Client.html",[], "/JAVAScript/comptes/profiles.js"),
    new Route("/createcovoiturage", "createcovoiturage", "/Pages/Compte_client/Createcovoiturage.html", [],"/JAVAScript/comptes/gvp.js"),
    new Route("/detailcovoiturage/:id", "Détail Covoiturage", "/Pages/Détail de covoiturage.html", [], "/JAVAScript/Détails de covoiturage.js"),
    new Route("/saisirvoyage", "saisirvoyage", "/Pages/Compte_client/Saisir_voyage.html", [], "/JAVAScript/comptes/saisirvoyage.js"),
    new Route("/CreateEMP", "CreateEMP", "/Pages/Auth/Gerer_les_comptes_utilisateur.html", [], "/JAVAScript/comptes/Gerer_les_comptes_utilisateur.js"),
    new Route("/stat", "stat", "/Pages/Compte_client/statistique_EcoRide.html", [], "/JAVAScript/comptes/stat.js"),
    new Route("/historique", "historique", "/Pages/Compte_client/Historique covoiturage.html", [], "/JAVAScript/comptes/Historique covoiturage.js")
];

// Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";