/* ---------------------------------------- Classes ----------------------------------------------------------------------------------------------------------------------------- */
// Clasee DIV OBJ permet de facilement contruire une arboresance HTML
class DivOBJ {
    constructor(name, cssParameter) {
        this.name = name; // Nom de l'objet
        this.cssParameter = cssParameter; // Si besoin, on peut utiliser du CSS
        this.content = []; // Contenu en HTML
    }

    addContent(newContent) {
        this.content.push(newContent);
    }

    clear() {
        this.content = [];
    }

    get render() { // Comme en ReactJs, on génère du HTML
        let i = 0;
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
var scenarioState = "";
var parentDiv = null;
var nbTry = 0;

function runScenarioEnigmes() {
    scenarioState = "scenarioState_initialisation";
    parentDiv = new DivOBJ("parentDiv", "margin:auto");
    nbTry = 0;
    scenarioState = scenarioState_enum[0];
    clearInHTML();
    parentDiv.addContent("\
        <h1>Je vous souhaite la bienvenue, moi c'est Merlin.</h1>\
        <h3>Mon petit doigt me dit que vous cherchez quelque chose ici.</br>\
            Etant magicien, je vous aiderai volontier... mais tout d'abord vous devez m'aider à résoudre trois enigmes.<br>\
            Chacune des enigmes résolues vous donnera accès à un morceau de parchemin.</h3>\
        <h3>Prennez garde ! Car ces trois énigmes ne sont pas si faciles à résoudre ! Pour vous dire, cela fait maintenant un moment que je cherche... mais je n'ai pas trouvé...</h3>\
        <h3>Alors prêt à se creuser le cerveau ?</h3>\
        <img src='../enigme/src/merlin1.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>\
        <h3>Saisissez la commande \"<bold>next</bold>\" pour commencer à aider Merlin.</h3>");

    printInHTML(parentDiv.render);
}

function nextStepScenarioEnigmes(indexString, evalType, commentaire) {
    switch (indexString) {
        case scenarioState_enum[1]:
            {
                parentDiv.addContent("<h1>Une vieille invention :</h1>");
                if (evalType == ST_ERR) {
                    parentDiv.addContent("\
                <img src='../enigme/src/merlinerror0.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                } else {
                    parentDiv.addContent("\
                <img src='../enigme/src/merlin2.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                }
                if (commentaire != "") {
                    parentDiv.addContent("<p style='text-align: center;'>" + commentaire + "</p>");
                }
                parentDiv.addContent("\
                        <div style='position: relative;text-align: center;'>\
                            <img src='../enigme/src/Q.png' style='display: block;margin-left: auto;margin-right: auto;'/>\
                            <div style='position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);'>\
                                <p>Une vieille invention qui est très utilisée aujourd'hui, permet de voir à travers les murs.</p>\
                                <p>Qui suis-je ?</p>\
                            </div>\
                        </div>");
                printInHTML(parentDiv.render);
                document.getElementById("docScenarioEnigmes").style.display = "block";
                break;
            }

        case scenarioState_enum[2]:
            {
                parentDiv.addContent("<h1>Voilà un petit morceau :</h1>");
                if (commentaire != "") { // background-image:url(../enigme/src/parchemin.png);background-position:center;background-repeat:no-repeat;background-size:cover;
                    parentDiv.addContent("\
                        <div style='height:400px;width:1200px;overflow:auto;'>\
                            "+ commentaire +"\
                        </div>");
                    parentDiv.addContent("<h3>Saisissez la commande \"<bold>next</bold>\" pour passer à la prochaine enigme.</h3>");
                }
                printInHTML(parentDiv.render);
                break;
            }

        case scenarioState_enum[3]:
            {
                parentDiv.addContent("<h1>Une charade :</h1>");
                if (evalType == ST_ERR) {
                    parentDiv.addContent("\
                <img src='../enigme/src/merlinerror0.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                } else {
                    parentDiv.addContent("\
                <img src='../enigme/src/merlin3.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                }
                if (commentaire != "") {
                    parentDiv.addContent("<p style='text-align: center;'>" + commentaire + "</p>");
                }
                parentDiv.addContent("\
                        <div style='position: relative;text-align: center;'>\
                            <img src='../enigme/src/Q.png' style='display: block;margin-left: auto;margin-right: auto;'/>\
                            <div style='position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);'>\
                                <p>- Mon premier peut être en fer ou en chocolat</br>\
                                - Mon second est une boisson chaude très appréciée en Angleterre</br>\
                                - Mon troisième peut être mélangé (en petite quantité) à mon second</br>\
                                - Mon quatrième se trouve sous la croûte du pain</br>\
                                - Mon tout est un prénom</p>\
                            </div>\
                        </div>");
                printInHTML(parentDiv.render);
                break;
            }

        case scenarioState_enum[4]:
            {
                parentDiv.addContent("<h1>Voilà un autre petit morceau :</h1>");
                if (commentaire != "") {
                    parentDiv.addContent("\
                        <div style='height:400px;width:1200px;overflow:auto;'>\
                            "+ commentaire +"\
                        </div>");
                    parentDiv.addContent("<h3>Saisissez la commande \"<bold>next</bold>\" pour passer à la prochaine enigme.</h3>");
                }
                printInHTML(parentDiv.render);
                break;
            }

        case scenarioState_enum[5]:
            {
                parentDiv.addContent("<h1>Un monstre généreux :</h1>");
                if (evalType == ST_ERR) {
                    parentDiv.addContent("\
                <img src='../enigme/src/merlinerror0.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                } else {
                    parentDiv.addContent("\
                <img src='../enigme/src/merlin4.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
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

        case scenarioState_enum[6]:
            {
                parentDiv.addContent("<h1>Vous avez réussi !</h1>");
                parentDiv.addContent("<h3>Je dois admettre que vous êtes plutôt doué !</h3>");
                if (commentaire != "") {
                    parentDiv.addContent("\
                        <div style='height:400px;width:1200px;overflow:auto;'>\
                            "+ commentaire +"\
                        </div>");
                }
                //parentDiv.addContent("<img src='../enigme/src/merlin5.png' style='display: block;margin-left: auto;margin-right: auto;height: 150px;'/>");
                printInHTML(parentDiv.render);
                document.getElementById("docScenarioEnigmes").style.display = "none";
                break;
            }
    }
}

// fever the goal - source
/* ------------------------------ Fonctions pour le programme ------------------------------ */

function printInHTML(HTMLChain) {
    document.getElementById("enigmesText").innerHTML = HTMLChain;
}

function clearInHTML() {
    document.getElementById("enigmesText").innerHTML = "";
}

function hardResetEnigmes(){
    clearInHTML();
    displayEnigmesTextGame();
    scenarioState = "scenarioState_initialisation";
}

// Permet d'écrire directement dans une DIV spécifique
function printInHTMLInSpecificElement(HTMLChain, ElementId) {
    document.getElementById(ElementId).innerHTML = HTMLChain;
}

function clearInHTMLInSpecificElement(ElementId) {
    document.getElementById(ElementId).innerHTML = "";
}

function displayEnigmesTextGame() {
    return "<strong>ENIGMES : </strong><br>\
        <br> Partez à l'aventure en aidant Merlin qui cherche depuis une éternité... à résoudre trois misérables énigmes.<br>\
        <img src='../enigme/src/merlin0.png' style='display: block;margin: auto; height: 350px;' /> Si vous vous sentez prêt à l'aider, saissisez la commande \"launch\"."
}

function incToNextScenario() {
    for (let i = 0; i < scenarioState_enum.length; i++) {
        if (scenarioState_enum[i] == scenarioState) {
            scenarioState = scenarioState_enum[i + 1];
            nbTry = 1; // Le nombre d'essai resetté
            break;
        }
    }
}

function goToMenu(state) {
    clearInHTML();
    state.applicationState = "scenariosSelection";
    document.getElementById("menu").style.display = "flex";
    document.getElementById("displayScreenTitle").style.display = "flex";
    displayAvailableCommands(state.applicationState);
    writeCommandResults("Retour à l'écran principal de l'application.");
}

function getJsonPart(level) {
    tempStr = "";
    tempStr += "<p><h2>" + jsonResource[0].name + " m'a dit :</h2>";
    switch(level) {
        case 1:
        {
            tempStr += "<p><u>Mes attentes :</u></br>" + jsonResource[0].VosAttentes + "</p>";
            tempStr += "<p><u>Mes compétences professionnelles :</u></br>" + jsonResource[0].VosCompetenceProfessionnelles + "</p>";
            tempStr += "</p>";
            break;
        }
        case 2:
        {
            tempStr += "<p><u>Mes traits de personnalité :</u></br>" + jsonResource[0].VosTraitsDePersonnalités + "</p>";
            tempStr += "<p><u>Mes centres d'intérêts :</u></br>" + jsonResource[0].VosCentreInteret + "</p>";
            tempStr += "</p>";
            break;
        }
        case 3:
        {
            tempStr += "<p><u>Mes attentes :</u></br>" + jsonResource[0].VosAttentes + "</p>";
            tempStr += "<p><u>Mes compétences professionnelles :</u></br>" + jsonResource[0].VosCompetenceProfessionnelles + "</p>";
            tempStr += "<p><u>Mes traits de personnalité :</u></br>" + jsonResource[0].VosTraitsDePersonnalités + "</p>";
            tempStr += "<p><u>Mes centres d'intérêts :</u></br>" + jsonResource[0].VosCentreInteret + "</p>";
            tempStr += "<p><u>Mon itinéraire pro-passé :</u></br>" + jsonResource[0].VotreItineraireProPasse + "</p>";
            tempStr += "</p>";
            break;
        }
    }
    return tempStr;
}

/* ------------------------------------------------*/
function commandsEnigmes(commandKey, commandOptions, state) {
    if (commandKey == "menu") {
        hardResetEnigmes();
        state = commandsScenariosUtilities(commandKey, commandOptions, state);
        return state;
    }
    

    if (state.application == "scenarioEnigmes" | scenarioState == scenarioState_enum[0]) {
        switch (commandKey) {
            case "next":
                {
                    incToNextScenario(); // Passage à l'étape suivante
                    break;
                }
            default: {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
                break;
            }
        }
        nextStepScenarioEnigmes(scenarioState, ST_NONE, "");
        return state;
    }

    if (scenarioState == scenarioState_enum[1]) {
        if (commandKey == "menu") {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
            return state;
        }
        if (commandKey == "next" && nbTry > 3) {
            incToNextScenario();
            nextStepScenarioEnigmes(scenarioState, ST_NONE, getJsonPart(1)); // Passage à l'étape suivante
            return state;
        }
        if (scenarioStep1Responses_enum.includes(commandKey.toLowerCase())) {
            incToNextScenario();
            nextStepScenarioEnigmes(scenarioState, ST_NONE, getJsonPart(1)); // Passage à l'étape suivante
            return state;
        } else {
            nbTry += 1;
            if (nbTry <= 3) {
                nextStepScenarioEnigmes(scenarioState, ST_ERR, "Ce n'est pas la bonne réponse. Essaies encore.");
            } else {
                nextStepScenarioEnigmes(scenarioState, ST_ERR, "Ce n'est pas la bonne réponse... </br>Si tu veux, tu peux passer cette question en saissisant la commande \"next\"");
            }

        }
    }

    if (scenarioState == scenarioState_enum[2]) {
        switch (commandKey) {
            case "next":{
                incToNextScenario();
                nextStepScenarioEnigmes(scenarioState, ST_NONE, ""); // Passage à l'étape suivante
                return state;
            }
            default:{
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
                break;
            }
        }
    }

    if (scenarioState == scenarioState_enum[3]) {
        if (commandKey == "menu") {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
            return state;
        }
        if (commandKey == "next" && nbTry > 3) {
            incToNextScenario();
            nextStepScenarioEnigmes(scenarioState, ST_NONE, getJsonPart(2)); // Passage à l'étape suivante
            return state;
        }
        if (scenarioStep2Responses_enum.includes(commandKey.toLowerCase())) {
            incToNextScenario();
            nextStepScenarioEnigmes(scenarioState, ST_NONE, getJsonPart(2)); // Passage à l'étape suivante
            return state;
        } else {
            nbTry += 1;
            if (nbTry <= 3) {
                nextStepScenarioEnigmes(scenarioState, ST_ERR, "Ce n'est pas la bonne réponse. Essaies encore.");
            } else {
                nextStepScenarioEnigmes(scenarioState, ST_ERR, "Ce n'est pas la bonne réponse... </br>Si tu veux, tu peux passer cette question en saissisant la commande \"next\"");
            }
        }
    }

    if (scenarioState == scenarioState_enum[4]) {
        switch (commandKey) {
            case "next":{
                incToNextScenario();
                nextStepScenarioEnigmes(scenarioState, ST_NONE, ""); // Passage à l'étape suivante
                return state;
            }
            default:{
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
                break;
            }
        }
    }

    if (scenarioState == scenarioState_enum[5]) {
        if (commandKey == "menu") {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
            return state;
        }
        if (commandKey == "next" && nbTry > 3) {
            incToNextScenario();
            nextStepScenarioEnigmes(scenarioState, ST_NONE, getJsonPart(3));
            return state;
        }
        if (scenarioStep3Responses_enum.includes(commandKey.toLowerCase())) {
            incToNextScenario();
            nextStepScenarioEnigmes(scenarioState, ST_NONE, getJsonPart(3));
            return state;
        } else {
            nbTry += 1;
            if (nbTry <= 3) {
                nextStepScenarioEnigmes(scenarioState, ST_ERR, "Ce n'est pas la bonne réponse. Essaies encore.");
            } else {
                nextStepScenarioEnigmes(scenarioState, ST_ERR, "Ce n'est pas la bonne réponse... </br>Si tu veux, tu peux passer cette question en saissisant la commande \"next\"");
            }
        }
    }

    if (scenarioState == scenarioState_enum[6]) {
        state = commandsScenariosUtilities(commandKey, commandOptions, state);
        return state;
    }

    return state;
}

/* ---------------------------------------- Descripteur Etat du programme ---------------------------------------- */

const scenarioState_enum = [
    'scenarioState_initialisation',
    'scenarioState_stepOne',
    'scenarioState_stepOne_response',
    'scenarioState_stepTwo',
    'scenarioState_stepTwo_response',
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
const ST_ERR = 1;