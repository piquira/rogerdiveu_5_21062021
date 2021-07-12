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




