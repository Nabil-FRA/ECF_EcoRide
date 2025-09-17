const form = document.getElementById('passwordResetForm');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const urlParams = new URLSearchParams(window.location.search);
const resetToken = urlParams.get('token'); // Récupère le token depuis l'URL

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (newPassword !== confirmPassword) {
        confirmPasswordInput.classList.add("is-invalid");
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    try {
        const response = await fetch("https://ecoride75-c75920cb157e.herokuapp.com/api/reset-password", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword, resetToken })
        });

        if (response.ok) {
            alert("Votre mot de passe a été réinitialisé avec succès.");
            window.location.replace("/Signin"); // Redirige vers la page de connexion
        } else {
            const error = await response.json();
            alert(error.message || "Une erreur est survenue.");
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur réseau, veuillez réessayer plus tard.");
    }
});
