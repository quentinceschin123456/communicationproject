function launchScenarioJeux(state) {

    var screen = document.getElementById('gamesText');
    screen.innerHTML = displayFirstGameRules();
    state.scenarioJeuxState.currentState = "firstGameRules";
    return state;
}

function commandsJeux(commandKey, commandOptions, state) {
    switch (commandKey) {
        case "test": {
            writeCommandResults("test");
            break;
        }
        case "continue": {
            state = skipCurrentState(state);
            launchGameStep(state);
            break;
        }
        case "skip-game": {
            state = skipCurrentState(state);
            launchGameStep(state);
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

function displayFirstGameRules() {
    var htmlFirstGameRules = "Expliquer règles morpion yolo";
    return htmlFirstGameRules;
}

function launchGameStep(state) {
    switch(state.scenarioJeuxState.currentState) {
        case "": {
            break;
        }
        default : {
            break;
        }
    }
}

// PLATEAU //

function setBoardGame(size) {
    var matrice = new Array();
    matrice.length = size;

    for (var i = 0; i < matrice.length; i++) {
        for (var j = 0; j < matrice.length; j++) {
            if (!matrice[i]) matrice[i] = new Array();
            var case_courante = prompt('Valeur de la case :' + i + '|' + j);
            matrice[i][j] = case_courante;
        }
    }

    return matrice;
}