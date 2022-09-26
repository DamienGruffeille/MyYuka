const api = "https://fr.openfoodfacts.org/api/2/product/";

document
  .getElementById("btnAfficherOptions")
  .addEventListener("click", showOptions);

function showOptions() {
  let options = document.getElementById("choixOptions");
  let bouton = document.getElementById("btnAfficherOptions");

  if (options.style.display === "none") {
    options.style.display = "grid";
    bouton.innerHTML = "Cacher options";
  } else {
    options.style.display = "none";
    bouton.innerHTML = "Afficher options";
  }
}

document.getElementById("btnSearch").addEventListener("click", getResults);

function getResults() {
  let codeBarreRecherche = codeBarre.value;
  const fullApi = api + codeBarreRecherche;
  // let monProduit = new product;
  fetch(fullApi)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then((value) => {
      printResults(value);
    });
}

function printResults(value) {
  document.getElementById("nomProduit").innerHTML = value.product.product_name;
  document.getElementById("codeBarres").innerHTML = value.code;

  /* création de la balise img pour afficher la photo du produit*/
  let img = document.createElement("img");
  img.setAttribute("src", value.product.image_front_small_url);
  img.setAttribute("alt", "photo du produit");
  imgProduit.appendChild(img);
}
