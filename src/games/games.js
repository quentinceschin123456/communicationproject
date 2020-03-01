function launchScenarioJeux(state) {

    var screen = document.getElementById('gamesText');
    screen.innerHTML = displayScenarioTextGame();
    state.scenarioJeuxState = "firstGameRules";
    return state;
}

function commandsJeux(commandKey, commandOptions, state) {
    switch (commandKey) {
        case "test":
            {
                writeCommandResults("test");
                break;
            }
        default:
            {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
                break;
            }
    }
    return state;
}

function displayScenarioTextGame() {
    var htmlTextGame = "<strong>JEUX : </strong><br><br>J'ai entendu dire que vous êtes à la recherche d'informations sur une certainepersonne...<br><br>Nous savons tous les deux que je suis votre seule chance d'obtenir ce que vous cherchez... Mais vais-je réellement vous donner ce que vous voulez sans contre partie ? <br>Evidemment que non !<br><br>Néanmoins ce n'est pas d'argent dont nous parlerons... voyez vous, je suis plutôt joueur ;)<br><br>Venez donc tester vos limites et gagner, peut être, les informations que vous êtes venuechercher..."
    return htmlTextGame;
}