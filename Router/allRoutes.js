import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/Signin", "Connexion", "/Pages/Auth/Signin.html"),
    new Route("/Signup", "Inscription", "/Pages/Auth/Signup.html", "/JAVAScript/auth/Signup.js"),
    new Route("/Account", "Mon compte", "/Pages/Auth/Account.html"),
    new Route("/Contact", "Contact", "/Pages/Contact.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";