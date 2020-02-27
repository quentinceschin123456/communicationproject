function launchScenarioJeux(state) {

    var screen = document.getElementById('displayScreenText');
    screen.innerHTML = "SEXE";
    state.scenarioJeuxState = "ok";
    return state;
}