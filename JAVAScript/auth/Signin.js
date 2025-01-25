const mailInput = document.getElementById("Emailinput");
const passwordInput = document.getElementById("InputPassword");
const btnSignin = document.getElementById("btnSignin");
const apiUrl = "http://127.0.0.1:8000/api/";

/**
 * Gère la connexion de l'utilisateur
 */
btnSignin.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = mailInput.value.trim();
    const password = passwordInput.value.trim();

    // Vérification des champs vides
    if (!email || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Préparer la requête
    const headers = new Headers({ "Content-Type": "application/json" });
    const body = JSON.stringify({ email, password });

    try {
        const response = await fetch(apiUrl + "login", {
            method: "POST",
            headers,
            body,
        });

        // Vérifier la réponse
        if (response.ok) {
            const data = await response.json();
            console.log("Connexion réussie :", data);

            // Stocker le token et le rôle
            setCookie("accesstoken", data.apiToken, 7);
            setCookie("role", data.role || "client", 7);

            alert("Connexion réussie !");
            window.location.replace("/"); // Rediriger vers la page d'accueil
        } else {
            const error = await response.json();
            alert(error.message || "Identifiants incorrects");
            console.error("Erreur API :", error);
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur réseau, veuillez réessayer.");
    }
});

/**
 * Définir un cookie
 */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
}
