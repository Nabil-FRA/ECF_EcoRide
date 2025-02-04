submitButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page si nécessaire
    console.log("📩 Bouton 'Valider' cliqué."); // Log de confirmation du clic

    const employeeName = document.getElementById("employeeName").value.trim();
    const employeePrenom = document.getElementById("employeePrenom").value.trim();
    const employeeEmail = document.getElementById("employeeEmail").value.trim();
    const employeePassword = document.getElementById("employeePassword").value.trim();

    if (!employeeName || !employeePrenom || !employeeEmail || !employeePassword) {
        alert("⚠️ Veuillez remplir tous les champs.");
        console.warn("❗ Champs manquants !");
        return;
    }

    const requestData = {
        nom: employeeName,
        prenom: employeePrenom,
        email: employeeEmail,
        password: employeePassword,
        role: "employee"
    };

    console.log("📦 Données envoyées à l'API :", requestData);

    try {
        const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        console.log("📡 Requête envoyée à l'API. En attente de réponse...");

        if (response.ok) {
            const result = await response.json();
            console.log("✅ Compte employé créé avec succès :", result);
            alert("✅ Compte employé créé avec succès !");
            createEmployeeForm.reset();
            addAccountToList(result);
        } else {
            const errorData = await response.json();
            console.error("❌ Erreur lors de la création du compte :", errorData);
            alert("❌ Erreur lors de la création du compte : " + (errorData.message || "Erreur inconnue."));
        }
    } catch (error) {
        console.error("❌ Erreur réseau :", error);
        alert("❌ Une erreur réseau s'est produite. Veuillez réessayer plus tard.");
    }
});

console.log("🎯 Événement 'click' attaché au bouton !"); // Ajouter ce log ici
