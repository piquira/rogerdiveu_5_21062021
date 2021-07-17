/*déclatation variable "produitEnregistrerDansLocalStorage" dans laquelle il y a les key et values du local storage
JSON.parse pour convertir les données qui sont dans le local storage en objet javascript*/
let itemsLocalStorage = JSON.parse(localStorage.getItem("products")) ?? [];
const insererElement4 = document.querySelector(".produits_panier");

//_______________________________________affichage des produits dans le panier
function produitPanier(produits) {
//si le panier est vide afficher panier vide
    if (produits.length > 0 ) {
        let html ="";
            produits.forEach ((products) => {
              html += `
                  <div class="recapitulatif ">
                      <div class="cart-row ">
                          <div class="cart-item cart-column ">
                              <span class="cart-item-title">${products.name} </span>
                                  <span class="cart-item-title cart-column"> ${products.option_couleur} </span>
                                  <span class=" cart-item-title cart-column">${products.price}€</span>
                                      <button type="button" class="supprimer btn btn-danger btn-purchase cart-item-title cart-column">Supprimer</button>
                          </div>
                      </div>
                  </div> ` ; 
              });
          // code html dans la page
          insererElement4.insertAdjacentHTML("afterbegin", html);  
    }
    //si le panier est vide afficher panier vide
    else {
          const panierVide = `
            <div class="cart-item-title cart-column">
            <div>Votre panier est vide</div>
            </div>`;
          // code html dans la pageconst produits
          insererElement4.insertAdjacentHTML("afterbegin", panierVide);
    };
    //_______________________________________Bouton supprimer article    
    // selection des boutons btn_supprimer
    let supprimer = document.querySelectorAll(".supprimer");
        for (let l = 0; l < supprimer.length; l++) {
            supprimer[l].addEventListener("click", (e) => {
                e.preventDefault();
                //selection de id du produit qui doit être supprimé avec le click bouton
                let id_select_supprimer = produits[l]._id;
                    if (id_select_supprimer !== -1)
                    {
                    //methode filter pour selectionner elements à garder et supp.l'element du click bouton
                    produits = produits.filter(
                        (el) => el._id !== id_select_supprimer);
                    }   
            //envoie la variable dans localstorage, transforme fomrat JSON et envoyer la clé du produit du localstorage
            localStorage.setItem("products", JSON.stringify(produits));
            window.location.href = "panier.html";
            })
        } 
}
const produits = JSON.parse(localStorage.getItem('products'));

produitPanier(produits ?? []);
//...............................FIN affichage des produits dans le panier

//___________________________________________Bouton vider panier
// code html du bouton vider panier "cart-row"
const htmlViderPanier =`
    <button type="button"  class="vider_panier btn btn-primary  btn-purchase">Vider panier</button>
    `
//mettre le code html dans la page
insererElement4.insertAdjacentHTML("beforeEnd", htmlViderPanier);
// selection du bouton vider_panier
const vider_panier = document.querySelector(".vider_panier");
//suppression de la clé produit du localstorage pour vider panier
    vider_panier.addEventListener("click", (e) => {
        e.preventDefault();
        //removeitem pour vider le localstorage
        localStorage.removeItem("products");
        //rechargement de la page panier
        window.location.href = "liste_produit.html";
});

//________________________________________Montant total du panier
// variable pour mettre les prix des produits choisis dans le panier
let calculTotal = [];
//Chercher les prix dans panier
    for (let m = 0; m < itemsLocalStorage.length; m++) {
        let prixProduitPanier = itemsLocalStorage[m].price;
        //mettre les prix du panier dans la variable calculTotal
        calculTotal.push(prixProduitPanier)
    }
    //addition des prix du tableau de la variable calculTotal avec .reducer
    const reducer = (accumulator, currentvalue) => accumulator + currentvalue
    const prixTotal = calculTotal.reduce(reducer, 0);

    //code html du prix total
    const affichagePrixTotal = `
    <div class="cart-total">
        <strong class="cart-total-title">Total</strong>
        <div class="cart-total-title">${prixTotal} €</div>
    </div>`;
    //// mise en place code html du bouton vider panier
    insererElement4.insertAdjacentHTML("beforeEnd", affichagePrixTotal);
