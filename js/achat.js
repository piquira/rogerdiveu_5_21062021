//affichage du produit qui a été sélectionné par l'id
async function chargerInfoPeluche(id) {
    const reponse = await fetch(url + "/" + id);
    const teddy = await reponse.json();

    return teddy;
}

function afficherInfoPeluche(teddy) {
    // slelection de la classe pour le code HTML
    const insererElement2 = document.querySelector(".container");

    // Structure pour la page code HTML
    const htmlProduit =`
      <div class="shop-items">
        <div class="card shop-item-details">
          <div id="img0" class="shop-item-details">
            <img src="${teddy.imageUrl}"></img>
          </div>      <br /> 
          <div id="nom0" class="shop-item-title">
            <h2>${teddy.name}</h2>
          </div><br />      
          <div id="description0 ">
            <h3>${teddy.description}</h4>
          </div>  <br />
          <div id="colors0">
            <form>
              <label for="option_produit">Couleur</label>
                <select name ="option_produit" id="option_produit">   </select>
            </form>
          </div>    <br />
          <div id="prix0">
            <span class="shop-item-price">Prix: ${teddy.price / 100} € </span>
          </div>
        </div>
          <button id="btn-envoyer" class="btn btn-primary shop-item-button" type="submit" name="btn-envoyer">Ajouter</button>
      </div> `;
    //..................................choisir les options de l'objet
    const optionColors = teddy.colors;
      let htmlColors = [];
        //boucle for pour afficher les options produit
        for (let j = 0; j < optionColors.length; j++) {
          htmlColors = htmlColors +`
              <option value="${optionColors[j]}">${optionColors[j]}</option>
            `;
        }
      //mettre le code html dans la page web
      insererElement2.innerHTML = htmlProduit;
      //mettre le code html dans la page web pour les options
      const insererElement3 = document.querySelector("#option_produit")
      insererElement3.innerHTML = htmlColors;     
}

// récupération des données sélectionnées et envoie vers panier
function initialiserPanier(teddy) {
    // sélection de l'id du formulaire
    const idColors = document.querySelector("#option_produit")
    //sélection du bouton ajouter
    const btn_ajouterPanier = document.querySelector("#btn-envoyer");
    //écouter le bouton
    btn_ajouterPanier.addEventListener("click", (event) => {
        event.preventDefault();
        //Mettre le choix dans une variable
        const choixColors = idColors.value;
        //récupération des valeurs du formulaire
        let ajouterProduit = {
            name: teddy.name,
            _id: teddy._id,
            option_couleur: choixColors,
            quantite: 1,
            price: teddy.price / 100
        };
        /*stocker les valeurs du formulaire récupérés dans le local storage
        déclatation variable "produitDansLocalStorage"dans laquelle il y a les key et values
        du local storage. JSON.parse pour convertir les données qui sont dans le local storage en objet javascript*/

        let produitDansLocalStorage = JSON.parse(localStorage.getItem("products"));

        //pop up pour mettre dans panier ou retour liste
        const popupContinuer = () => {
          if (window.confirm(`${teddy.name} option: ${choixColors} Article ajouté. Voir le panier`)) {
            window.location.href = "panier.html";
          }
          else {
            window.location.href = "liste_produit.html";
          }
        }
        //fonction ajouter un produit dans le localstrorage
        const ajoutProduitLocalStorage = () => {
        //ajouter dans le tableau l'objet avec les valeurs choisies par l'utilisateur
        produitDansLocalStorage.push(ajouterProduit);
        //transformation en format JSON et envoyer dans la clé produit du localstorage  
        localStorage.setItem("products", JSON.stringify(produitDansLocalStorage));
        };
          //si panier déjà existant dans le localstorage
          if (produitDansLocalStorage) {
            ajoutProduitLocalStorage();
            popupContinuer();
          }
          //sinon si panier vide dans le localstorage
          else {
            produitDansLocalStorage = [];
            ajoutProduitLocalStorage();
            popupContinuer();
          }
    });
}
window.onload = () => {
    chargerInfoPeluche(id).then((peluche) => {
        afficherInfoPeluche(peluche);
        initialiserPanier(peluche);
    });
}