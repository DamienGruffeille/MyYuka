/* Affichage du verdict final */

function calculScoreFinal(produit) {
  let scoreFinal = 0;

  switch (produit.product.nutriscore_grade) {
    case "a":
      scoreFinal = -2;
      break;
    case "b":
      scoreFinal = -1;
      break;
    /* le case c n'est pas pris en compte car =0 */
    case "d":
      scoreFinal = 1;
      break;
    case "e":
      scoreFinal = 2;
      break;
  }

  switch (produit.product.nova_group) {
    case 1:
      scoreFinal -= 2;
      break;
    case 2:
      scoreFinal -= 1;
      break;
    case 3:
      scoreFinal += 1;
      break;
    case 4:
      scoreFinal += 2;
      break;
  }

  switch (produit.product.ecoscore_grade) {
    case "a":
      scoreFinal -= 2;
      break;
    case "b":
      scoreFinal -= 1;
      break;
    /* le case c n'est pas pris en compte car =0 */
    case "d":
      scoreFinal += 1;
      break;
    case "e":
      scoreFinal += 2;
      break;
  }

  return scoreFinal;
}

function afficheimg(chemin, titrepage, scrollbar) {
  document.getElementById("btnVerdict").addEventListener("click", function () {
    var titre = "verdict";
    i1 = new Image();
    i1.src = chemin;
    html =
      "<HTML><HEAD><TITLE>Images " +
      titre +
      " - " +
      titrepage +
      "</TITLE></HEAD>";
    html +=
      "<BODY LEFTMARGIN=0 MARGINWIDTH=0 TOPMARGIN=0 MARGINHEIGHT=0><CENTER>";
    html +=
      '<IMG SRC="' +
      chemin +
      '" BORDER=0 ALT="' +
      titrepage +
      '" NAME=imageTest ';
    html +=
      'onLoad="window.resizeTo(document.imageTest.width+14, document.imageTest.height+32)">';
    html += "</CENTER></BODY></HTML>";
    popupImage = window.open(
      "",
      "mysupimg",
      "toolbar=0, location=0, directories=0, menuBar=0, scrollbars=" +
        scrollbar +
        ", resizable=1"
    );
    popupImage.document.open();
    popupImage.document.write(html);
    popupImage.document.close();
  });
}

export { calculScoreFinal, afficheimg };
