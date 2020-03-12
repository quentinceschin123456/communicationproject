function runScenarioEnigmes() {
    var scenarioState = "initialisation";
    clearInHTML();
    let parentDiv = new DivOBJ("parentDiv", "");
    parentDiv.addContent("\
        <h1>Je vous souhaite la bienvenu, moi c'est Merlin.</h1>\
        <h3>Quelque chose me dit que vous cherchiez quelque chose ici.</br>\
            Etant magicien, je vous aiderai volontié... mais tout d'abord vous devez m'aider à résoudre trois enigmes.</h3>\
        <h3>Prennez garde ! Car ces trois énigmes ne sont pas si facile à résoudre !</h3>\
        <h3>Alors prêt à creuser le cerveau ?</h3>\
        <img src='../enigme/src/merlin1.png' style='display: block;margin-left: auto;margin-right: auto;width: auto;'/>\
        <h3>Saisissez la commande <bold>Next</bold> pour commencer à aider Merlin.</h3>");

    printInHTML(parentDiv.render);
}

/* ---------------------fever the goal - source------------------ */
/* ----- Fonctions pour le programme ----- */

function printInHTML(HTMLChain) {
    document.getElementById("displayScreenText").innerHTML = HTMLChain;
}

function clearInHTML() {
    document.getElementById("displayScreenText").innerHTML = "";
}

// Permet d'écrire directement dans une DIV
function printInHTMLInSpecificElement(HTMLChain,ElementId) {
    document.getElementById(ElementId).innerHTML = HTMLChain;
}

function clearInHTMLInSpecificElement(ElementId) {
    document.getElementById(ElementId).innerHTML = "";
}

// Clasee DIV OBJ permet de facilement contruire une arboresance HTML
class DivOBJ {
    constructor(name, cssParameter) {
      this.name = name;                 // Nom de l'objet
      this.cssParameter = cssParameter; // Si besoin, on peut utiliser du CSS
      this.content = [];
    }

    addContent(newContent) {
        this.content.push(newContent);
    }

    clearContent() {
        this.content = [];
    }

    get render() {
        let i=0;
        let finalString = "<div id=" + this.name + " style=" + this.cssParameter + " >";
        for (i = 0; i < this.content.length; i++) {
            finalString += this.content[i];
        }
        finalString += "</div>";
        return finalString;
      }
}