//____________________Récupération Formulaire commande
let formulaire = document.querySelector("#champForm");
// _______________________________validation formulaire
function afficherForm() {
    formulaire.addEventListener("submit", function (e) {
        e.preventDefault();
        // recuperation des valeurs du formulaire
        const contacts = {
            firstName: document.querySelector("#prenom").value,
            lastName: document.querySelector("#nom").value,
            address: document.querySelector("#adresse").value,
            city: document.querySelector("#ville").value,
            zip: document.querySelector("#codePostal").value,
            email: document.querySelector("#email").value
        };
        //__________________Validation formulaire méthode regExp
        const regExTexte = (value) => {
            return /^([A-Za-z]{3,19})?([-]{0,1})?([A-Za-z]{0,19})$/.test(value);
        };
        const regExcodePostal = (value) => {
            return /^[0-9]{5}$/.test(value);
        };
        const regExEmail = (value) => {
            return /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/.test(value);
        };
        const regExAdresse = (value) => {
            return /^[A-Za-z0-9\s]{5,50}$/.test(value);
        };
        function prenomControle() {  //validation contrôle du prenom
            const lePrenom = contacts.firstName;
            if (regExTexte(lePrenom)) {
                return true;
            } else {
                const alertPrenon = document.querySelector("#alertePrenom");
                alertPrenon.innerHTML = "Le champ ne doit contenir que des lettres";
                return false;
            }
        };
        function nomControle() {  //validation contrôle du nom
            const leNom = contacts.lastName;
            if (regExTexte(leNom)) {
                return true;
            } else {
                const alertNon = document.querySelector("#alerteNom");
                alertNon.innerHTML = "Le champ ne doit contenir que des lettres";
                return false;
            }
        };
        function codePostalControle() {  //validation contrôle du codePostal
            const lecodePostal = contacts.zip;
            if (regExcodePostal(lecodePostal)) {
                return true;
            } else {
                const alerteCodePostal = document.querySelector("#alerteCodePostal");
                alerteCodePostal.innerHTML = "Le champ ne doit contenir que des chiffres";
                return false;
            }
        };
        function villeControle() {  //validation contrôle du prenom
            const laVille = contacts.city;
            if (regExTexte(laVille)) {
                return true;
            } else {
                const alerteVille = document.querySelector("#alerteVille");
                alerteVille.innerHTML = "Le champ ne doit contenir que des lettres";
                return false;
            }
        };
        function emailControle() {  //validation contrôle du mail
            const leEmail = contacts.email;
            if (regExEmail(leEmail)) {
                return true;
            } else {
                const alerteEmail = document.querySelector("#alerteEmail");
                alerteEmail.innerHTML = "Le champ doit contenir une adresse mail";
                return false;
            }
        };
        function adresseControle() {   //validation contrôle adresse
            const leAdresse = contacts.address;
            if (regExAdresse(leAdresse)) {
                return true;
            } else {
                const alerteAdresse = document.querySelector("#alerteAdresse");
                alerteAdresse.innerHTML = "Le champ ne doit contenir que des lettres et chiffres";
                return false;
            }
        };
        //Controle de la validite du formulaire avant l'envoie dans le localstorage
        if (prenomControle() && nomControle() && codePostalControle() && emailControle() && adresseControle() && villeControle()) {
            // mettre l'objet contacts et le prix total dans le localstorage
            localStorage.setItem("contacts", JSON.stringify(contacts));
            localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

            //mettre les valeurs du formulaire et produits selectionnés dans un objet à envoyer au serveur
            const aEnvoyer = {
                contact: contacts,
                products: itemsLocalStorage.map((peluche) => {
                    return peluche._id;
                })
            };
            envoieVersServeur(aEnvoyer);
        }
        else {
            alert("Attention en remplissant le formulaire de validation");
        };
    });
}
afficherForm(localStorage.getItem('product'));
// ...........................fin validation formulaire

function envoieVersServeur(aEnvoyer) {
    ////envoyer une requête HTTP de type POST au service web se trouvant à l'adresse  http://
    //Envoie de l'objet aEnvoyer vers le serveur
    const promise01 = fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        body: JSON.stringify(aEnvoyer),
        headers: {
            "content-Type": "application/json",
        },
    });
    //Voir le résultat du serveur dans la console
    promise01.then(async (response) => {
        // si promesse non résolue, rejet
        try {
            const contenu = await response.json();
            if (response.ok) {
                console.log(`résultat : ${response.ok}`)
                //deposer l'ID de commande dans le localstorage
                localStorage.setItem("responseId", contenu.orderId);
                //aller vers la page conformation
                window.location = "confirmation.html";
            }
            else {
                console.log(`réponse erreur : ${response.status}`)
            };
        }
        catch (e) {
            console.log(e)
        };
    });
}
//mettre le contenu des champs du formulaire dans le localStorage pour éviter la réécriture au client
//prendre la clé dans le localStorage et mettre dans une variable
const dataLocalStorage = localStorage.getItem("contacts");

//convertir la chaine de caractère en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//Fonction pour mettre les valeurs du localStorage dans les champs du formulaire
function enregistrerImputDuLocalS(input, fieldName) {
    if (dataLocalStorageObjet == null) {
    }
    else {
        document.querySelector(`#${input}`).value = dataLocalStorageObjet[fieldName];
    }
};
enregistrerImputDuLocalS("prenom", "firstName");
enregistrerImputDuLocalS("nom", "lastName");
enregistrerImputDuLocalS("adresse", "address");
enregistrerImputDuLocalS("ville", "city");
enregistrerImputDuLocalS("codePostal", "zip");
enregistrerImputDuLocalS("email", "email");