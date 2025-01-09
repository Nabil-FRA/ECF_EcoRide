import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/Signin", "Connexion", "/Pages/Auth/Signin.html", "/JAVAScript/auth/Signin.js"),
    new Route("/Signup", "Inscription", "/Pages/Auth/Signup.html", "/JAVAScript/auth/Signup.js"),
    new Route("/Account", "Mon compte", "/Pages/Auth/Account.html"),
    new Route("/Contact", "Contact", "/Pages/Contact.html", "/JAVAScript/contact.js"),
    new Route("/Motdepasse", "Motdepasse", "/Pages/Auth/mot de pass.html", "/JAVAScript/auth/mot de passe.js"),
    new Route("/Covoiturage", "Covoiturage", "/Pages/Covoiturage.html", "/JAVAScript/covoiturage.js"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";