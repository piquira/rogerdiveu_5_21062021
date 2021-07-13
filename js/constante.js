
const url = "http://localhost:3000/api/teddies";

//methode pour récupération de la chaîne de requête dans l'ID dans l'url web API
const queryString_url_id = window.location.search;
const params = new URLSearchParams(queryString_url_id);
var id = params.get("id");

