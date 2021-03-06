// récupérer les données de l'API avec La promesse Fetch-methode asynchrone
const chargerPeluches = async(url) => {
    teddies = await fetch(url)
    .then(response => { return response.json(); })
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
                <td class="w-25 align-middle"><a href="achat.html?id=${teddie._id}"><button class="btn btn-info">Voir</button></a>  </td>
                </tr>
                `
            ))
        );
    } else {
        window.location.href = "index.html";
    }
};
// insérer dans le HTML
affichageProduits(document.getElementById("container-produits"));




