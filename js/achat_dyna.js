//affichage du produit qui a été sélectionné par l'id

async function chargerInfoPeluche(id) {
  const reponse = await fetch(url + "/" + id);
  const teddy = await reponse.json();

  console.log(teddy);

  return teddy;
}

function afficherInfoPeluche(teddy) {
  // slelection de la classe pour le code HTML
  const positionElement2 = document.querySelector(".container");

  // Structure pour la page code HTML
  const structureArticle2 =
    `
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
    positionElement2.innerHTML = structureArticle2;
    //mettre le code html dans la page web pour les options
    const positionElement3 = document.querySelector("#option_produit")
    positionElement3.innerHTML = htmlColors;
}

//............................................PANIER COMMANDE
// récupération des données sélectionnées et envoie du panier
function initialiserPanier(teddy) {

  // sélection de l'id du formulaire
  const btnColors = document.querySelector("#option_produit")
  //sélection du bouton ajouter
  const btn_ajouterPanier = document.querySelector("#btn-envoyer");
  //écouter le bouton
  btn_ajouterPanier.addEventListener("click", (event) => {
    event.preventDefault();

    //Mettre le choix dans une variable
    const choixColors = btnColors.value;
    //récupération des valeurs du formulaire
      let ajouterProduit = {
          name: teddy.name,
          _id: teddy._id,
          option_couleur: choixColors,
          quantite: 1,
          price: teddy.price / 100
      };

    //................................. stocker les valeurs du formulaire récupérer dans le local storage
    /*déclatation variable "produitEnregistrerDansLocalStorage"dans laquelle il y a les key et values
    du local storage JSON.parse pour convertir les données qui sont dans le local storage en objet javascript*/

    let produitDansLocalStorage = JSON.parse(localStorage.getItem("products"));

    //pop up pour continuer ou pas achat
    const popupContinuer = () => {
      if (window.confirm(`${teddy.name} option: ${choixColors} Ajouté, voir le panier`)) {
        window.location.href = "panier_dyn.html";
      }
      else {
        window.location.href = "liste_prod_stat.html";
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