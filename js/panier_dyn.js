//....................................... PANIER COMMANDE
/*déclatation variable "produitEnregistrerDansLocalStorage" dans laquelle il y a les key et values du local storage
JSON.parse pour convertir les données qui sont dans le local storage en objet javascript*/
let itemsLocalStorage = JSON.parse(localStorage.getItem("products")) ?? [];

//.....................................affichage des produits dans le panier
// selection de la classe du code html
const positionElement4 = document.querySelector(".produits_panier");

//si panier avec produit, afficher les produits dans le localstorage
let structureProduitPanier = [];
//si le panier est vide afficher panier vide
    if (itemsLocalStorage === null || itemsLocalStorage == 0) {
        const panierVide = `
            <div class="cart-item-title cart-column">
            <div>Votre panier est vide</div>
            </div>
            `;
        // code html dans la page
        positionElement4.insertAdjacentHTML("afterbegin", panierVide);
    }
    else {
        for (k = 0; k < itemsLocalStorage.length; k++) {
            structureProduitPanier = structureProduitPanier + `
            <div class="recapitulatif ">
                <div class="cart-row ">
                    <div class="cart-item cart-column ">
                        <span class="cart-item-title">${itemsLocalStorage[k].name} </span>
                            <span class="cart-item-title cart-column"> ${itemsLocalStorage[k].option_couleur} </span>
                            <span class=" cart-item-title cart-column">${itemsLocalStorage[k].price}€</span>
                            <button type="button" id="supprimer" class="btn btn-danger btn-purchase cart-item-title cart-column">Supprimer</button>
                    </div>
                </div>
            </div>   
            ` ;
        }
        if (k === itemsLocalStorage.length) {
            //mettre le code html dans la page
            positionElement4.insertAdjacentHTML("afterBegin", structureProduitPanier);
         }
    }

// .....................Bouton supprimer article
// selection des boutons btn_supprimer
let supprimer = document.querySelectorAll("#supprimer");
    for (let l = 0; l < supprimer.length; l++) {
        supprimer[l].addEventListener("click", (e) => {
            e.preventDefault();
            //selection de id du produit qui doit être supprimé avec le click bouton
            let id_select_supprimer = itemsLocalStorage[l]._id;
                if (id_select_supprimer !== -1)
                {
                //methode filter pour selectionner elements à garder et supp.l'element du click bouton
                itemsLocalStorage = itemsLocalStorage.filter(
                    (el) => el._id !== id_select_supprimer);
                }   
                //envoie la variable dans localstorage, transforme fomrat JSON et envoyer la clé du produit du localstorage
                localStorage.setItem("products", JSON.stringify(itemsLocalStorage));
                window.location.href = "panier_dyn.html";
        })
    }
//......................... FIN Bouton supprimer article.............................

//................................ Bouton vider panier
// code html du bouton vider panier "cart-row"
const vider_panier_html =`
    <button type="button"  class="vider_panier btn btn-primary  btn-purchase">Vider panier</button>
    `
//mettre le code html dans la page
positionElement4.insertAdjacentHTML("beforeEnd", vider_panier_html);
// selection du bouton vider_panier
const vider_panier = document.querySelector(".vider_panier");
//suppression de la clé produit du localstorage pour vider panier
    vider_panier.addEventListener("click", (e) => {
        e.preventDefault();
        //removeitem pour vider le localstorage
        localStorage.removeItem("products");
        //rechargement de la page panier
        window.location.href = "panier_dyn.html";
});
//............................Fin bouton vider panier........................

//............................ Montant total du panier
// variable pour mettre les prix des produits choisis dans le panier
let prixTotalcalcul = [];
//Chercher les prix dans panier
    for (let m = 0; m < itemsLocalStorage.length; m++) {
        let prixProduitPanier = itemsLocalStorage[m].price;
        //mettre les prix du panier dans la variable prixtotalcalcul
        prixTotalcalcul.push(prixProduitPanier)
    }
    //addition des prix du tableau de la variable prixTotalCalcul avec .reducer
    const reducer = (accumulator, currentvalue) => accumulator + currentvalue
    const prixTotal = prixTotalcalcul.reduce(reducer, 0);

    //code html du prix total
    const affichagePrixTotal = `
    <div class="cart-total">
        <strong class="cart-total-title">Total</strong>
        <div class="cart-total-title">${prixTotal} €</div>
    </div>
    `
    //// mise en place code html du bouton vider panier
    positionElement4.insertAdjacentHTML("beforeEnd", affichagePrixTotal);

    // ..................................FIN MONTANT PANIER

//....................Formulaire commande
const afficherFormulaire = () => {
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

//selection du bouton envoyer le formulaire
const btnEnvoieFormulaire = document.querySelector("#envoyerFormulaire");

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
    //.........................Validation formulaire
    const textAlert = (value) => {
        return value + ":erreur au niveau du formulaire"
    };
    const regExPrenomNomVille = (value) => {
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
    function prenomControle() {
        //validation contrôle du prenom
        const lePrenom = formulaireValues.firstName;
        if (regExPrenomNomVille(lePrenom)) {
            return true;
        } else {
            alert(textAlert("Prénom"));
            return false;
        }
    };
    function nomControle() {
        //validation contrôle du nom
        const leNom = formulaireValues.lastName;
        if (regExPrenomNomVille(leNom)) {
            return true;
        } else {
            alert(textAlert("Nom"));
            return false;
        }
    };
    function codePostalControle() {
        //validation contrôle du codePostal
        const lecodePostal = formulaireValues.zip;
        if (regExcodePostal(lecodePostal)) {
            return true;
        } else {
            alert("Code postal");
            return false;
        }
    };
    function villeControle() {
        //validation contrôle du prenom
        const laVille = formulaireValues.city;
        if (regExPrenomNomVille(laVille)) {
            return true;
        } else {
            alert(textAlert("Ville"));
            return false;
        }
    };
    function emailControle() {
        //validation contrôle du mail
        const leEmail = formulaireValues.email;
        if (regExEmail(leEmail)) {
            return true;
        } else {
            alert("Email");
            return false;
        }
    };
    function adresseControle() {
        //validation contrôle adresse
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
//mettre le contenu des champs du formulaire dans le localStorage
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







