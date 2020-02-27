function runScenarioEnigmes() {
    var scenarioState = "initialisation";
    printInHTML('<h1>Bienvenu dans Enigmas !</h1>');
}

/* --------------------------------------- */
/* ----- Fonctions pour le programme ----- */

function printInHTML(HTMLChain) {
    document.getElementById("displayScreenText").innerHTML = HTMLChain;
}

function printInHTMLInSpecificElement(HTMLChain,ElementId) {
    document.getElementById(ElementId).innerHTML = HTMLChain;
}