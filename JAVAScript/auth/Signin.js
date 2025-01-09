const mailInput = document.getElementById("Emailinput");
const passwordInput = document.getElementById("InputPassword");
const btnSingin = document.getElementById("btnSignin");

btnSingin.addEventListener("click", checkCredentials);
function checkCredentials (){
    //Ici il faudra appeler l'API pour vérifier les credentials en BDD

    if(mailInput.value =="test@mail.com" && passwordInput.value =="123") {
        alert("vous êtes connecté");

        //Il faudra récupérer le vrai token
        const token = "dkjjfnkjqsdnfjkqsnjkfnqjknjkqnfqkfjqdjknjk";
        setToken(token)
        //placer ce token en cookie
        setCookie(RoleCookieName, "admin", 7);  
        window.location.replace("/");
    }
    else{
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}