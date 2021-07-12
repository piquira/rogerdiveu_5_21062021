// récupérer les données de l'API avec La promesse Fetch-methode asynchrone
const chargerPeluches = async(url) => {
    teddies = await fetch(url)
    .then(response => { return response.json(); })
        .catch((error) => {
            console.log('Il y a eu un problème' + error.message);
        });

};
//inclure le lien pour récupéré l'id du produit dans l'Url pour affichage page du produit

const affichageProduits = async(results) => {
    await chargerPeluches(url);
    if (results) {
        results.innerHTML = (
          teddies
            .map(teddie => (
                `<tr class="text-center">
                <td><img src="${teddie.imageUrl}"></td>
                <td class="w-25 align-middle">${teddie.name}</td>
                <td class="w-25 align-middle">${teddie.description}</td>
                <td class="w-25 align-middle">${teddie.price / 100} €</td>
                <td class="w-25 align-middle"><a href="achat_dyna.html?id=${teddie._id}"><button class="btn btn-info">Voir</button></a>  </td>
                </tr>
                `
            )).join('')
        );
    } else {
        console.log("erreur de chargement de la page");
    }
};
// insérer dans le HTML
affichageProduits(document.getElementById("container-produits"));



/*
//methode asynchrone
async function chargerPeluches() {
  //envoyer une requête HTTP de type GET au service web se trouvant à l'adresse  http://
  const reponse = await fetch(url);
  const peluches = await reponse.json();

  return peluches;
}

// gestion des erreurs avec try  et catch
try {

  //dataapi mettre les données dans des variables
  let _id = [];
  let Name = [];
  let imageUrl = [];
  let description = [];
  let price = [];
  let structureArticle = "";
  let i = [];

  //selection du DOM
  function affichageProduits(teddies) {
    //la boucle for pour afficher les objets dans la page web   
    for (i = 0; i < teddies.length; i++) {
      //mettre les données dans les variables avec foreach
      teddies.forEach((element, i) => {
        _id[i] = element._id;
        Name[i] = element.name;
        imageUrl[i] = element.imageUrl;
        description[i] = element.description;
        // colors[i] = element.colors;
        price[i] = element.price;
      });
      //afficher les objets sur la page web
      // a href avec le ? et _id pour avoir la bonne page produit en cliquant
      structureArticle +=`
      <tr class="text-center">
      <td><img src="${imageUrl[i]}"></td>
      <td class="w-25 align-middle">${Name[i]}</td>
      <td class="w-25 align-middle">${description[i]}</td>
      <td class="w-25 align-middle">${price[i] / 100} €</td>
      <td class="w-25 align-middle"><a href="achat_dyna.html?id=${_id[i]}"><button class="btn btn-info">Voir</button></a>  </td>
      </tr>
      `;
      //intégration du code html dans la page html
      document.getElementById('container-produits').innerHTML = structureArticle;
    }
  }
}
catch (e) {
  console.log(e);
}
window.onload = () => {
  chargerPeluches().then((peluches) => {
    affichageProduits(peluches);
  });
};
*/








