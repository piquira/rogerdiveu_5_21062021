//_________________________________________Formulaire commande
function afficherFormulaire () {
    //selection element du DOM pour la position formulaire
    const positionElement5 = document.querySelector(".bon_commande");
    const structureFormulaire =`
         <div class="col-sm-6">			
            <form action="#">
                <div class="form-group">
                    <label for="prenom">Prénom :</label>
                    <input type="text" id="prenom" name="prenom" required class="form-control"  />
                </div>
                <div class="form-group">
                    <label for="nom">Nom :</label>
                    <input type="text" id="nom" name="nom" required class="form-control"  />
                </div>
                <div class="form-group">
                    <label for="adresse">Adresse :</label>
                    <textarea id="adresse" name="adresse" required class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label for="ville">Ville :</label>
                    <input type="text" id="ville" name="ville" required class="form-control"  />
                </div>
                <div class="form-group">
                    <label for="codePostal">Code postal :</label>
                    <input type="text" id="codePostal" name="codePostal" required class="form-control"/>
                </div>
                <div class="form-group">
                    <label for="email">Courriel :</label>
                    <input type="email" id="email" name="email"  required class="form-control"/>
                </div>
                <br />
                <button type="submit" name="valider" id="envoyerFormulaire" class="btn btn-primary">Valider</button>
            </form>
        </div>`;
    //insertion du html
    positionElement5.insertAdjacentHTML("afterbegin", structureFormulaire);
};
//affichage formulaire
afficherFormulaire();

// _______________________________validation formulaire
//selection du bouton envoyer le formulaire
const btnEnvoieFormulaire = document.querySelector("#envoyerFormulaire");
function showForm() {
    //addEvenListener
    btnEnvoieFormulaire.addEventListener("click", (e) => {
        e.preventDefault();
        // recuperation des valeurs du formulaire
        const formulaireValues = {
            firstName: document.querySelector("#prenom").value,
            lastName: document.querySelector("#nom").value,
            address: document.querySelector("#adresse").value,
            city: document.querySelector("#ville").value,
            zip: document.querySelector("#codePostal").value,
            email: document.querySelector("#email").value
        };
        //__________________Validation formulaire méthode regEx
        const textAlert = (value) => {
            return value + ":Erreur à corriger au niveau du formulaire"
        };
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
            const lePrenom = formulaireValues.firstName;
            if (regExTexte(lePrenom)) {
                return true;
            } else {
                alert(textAlert("Prénom"));
                return false;
            }
        };
        function nomControle() {  //validation contrôle du nom
            const leNom = formulaireValues.lastName;
            if (regExTexte(leNom)) {
                return true;
            } else {
                alert(textAlert("Nom"));
                return false;
            }
        };
        function codePostalControle() {  //validation contrôle du codePostal
            const lecodePostal = formulaireValues.zip;
            if (regExcodePostal(lecodePostal)) {
                return true;
            } else {
                alert("Code postal");
                return false;
            }
        };
        function villeControle() {  //validation contrôle du prenom
            const laVille = formulaireValues.city;
            if (regExTexte(laVille)) {
                return true;
            } else {
                alert(textAlert("Ville"));
                return false;
            }
        };
        function emailControle() {  //validation contrôle du mail
            const leEmail = formulaireValues.email;
            if (regExEmail(leEmail)) {
                return true;
            } else {
                alert("Email");
                return false;
            }
        };
        function adresseControle() {   //validation contrôle adresse
            const leAdresse = formulaireValues.address;
            if (regExAdresse(leAdresse)) {
                return true;
            } else {
                alert("Adresse");
                return false;
            }
        };
        //Controle de la validite du formulaire avant l'envoie dans le localstorage
        if (prenomControle() && nomControle() && codePostalControle() && emailControle() && adresseControle() && villeControle()) {
            // mettre l'objet formulaireValues et le prix total dans le localstorage
            localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
            localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

            //mettre les valeurs du formulaire et produits selectionnés dans un objet à envoyer au serveur
            const aEnvoyer = {
                contact: formulaireValues,
                products: itemsLocalStorage.map((peluche) => {
                    return peluche._id;
                })
            };
            envoieVersServeur(aEnvoyer);
        }
        else {
            alert("erreur au niveau du formulaire");
        };
    });
}
showForm(localStorage.getItem('product'));
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
const dataLocalStorage = localStorage.getItem("formulaireValues");

//convertir la chaine de caractère en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//Fonction pour mettre les valeurs du localStorage dans les champs du formulaire
function remplirImputDuLocalStorage(input, fieldName) {
    if (dataLocalStorageObjet == null) {
    }
    else {
        document.querySelector(`#${input}`).value = dataLocalStorageObjet[fieldName];
    }
};
remplirImputDuLocalStorage("prenom", "firstName");
remplirImputDuLocalStorage("nom", "lastName");
remplirImputDuLocalStorage("adresse", "address");
remplirImputDuLocalStorage("ville", "city");
remplirImputDuLocalStorage("codePostal", "zip");
remplirImputDuLocalStorage("email", "email");