
const url = "http://localhost:3000/api/teddies";

//methode pour récupération de la chaîne de requête dans l'ID dans l'url web API
const queryString_url_id = window.location.search;
const params = new URLSearchParams(queryString_url_id);
var id = params.get("id");

//.....................................affichage des produits dans le panier
/*
function produitPanier(produits) {
//si le panier est vide afficher panier vide
    if (produits == null ) {
        let html ="";
            itemsLocalStorage.forEach ((products) => {
            html += `
                <div class="recapitulatif ">
                    <div class="cart-row ">
                        <div class="cart-item cart-column ">
                            <span class="cart-item-title">${products.name} </span>
                                <span class="cart-item-title cart-column"> ${products.option_couleur} </span>
                                <span class=" cart-item-title cart-column">${products.price}€</span>
                                    <button type="button" id="supprimer" class="btn btn-danger btn-purchase cart-item-title cart-column">Supprimer</button>
                        </div>
                    </div>
                </div> ` ; 
            });
         // code html dans la page
         positionElement4.insertAdjacentHTML("afterbegin", html);    
    }
    //si le panier est vide afficher panier vide
    else {
          const panierVide = `
            <div class="cart-item-title cart-column">
            <div>Votre panier est vide</div>
            </div>`;
        // code html dans la page
        positionElement4.insertAdjacentHTML("afterbegin", panierVide);
    }; 
}
produitPanier(localStorage.getItem('product'));
*/


/*
/*
function optionColors () {
       //mettre le code html dans la page web pour les options
       const colors = teddy.colors;
       let htmlColors = [];
       //boucle for pour afficher les options produit
       for (let j = 0; j < colors.length; j++) {
        htmlColors = htmlColors +
           `
             <option value="${colors[j]}">${colors[j]}</option>
             `;
    }
    return htmlColors ;
  }
const positionElement3 = document.querySelector("#option_produit")
  positionElement3.innerHTML = optionColors;

function optionColors () {
       //mettre le code html dans la page web pour les options
       let htmlColors = [];
       //boucle for pour afficher les options produit
       for (let j = 0; j < optionColors.length; j++) {
        htmlColors = htmlColors +`
             <option value="${optionColors[j]}">$optionColors[j]}</option>
             `;
        }
        return htmlColors ;
}

*/



//envoyer une requête HTTP de type GET au service web se trouvant à l'adresse  http://
/*
fetch("http://localhost:3000/api/teddies")
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data);
});

// méthode tableau javascript

function Product(image,nom,prix){
  this.pic = image;
  this.name = nom;
  this.price = prix;
}


let products = [];
const teddy1 = new Product("images/teddy_1.jpg",'Norbert',2900 / 100);
const teddy2 = new Product('images/teddy_2.jpg','Arnold',3900 / 100);
const teddy3 = new Product('images/teddy_3.jpg','Lenny and Carl',5900 / 100);
const teddy4 = new Product('images/teddy_4.jpg','Gustav',4500 / 100)
const teddy5 = new Product('images/teddy_5.jpg','Garfunkel',5500 / 100)
products.push(teddy1,teddy2,teddy3,teddy4,teddy5);

let listOfProducts =""

products.forEach( (prod) =>
{
    listOfProducts += `
      <tr class="text-center">
        <td><img src=${prod.pic} class="img-fluid img-thumbnail w-100"></td>
        <td class="w-25 align-middle">${prod.name}</td>
        <td class="w-25 align-middle">${prod.price}€</td>
        <td class="w-25 align-middle"><button class="btn btn-info">Voir</button></td>
      </tr>
      `
} );
document.getElementById ('productList'). innerHTML = listOfProducts;
*/