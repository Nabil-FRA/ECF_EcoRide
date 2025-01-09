 // Sélectionner le formulaire et l'email
 const form = document.getElementById('passwordResetForm');
 const emailInput = document.getElementById('Emailinput');

 // Fonction pour valider l'email
 function isValidEmail(email) {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailRegex.test(email);
 }

 // Validation en temps réel
 emailInput.addEventListener('input', () => {
     if (isValidEmail(emailInput.value)) {
         emailInput.classList.add("is-valid");
         emailInput.classList.remove("is-invalid");
     } else {
         emailInput.classList.remove("is-valid");
         emailInput.classList.add("is-invalid");
     }
 });

 // Soumission du formulaire
 form.addEventListener('submit', (event) => {
     event.preventDefault();

     if (isValidEmail(emailInput.value)) {
         alert("Un lien de réinitialisation a été envoyé à votre adresse email.");
         form.reset();
         emailInput.classList.remove("is-valid", "is-invalid");
     } else {
         emailInput.classList.add("is-invalid");
         alert("Veuillez entrer une adresse email valide.");
     }
 });