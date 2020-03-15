/* ---------------------------------------- Classes ----------------------------------------------------------------------------------------------------------------------------- */
// Clasee DIV OBJ permet de facilement contruire une arboresance HTML
class DivOBJ {
    constructor(name, cssParameter) {
      this.name = name;                 // Nom de l'objet
      this.cssParameter = cssParameter; // Si besoin, on peut utiliser du CSS
      this.content = [];                // Contenu en HTML
    }

    addContent(newContent) {
        this.content.push(newContent);
    }

    clear() {
        this.content = [];
    }

    get render() { // Comme en ReactJs, on génère du HTML
        let i=0;
        let finalString = "<div id=" + this.name + " style=" + this.cssParameter + " >";
        for (i = 0; i < this.content.length; i++) {
            finalString += this.content[i];
        }
        finalString += "</div>";
        this.clear();
        return finalString;
    }
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- Début de l'application*/
var scenarioState = "scenarioState_initialisation";
var parentDiv = new DivOBJ("parentDiv", "");

function runScenarioEnigmes() {
    scenarioState = scenarioState_enum[0];
    clearInHTML();
    parentDiv.addContent("\
        <h1>Je vous souhaite la bienvenu, moi c'est Merlin.</h1>\
        <h3>Quelque chose me dit que vous cherchiez quelque chose ici.</br>\
            Etant magicien, je vous aiderai volontié... mais tout d'abord vous devez m'aider à résoudre trois enigmes.</h3>\
        <h3>Prennez garde ! Car ces trois énigmes ne sont pas si facile à résoudre ! Pour vous dire, cela fait maintenant plusieurs moment que je cherche... mais je n'ai pas trouvé...</h3>\
        <h3>Alors prêt à creuser le cerveau ?</h3>\
        <img src='../enigme/src/merlin1.png' style='display: block;margin-left: auto;margin-right: auto;height: 250px;'/>\
        <h3>Saisissez la commande <bold>Next</bold> pour commencer à aider Merlin.</h3>");

    printInHTML(parentDiv.render);
}

function nextStepScenarioEnigmes(indexString, evalType, commentaire) {
    switch (indexString) {
        case scenarioState_enum[1]: {
            parentDiv.addContent("<h1>Une vieille invention :</h1>");
            if (evalType == ST_ERR) {
                parentDiv.addContent("\
                <img src='../enigme/src/merlinerror0.png' style='display: block;margin-left: auto;margin-right: auto;height: 300px;'/>");
            } else {
                parentDiv.addContent("\
                <img src='../enigme/src/merlin2.png' style='display: block;margin-left: auto;margin-right: auto;height: 300px;'/>");
            }
            if (commentaire != "") {
                parentDiv.addContent("<p style='text-align: center;'>" + commentaire + "</p>");
            }
            parentDiv.addContent("\
                        <div style='position: relative;text-align: center;'>\
                            <img src='../enigme/src/Q.png' style='display: block;margin-left: auto;margin-right: auto;'/>\
                            <div style='position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);'>\
                                <p>Une vielle invention qui est très utilisée aujourd'hui, permet de voir à travers les murs.</p>\
                                <p>Qui suis-je ?</p>\
                            </div>\
                        </div>");
            printInHTML(parentDiv.render);
            break;
        }

        case scenarioState_enum[2]: {
            parentDiv.addContent("<h1>Une charade :</h1>");
            if (evalType == ST_ERR) {
                parentDiv.addContent("\
                <img src='../enigme/src/merlinerror0.png' style='display: block;margin-left: auto;margin-right: auto;height: 300px;'/>");
            } else {
                parentDiv.addContent("\
                <img src='../enigme/src/merlin3.png' style='display: block;margin-left: auto;margin-right: auto;height: 300px;'/>");
            }
            if (commentaire != "") {
                parentDiv.addContent("<p style='text-align: center;'>" + commentaire + "</p>");
            }
            parentDiv.addContent("\
                        <div style='position: relative;text-align: center;'>\
                            <img src='../enigme/src/Q.png' style='display: block;margin-left: auto;margin-right: auto;'/>\
                            <div style='position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);'>\
                                <p>- Mon premier peut être en fer ou en chocolat</br>\
                                - Mon second est une boisson chaude très apprécié en Angleterre</br>\
                                - Mon troisième peut être mélangé (en petite quantité) à mon second</br>\
                                - Mon quatrième se trouve sous la croûte de pain</br>\
                                - Mon tout est un prénom</p>\
                            </div>\
                        </div>");
            printInHTML(parentDiv.render);
            break;
        }

        case scenarioState_enum[3]: {
            parentDiv.addContent("<h1>Un monstre généreux :</h1>");
            if (evalType == ST_ERR) {
                parentDiv.addContent("\
                <img src='../enigme/src/merlinerror0.png' style='display: block;margin-left: auto;margin-right: auto;height: 300px;'/>");
            } else {
                parentDiv.addContent("\
                <img src='../enigme/src/merlin4.png' style='display: block;margin-left: auto;margin-right: auto;height: 300px;'/>");
            }
            if (commentaire != "") {
                parentDiv.addContent("<p style='text-align: center;'>" + commentaire + "</p>");
            }
            parentDiv.addContent("\
                        <div style='position: relative;text-align: center;'>\
                            <img src='../enigme/src/Q.png' style='display: block;margin-left: auto;margin-right: auto;'/>\
                            <div style='position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);'>\
                                <p>Un monstre affamé pose cette devinette à un chevalier perdu :</br>\
                                \"J'ai quatre dents mais je ne mords pas.</br>\
                                Quand par hasard, j'attrape quelque chose,</br>\
                                Un goinfre me l'enlève aussitôt. Qui suis-je ?\"</p>\
                            </div>\
                        </div>");
            printInHTML(parentDiv.render);
            break;
        }

        case scenarioState_enum[4]: {
            parentDiv.addContent("<h1>Vous avez réussit !</h1>");
            parentDiv.addContent("\
                <h3>Je dois admettre que vous êtes plutôt doué !\
                <h3>Voici ce que vous cherchiez : [LIEN CV ?]</h3>\
                <img src='../enigme/src/merlin5.png' style='display: block;margin-left: auto;margin-right: auto;height: 300px;'/>");
            printInHTML(parentDiv.render);
            break;
        }
    }
}

// fever the goal - source
/* ------------------------------ Fonctions pour le programme ------------------------------ */

function printInHTML(HTMLChain) {
    document.getElementById("displayScreenText").innerHTML = HTMLChain;
}

function clearInHTML() {
    document.getElementById("displayScreenText").innerHTML = "";
}

// Permet d'écrire directement dans une DIV spécifique
function printInHTMLInSpecificElement(HTMLChain,ElementId) {
    document.getElementById(ElementId).innerHTML = HTMLChain;
}

function clearInHTMLInSpecificElement(ElementId) {
    document.getElementById(ElementId).innerHTML = "";
}

function incToNextScenario(){
    for(let i = 0; i < scenarioState_enum.length; i++){
        if (scenarioState_enum[i] == scenarioState) {
            scenarioState = scenarioState_enum[i+1];
            break;
        }
    }
}

/* ------------------------------------------------*/ 
function commandsEnigmes(commandKey, commandOptions, state) {
    if (state.application == "scenarioEnigmes" | scenarioState == scenarioState_enum[0]) {
        switch (commandKey) {
            case "next":
                {
                    incToNextScenario();
                    break;
                }
            default:
                {
                    writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
                    break;
                }
        }
        nextStepScenarioEnigmes(scenarioState, ST_NONE,"");
        return state;
    }

    if (scenarioState == scenarioState_enum[1]){
        if (scenarioStep1Responses_enum.includes(commandKey.toLowerCase())) {
            incToNextScenario();
            nextStepScenarioEnigmes(scenarioState, ST_NONE, "");
            return state;
        }  else {
            nextStepScenarioEnigmes(scenarioState, ST_ERR, "Ce n'est pas la bonne réponse. Essaies encore.");
        }   
    }

    if (scenarioState == scenarioState_enum[2]){
        if (scenarioStep2Responses_enum.includes(commandKey.toLowerCase())) {
            incToNextScenario();
            nextStepScenarioEnigmes(scenarioState, ST_NONE, "");
            return state;
        }  else {
            nextStepScenarioEnigmes(scenarioState, ST_ERR, "Ce n'est pas la bonne réponse. Essaies encore.");
        }   
    }

    if (scenarioState == scenarioState_enum[3]){
        if (scenarioStep3Responses_enum.includes(commandKey.toLowerCase())) {
            incToNextScenario();
            nextStepScenarioEnigmes(scenarioState, ST_NONE, "");
            return state;
        }  else {
            nextStepScenarioEnigmes(scenarioState, ST_ERR, "Ce n'est pas la bonne réponse. Essaies encore.");
        }   
    }

    if (scenarioState == scenarioState_enum[4]){
        switch (commandKey) {
            case "menu":
                {
                    clearInHTML();
                    state.applicationState = "scenariosSelection";
                    document.getElementById("menu").style.display = "flex";
                    document.getElementById("displayScreenTitle").style.display = "flex";
                    displayAvailableCommands(state.applicationState);
                    writeCommandResults("Retour à l'écran principal de l'application.");
                    break;
                }
            default:
                {
                    writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
                    break;
                }
        }
        return state;
    }
    
    return state;
}

/* ---------------------------------------- Descripteur Etat du programme ---------------------------------------- */

const scenarioState_enum = [
    'scenarioState_initialisation',
    'scenarioState_stepOne',
    'scenarioState_stepTwo',
    'scenarioState_stepThree',
    'endingState'
]

const scenarioStep1Responses_enum = [
    'fenêtre',
    'fenetre',
    'fenêtres',
    'fenetres',
    'vitre',
    'vitres'
]

const scenarioStep2Responses_enum = [
    'barthélémy',
    'barthelemy'
]

const scenarioStep3Responses_enum = [
    'fourchette',
    'une fourchette'
]

const ST_NONE = 0;
const ST_ERR  = 1;