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
        <img src='/merlin1.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>\
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
                <img src='/merlinerror0.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                } else {
                    parentDiv.addContent("\
                <img src='/merlin2.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                }
                if (commentaire != "") {
                    parentDiv.addContent("<p style='text-align: center;'>" + commentaire + "</p>");
                }
                parentDiv.addContent("\
                        <div style='position: relative;text-align: center;'>\
                            <img src='/Q.png' style='display: block;margin-left: auto;margin-right: auto;'/>\
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
                if (commentaire != "") { // background-image:url(/parchemin.png);background-position:center;background-repeat:no-repeat;background-size:cover;
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
                <img src='/merlinerror0.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                } else {
                    parentDiv.addContent("\
                <img src='/merlin3.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                }
                if (commentaire != "") {
                    parentDiv.addContent("<p style='text-align: center;'>" + commentaire + "</p>");
                }
                parentDiv.addContent("\
                        <div style='position: relative;text-align: center;'>\
                            <img src='/Q.png' style='display: block;margin-left: auto;margin-right: auto;'/>\
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
                <img src='/merlinerror0.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                } else {
                    parentDiv.addContent("\
                <img src='/merlin4.png' style='display: block;margin-left: auto;margin-right: auto;height: 200px;'/>");
                }
                if (commentaire != "") {
                    parentDiv.addContent("<p style='text-align: center;'>" + commentaire + "</p>");
                }
                parentDiv.addContent("\
                        <div style='position: relative;text-align: center;'>\
                            <img src='/Q.png' style='display: block;margin-left: auto;margin-right: auto;'/>\
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
                //parentDiv.addContent("<img src='/merlin5.png' style='display: block;margin-left: auto;margin-right: auto;height: 150px;'/>");
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
        <img src='/merlin0.png' style='display: block;margin: auto; height: 350px;' /> Si vous vous sentez prêt à l'aider, saissisez la commande \"launch\"."
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
    tempStr += "<p><h2>" + jsonEnigmeResource[0].name + " m'a dit :</h2>";
    switch(level) {
        case 1:
        {
            tempStr += "<p><u>Mes attentes :</u></br>" + jsonEnigmeResource[0].VosAttentes + "</p>";
            tempStr += "<p><u>Mes compétences professionnelles :</u></br>" + jsonEnigmeResource[0].VosCompetenceProfessionnelles + "</p>";
            tempStr += "</p>";
            break;
        }
        case 2:
        {
            tempStr += "<p><u>Mes traits de personnalité :</u></br>" + jsonEnigmeResource[0].VosTraitsDePersonnalités + "</p>";
            tempStr += "<p><u>Mes centres d'intérêts :</u></br>" + jsonEnigmeResource[0].VosCentreInteret + "</p>";
            tempStr += "</p>";
            break;
        }
        case 3:
        {
            tempStr += "<p><u>Mes attentes :</u></br>" + jsonEnigmeResource[0].VosAttentes + "</p>";
            tempStr += "<p><u>Mes compétences professionnelles :</u></br>" + jsonEnigmeResource[0].VosCompetenceProfessionnelles + "</p>";
            tempStr += "<p><u>Mes traits de personnalité :</u></br>" + jsonEnigmeResource[0].VosTraitsDePersonnalités + "</p>";
            tempStr += "<p><u>Mes centres d'intérêts :</u></br>" + jsonEnigmeResource[0].VosCentreInteret + "</p>";
            tempStr += "<p><u>Mon itinéraire pro-passé :</u></br>" + jsonEnigmeResource[0].VotreItineraireProPasse + "</p>";
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

var jsonEnigmeResource =
[
    {   // Ancelin GLORIES
        "name":"Ancelin GLORIES",
        "VosAttentes":"\
            Après cette formation, j’aimerais poursuivre mes études. Je suis encore étudiant, jeune et motivé à apprendre,\
            je préfère donc faire en sorte d’atteindre mes limites dans les études. Je souhaiterais alors faire une thèse, \
            si possible dans le domaine de la recherche en micro-informatique, sujet qui me passionne énormément, \
            dans le but d’améliorer mes compétences. Dans le cas où il m’est impossible de poursuivre mes études, \
            j’aimerais travailler directement dans la même entreprise que mon alternance qui, \
            jusque-là, apprécie mon travail. Dans un futur plus lointain, j’aimerais travailler dans la micro-informatique au sens large du terme (conception de processeur, \
            programmation de systèmes embarqués, etc…).",
        "VosCompetenceProfessionnelles":"\
            •	Le travail d’équipe, qui selon moi est crucial dans une entreprise,</br>\
            •	Ma polyvalence,</br>\
            •	Le fait d’être rigoureux renforce ma capacité à vouloir faire et rendre un travail de qualité,</br>\
            •	Ma curiosité est de loin mon meilleur atout car c’est grâce à lui que j’aime ce que je fais aujourd’hui,</br>\
            •	Etre persévérant et savoir prendre du recul me permet de réfléchir strategiquement,</br>\
            •	Mon autonomie est aussi très appréciée en entreprise.",
        "VosTraitsDePersonnalités":"\
            Ils ont été évalués dans différents milieux : au sein de ma famille, de mes amis, et moi-même.\
            Selon eux je suis quelqu’un qui est à l’aise en travail d’équipe (coopératif, impliqué, à l’écoute, rationnel), \
            mais malgré tout renfermé (timide, réservé, ayant du mal à accorder sa confiance aux amis proches), \
            et parfois dur avec moi-même (isolement en cas de difficulté, manque de confiance en soi, a du mal à se mettre en valeur). \
            Cependant tout cela n’affecte en rien mes capacités à être cool, respectueux, poli, rétro, empathique, intelligent, calme, …",
        "VosCentreInteret":"\
            Ils sont assez ciblés : lire, jouer aux jeux vidéo, informatique \
            (amateur de collection de vieux ordinateurs, apprentissage de vieux langages de programmation), \
            électronique (Arduino, Raspberry PI), autodidacte (électronique, informatique, micro-informatique).",
        "VotreItineraireProPasse":"\
            Après le collège, je suis allé en lycée professionnel, notamment en raison du peu de sérieux que j’avais à ce moment-là. \
            Mon choix s’est alors porté sur le Bac Processionnel Système Electronique et Numérique dans le lycée Déodat de Séverac. \
            Durant ces trois années, ma passion dans le domaine de l’informatique n’a fait que croitre. \
            De plus, je pris peu à peu goût au développement informatique durant mes différentes sessions de stage en entreprise \
            (je remercie David PHAM, gérant de la société D@videv Informatique pour m’avoir formé). \
            A la fin de cette formation, j’ai hésité entre continuer mes études avec un BTS SIO au lycée Ozenne à Toulouse ou poursuivre \
            au lycée Déodat de Séverac avec le BTS Système Numérique. Après quelques semaines de réflexion, \
            j’ai décidé de mettre le BTS SN (système numérique) en premier vœu, étant déjà scolarisé au lycée Déodat, \
            et ayant mes amis dans le même établissement. De ce fait le BTS SIO fut mis en seconde place, jugé à mes yeux moins important.\
            Mon premier vœu a alors été accepté. Après ces deux années en BTS SN, j’ai dû décider ou non de poursuivre mes études. \
            Etant major de promotion à ce moment-là, je ne voulais pas gâcher ma chance de pouvoir continuer vers une licence classique \
            ou professionnelle. J’ai alors posé me candidature dans différentes écoles, que ce soit en licence informatique (L2 et L3) \
            à l’université Paul Sabatier ou dans des licences professionnelles. Au final, une seule formation m’a accepté : \
            la licence professionnelle APSIO (Analyste Programmateur de Systèmes Informatiques Ouvert) à l’IUT de Blagnac. \
            J’ai donc dû contacter plusieurs entreprises acceptant de prendre des étudiants en alternance. Je fus alors pris chez Engie \
            INEO. Après un entretien concluant, j’ai commencé à travailler là-bas. A la fin de cette année de licence, souhaitant \
            poursuivre mes études, j’ai soumis ma candidature dans différentes écoles : l’ENSEEIHT (que deux employés d’Engie INEO \
            m’avaient conseillé), le Master ICE en alternance à l’université Toulouse II Jean Jaurès et d’autres formations \
            professionnelles. Je fus pris dans le Master quelques jours seulement avant le début des cours. Je suis donc \
            resté dans la même entreprise.\
            Si aucune formation ne m’avait accepté, j’aurais alors signé un CDI chez Engie."
    }
]