function commandsJeux(commandKey, commandOptions, state) {
    switch (commandKey) {
        case "continue": {
            state = launchGameStep(skipCurrentState(state));
            break;
        }
        case "skip-game": {
            state = launchGameStep(skipCurrentState(state));
            break;
        }
        case "lock-movement": {
            state = lockMovement(state);
            if(state.scenarioJeuxState.gameState.errorMessage) {
                writeCommandResults(state.scenarioJeuxState.gameState.errorMessage);
            } else {
                writeCommandResults("Le pion est posé...");
            }
            break;
        }
        default: {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
            break;
        }
    }
    return state;
}

function skipCurrentState(state) {
    var indice = state.scenarioJeuxState.stateArray.indexOf(state.scenarioJeuxState.currentState) + 1;
    if (indice < state.scenarioJeuxState.stateArray.length) {
        state.scenarioJeuxState.currentState = state.scenarioJeuxState.stateArray[indice];
    } else {
        state.scenarioJeuxState.currentState = state.scenarioJeuxState.stateArray[state.scenarioJeuxState.stateArray.length - 1];
    }
    return state;
}

function displayScenarioTextGame() {
    var htmlTextGame = "<strong>JEUX : </strong><br><br>J'ai entendu dire que vous êtes à la recherche d'informations sur une certaine personne...<br><br>Nous savons tous les deux que je suis votre seule chance d'obtenir ce que vous cherchez... Mais vais-je réellement vous donner ce que vous voulez sans contre partie ? <br>Evidemment que non !<br><br>Néanmoins ce n'est pas d'argent dont nous parlerons... voyez vous, je suis plutôt joueur ;)<br><br>Venez donc tester vos limites et gagner, peut être, les informations que vous êtes venuechercher..."
    return htmlTextGame;
}

function displayGameRules(currentState) {
    var rules = "";
    switch(currentState) {
        case "firstGameRules" : {
            rules = "Expliquer règles morpion yolo";
            break;
        }
        case "secondGameRules" : {
            rules = "Expliquer règles dames yolo";
            break;
        }
        case "thirdGameRules" : {
            rules = "Expliquer règles contamination yolo";
            break;
        }
    }
}

function displayGame(currentState, htmlMatrice) {
    var screen = document.getElementById('gamesText');

    switch(currentState) {
        case "firstGame" : {
            screen.innerHTML = "MORPION";
            screen.innerHTML += htmlMatrice;
            break;
        }
        case "secondGame" : {
            screen.innerHTML = "DAMES";
            break;
        }
        case "thirdGame" : {
            screen.innerHTML = "CONTAMINATION";
            break;
        }
    }
}

function displayGameRewards(currentState) {
    console.log(currentState);
    var screen = document.getElementById('gamesText');
    switch(currentState) {
        case "firstReward" : {
            screen.innerHTML = "Texte 1 + Texte 2";
            break;
        }
        case "secondReward" : {
            screen.innerHTML = "Texte 3 + Texte 4";
            break;
        }
        case "thirdReward" : {
            screen.innerHTML = "Text 5 + Texte 6";
            break;
        }
        case "end" : {
            screen.innerHTML = "CV";
            break;
        }
    }
}

function displayGameRules(currentState) {
    var screen = document.getElementById('gamesText');
    switch(currentState) {
        case "firstGameRules" : {
            screen.innerHTML = "Expliquer règles morpion yolo";
            break;
        }
        case "secondGameRules" : {
            screen.innerHTML = "Expliquer règles dames yolo";
            break;
        }
        case "thirdGameRules" : {
            screen.innerHTML = "Expliquer règles contamination yolo";
            break;
        }
    }
}

function launchGameStep(state) {
    var docmnt = document.getElementById('docScenarioJeux');
    docmnt.innerHTML = "<h2>Commandes du scénario : </h2>";
    switch(state.scenarioJeuxState.currentState) {
        case "firstGameRules": {
            // 1 Modifier l'affichage principal
            displayGameRules(state.scenarioJeuxState.currentState);
            // 2 Ecrire dans le result command quelque chose
            writeCommandResults("//--- Règles du jeux n°1 ---//")
            // 3 Afficher les commandes utilisables
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "firstGame": {
            state.scenarioJeuxState.gameState = buildGameObject(3);
            displayGame(state.scenarioJeuxState.currentState, state.scenarioJeuxState.gameState.htmlMatrice);
            bindClickMatrice();
            writeCommandResults("//--- Jeux n°1 ---//")
            docmnt.innerHTML += "<strong>skip-game : </strong>Passer la phase de jeu<br>";
            break;
        }
        case "firstReward": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Récompenses du jeux n°1 ---//")
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "secondGameRules": {
            displayGameRules(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Règles du jeux n°2 ---//")
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "secondGame": {
            displayGame(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Jeux n°2 ---//")
            docmnt.innerHTML += "<strong>skip-game : </strong>Passer la phase de jeu<br>";
            break;
        }
        case "secondReward": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Récompenses du jeux n°2 ---//")
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "thirdGameRules": {
            displayGameRules(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Règles du jeux n°3 ---//")
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "thirdGame": {
            displayGame(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Jeux n°3 ---//")
            docmnt.innerHTML += "<strong>skip-game : </strong>Passer la phase de jeu<br>";
            break;
        }
        case "thirdReward": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Récompenses du jeux n°3 ---//")
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "end": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Super récompense ---//")
            docmnt.innerHTML = "";
            break;
        }
        default : {
            break;
        }
    }
    return state;
}


// PLATEAU //

function setBoardGame(size) {
    var matrice = new Array();
    matrice.length = size;

    for (var i = 0; i < matrice.length; i++) {
        for (var j = 0; j < matrice.length; j++) {
            if (!matrice[i]) matrice[i] = new Array();
            var case_courante = "";
            matrice[i][j] = case_courante;
        }
    }

    return matrice;
}

function buildHTMLMatrice(matrice) {
    var htmlMatrice = "<div id='morpionGameBoard'>";

    for (var i = 0; i < matrice.length; i++) {
        htmlMatrice += "<div id='lign-" + i + "' class='lign'>";
        for (var j = 0; j < matrice.length; j++) {
            htmlMatrice += "<div class='case'><div id='case-" + i + "-" + j + "' class='innerCase'>" + matrice[i][j] + "</div></div>";
        }
        htmlMatrice += "</div>";
    }

    htmlMatrice += "</div>";

    return htmlMatrice;
}


function retrieveHTMLMatrice(rawMatrice) {
    var htmlMatrice = buildHTMLMatrice(rawMatrice);
    return htmlMatrice;
}

function bindClickMatrice() {
    var allCase = document.getElementsByClassName('case');
    Array.from(allCase).forEach(element => {
        element.addEventListener('click',() => {
            console.log(element);
            var selectedCase = document.getElementsByClassName('selectedCase')[0];
            if(selectedCase) {
                selectedCase.classList.remove('selectedCase');
            }
            element.firstChild.classList.add('selectedCase');
        });
    });
}

// PIONS //

function lockMovement(state) {
    var selectedCase = document.getElementsByClassName('selectedCase')[0];
    if(selectedCase.innerHTML === '') {
        var caseCell = {
            ligne : selectedCase.id.split('-')[1], 
            colonne : selectedCase.id.split('-')[2]
        };
        var pion = (state.scenarioJeuxState.gameState.gamerTurn ? '<div class="marginAuto">X</div>' : '<div class="marginAuto">O</div>');
        state.scenarioJeuxState.gameState.rawMatrice[caseCell.ligne][caseCell.colonne] = pion;
        updateHTMLMatrice(selectedCase, pion);
        state.scenarioJeuxState.gameState.gamerTurn = !state.scenarioJeuxState.gameState.gamerTurn;
    } else {
        state.scenarioJeuxState.gameState.errorMessage = "Un joueur a déjà un pion sur cette case !";
    }
    return state;
}

function buildGameObject(size) {
    var rawMatrice = setBoardGame(size);
    var boardGame = {
        rawMatrice: rawMatrice,
        htmlMatrice: retrieveHTMLMatrice(rawMatrice),
        gamerTurn: true,
        isFinished: false,
        errorMessage: '',
    }

    return boardGame;
}

function updateHTMLMatrice(caseCell, pion) {
    caseCell.innerHTML = pion;
}