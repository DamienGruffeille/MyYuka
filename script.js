const api = "https://fr.openfoodfacts.org/api/2/product/";
// const api = "http://172.16.130.38:5500/json/";

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

// Menu collapsible
let coll = document.getElementsByClassName("collapsible");

for (element of coll) {
  element.addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "none") {
      content.style.display = "flex";
    } else {
      content.style.display = "none";
    }
  });
}

document.getElementById("btnSearch").addEventListener("click", getResults);

function getResults() {
  let codeBarreRecherche = codeBarre.value;
  const fullApi = api + codeBarreRecherche;
  // const fullApi = api + codeBarreRecherche + ".json";
  fetch(fullApi)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .catch(function (error) {
      console.log("Oh no it didn't work");
    })
    .then((value) => {
      if (value.status === 0) {
        showProductNotFoundErrorMessage();
      } else {
        hideProductNotFoundErrorMessage();
        showContainers();
        printResults(value);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function showProductNotFoundErrorMessage() {
  let messageErreur = document.getElementById("error");
  messageErreur.style.display = "flex";
}
function hideProductNotFoundErrorMessage() {
  let messageErreur = document.getElementById("error");
  messageErreur.style.display = "none";
}

function showContainers() {
  let resultat = document.getElementById("resultat");
  resultat.style.display = "grid";
}

function printResults(value) {
  document.getElementById("nomProduit").innerHTML =
    "Nom : " + value.product.product_name;
  document.getElementById("codeBarres").innerHTML =
    "Code EAN13 : " + value.code;

  /* Affichage la photo du produit*/
  showPhoto(value.product.image_front_small_url);

  /* Appel de la fonction pour définir l'image nutriScore à afficher */
  addNutriScore(value.product.nutriscore_grade);
  addNovaScore(value.product.nova_group);
  addEcoScore(value.product.ecoscore_grade);

  addListeIngredients(value.product.ingredients_text);

  addListeAllergenes(value.product.allergens);

  addTableauNutritionnel(value.product.nutrient_levels);
}

function addNutriScore(nutriScore) {
  let img = document.getElementById("imgNutriScore");

  switch (nutriScore) {
    case "a":
      img.setAttribute("src", "img/nutriscoreA1.jpg");
      break;
    case "b":
      img.setAttribute("src", "img/nutriscoreB.jpg");
      break;
    case "c":
      img.setAttribute("src", "img/nutriscoreC.jpg");
      break;
    case "d":
      img.setAttribute("src", "img/nutriscoreD.jpg");
      break;
    case "e":
      img.setAttribute("src", "img/nutriscoreE.jpg");
      break;
    default:
      img.setAttribute("src", "img/nutriscoreVierge.jpg");
  }
  img.style.display = "grid";
}
function addNovaScore(novaScore) {
  let img = document.getElementById("imgNova");

  switch (novaScore) {
    case 1:
      img.setAttribute("src", "img/nova1.jpg");
      break;
    case 2:
      img.setAttribute("src", "img/nova2.jpg");
      break;
    case 3:
      img.setAttribute("src", "img/nova3.jpg");
      break;
    case 4:
      img.setAttribute("src", "img/nova4.jpg");
      break;
    default:
      img.setAttribute("src", "img/novaNeutre.jpg");
  }
  img.style.display = "grid";
}
function addEcoScore(ecoScore) {
  let img = document.getElementById("imgEcoScore");

  switch (ecoScore) {
    case "a":
      img.setAttribute("src", "img/ecoScoreA.jpg");
      break;
    case "b":
      img.setAttribute("src", "img/ecoScoreB.jpg");
      break;
    case "c":
      img.setAttribute("src", "img/ecoScoreC.jpg");
      break;
    case "d":
      img.setAttribute("src", "img/ecoScoreD.jpg");
      break;
    case "e":
      img.setAttribute("src", "img/ecoScoreE.jpg");
      break;
    default:
      img.setAttribute("src", "img/ecoScoreNeutre.png");
  }
  img.style.display = "grid";
}
function addListeIngredients(liste) {
  document.getElementById("listeIngredients").innerHTML = liste;
}
function showPhoto(url) {
  let photo = document.getElementById("imgProduit");
  photo.setAttribute("src", url);
  photo.style.display = "grid";
}
function addListeAllergenes(liste) {
  document.getElementById("listeAllergenes").innerHTML = liste;
}
function addTableauNutritionnel(liste) {
  console.log(liste.fat);
  document.getElementById("graisse").innerHTML = "Graisses : " + liste.fat;
  document.getElementById("graissesSaturees").innerHTML =
    "Graisses saturées : " + liste["saturated-fat"];
  document.getElementById("salt").innerHTML = "Sel : " + liste.salt;
  document.getElementById("sugars").innerHTML = "Sucres : " + liste.sugars;
}
