/**********/
/*---------------------- INITIALISATION ----------------------*/
/**********/

(function init() {
    var state = {
        applicationState: 'initialisation',
        scenarioEnigmesState: 'initialisation',
        scenarioHackingState: {
            name: 'initialisation',
            previousCmd: '',
            isPreviousCmdSucced: true,
            stepTab: ["initialisation", "defend1", "recovery1", "defend2", "recovery2", "defend3", "recovery3", "end"],
        },
        scenarioJeuxState: {
            currentState: 'firstGameRules',
            stateArray: ['firstGameRules', 'firstGame', 'firstReward', 'secondGameRules', 'secondGame', 'secondReward', 'thirdGameRules', 'thirdGame', 'thirdReward', 'end'],
            gameState: '' 
        }
    };
    displayAvailableCommands(state.applicationState);
    var count = 1;
    var loadingFunc = setInterval(() => {
        if (count < 11) {
            document.getElementById('loadingBar' + count).style.visibility = "visible";
            count++;
        } else {
            clearInterval(loadingFunc);
            document.getElementById('loadingBarComponent').style.display = "none";
            document.getElementById('loadingText').classList.add('loadingTextPlus');
            document.getElementById('loadingText').textContent = "Bonjour Administrateur";
        }
    }, 350);

    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = "none";
        launchMenu(state);
    }, 5000);
})();

function launchMenu(state) {
    state.applicationState = "scenariosSelection";
    document.getElementById('menu').style.display = "flex";
    document.getElementById("displayScreenTitle").style.display = "flex";
    document.getElementById("displayScreenTitle").innerHTML = "Bienvenue";
    document.getElementById('displayScreen').style.display = "flex";
    document.getElementById('documentation').style.display = "block";
    document.getElementById('textInput').style.visibility = "visible";
    document.getElementById('input').style.visibility = "visible";
    displayAvailableCommands(state);
    var listScenarioDisplayText = document.getElementsByClassName("scenariosDisplayText");
    setToDisplayNone(listScenarioDisplayText);
    document.getElementById("commonText").style.display = "block";
    initializeCommandTypingEvent(state);
}


function initializeCommandTypingEvent(state) {
    var input = document.getElementsByTagName("INPUT")[0];
    input.focus();
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            var command = input.value.trim();
            if (command !== "") {
                writeCommandResults("> " + command);
                state = stateTraitment(command, state);
                input.value = "";
            }
        }
    });
}

/**********/
/*---------------------- TRAITEMENTS APPLICATION ----------------------*/
/**********/

function stateTraitment(command, state) {
    var commandObj = cutCommand(command);
    switch (state.applicationState) {
        case "scenariosSelection":
            {
                state = commandsSelection(commandObj.commandKey, commandObj.commandOptions, state);
                break;
            }
        case "scenarioEnigmes":
            {
                //commandsEnigmes();
                state = commandsEnigmes(commandObj.commandKey, commandObj.commandOptions, state);
                break;
            }
        case "scenarioHacking":
            {
                state = hackingScenario(commandObj.commandKey, commandObj.commandOptions, state);
                displayAvailableCommands(state);
                //state = commandsScenariosUtilities(commandObj.commandKey, commandObj.commandOptions, state);
                break;
            }
        case "scenarioJeux":
            {
                state = commandsJeux(commandObj.commandKey, commandObj.commandOptions, state);
                break;
            }
        default:
            break;
    }
    return state;
}

function commandsSelection(commandKey, commandOptions, state) {
    switch (commandKey) {
        case "select":
            {
                selectScenario(commandOptions);
                break;
            }
        case "launch":
            {
                state = launchScenario(state);
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

function selectScenario(commandOptions) {
    var listScenarioDisplayText = document.getElementsByClassName("scenariosDisplayText");
    setToDisplayNone(listScenarioDisplayText);
    if (document.getElementsByClassName('menuScenariosSelected')[0]) {
        document.getElementsByClassName('menuScenariosSelected')[0].classList.remove('menuScenariosSelected');
    }
    switch (commandOptions[0]) {
        case "--enigmas": {
            displayScenario("firstScenario", "enigmesText");
            break;
        }
        case "--hacking": {
            displayScenario("secondScenario", "hackingText");
            break;
        }
        case "--games": {
            displayScenario("thirdScenario", "gamesText");
            document.getElementById("gamesText").innerHTML = displayScenarioTextGame();
            break;
        }
        default: {
            writeCommandResults("Une option manque ou est mal écrite.");
            break;
        }
    }
}

function launchScenario(state) {
    if (document.getElementsByClassName('menuScenariosSelected')[0]) {
        writeCommandResults("Chargement des modules des interfaces utilisateurs\nVérification des données\nLancement du scénario");
        switch (document.getElementsByClassName('menuScenariosSelected')[0].textContent.trim()) {
            case "Enigmes":
                {
                    state.applicationState = "scenarioEnigmes";
                    runScenarioEnigmes();
                    break;
                }
            case "Hacking":
                {
                    state.applicationState = "scenarioHacking";
                    document.getElementById("hackingTextBox").innerHTML = textInitialisation();
                    break;
                }
            case "Jeux":
                {
                    state.applicationState = "scenarioJeux";
                    state = launchGameStep(state);
                    break;
                }
            default:
                console.log("launcher - in defalut case") // CRADE
                break;
        }
        displayAvailableCommands(state);
        document.getElementById("menu").style.display = "none";
        document.getElementById("displayScreenTitle").style.display = "none";
        document.getElementById("commonText").style.display = "none";
        if (document.getElementsByClassName('menuScenariosSelected')[0]) {
            document.getElementsByClassName('menuScenariosSelected')[0].classList.remove('menuScenariosSelected');
        }
    } else {
        writeCommandResults("Veuillez choisir un scénario avant de le charger.");
    }
    return state;
}

function commandsScenariosUtilities(commandKey, commandOptions, state) {
    switch (commandKey) {
        case "menu":
            {
                state.applicationState = "scenariosSelection";
                launchMenu(state)
                displayAvailableCommands(state);
                writeCommandResults("Retour à l'écran principal de l'application.");
                break;
            }
        case "bypass":
            {
                // c'est chiant à faire donc si tu vois ce commentaire j'ai eu la fleme
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

/**********/
/*---------------------- DOCUMENTATION ----------------------*/
/**********/

function displayAvailableCommands(state) {
    var allDocumentTexts = document.getElementsByClassName("textDocumentation")
    setToDisplayNone(allDocumentTexts);
    switch (state.applicationState) {
        case "scenariosSelection":
            {
                document.getElementById('docMenu').style.display = "block";
                break;
            }
        case "scenarioEnigmes":
            {
                document.getElementById('docScenarioEnigmes').style.display = "block";
                displayUtilitiesCommands();
                break;
            }
        case "scenarioHacking":
            {
                var hackerDocElement = document.getElementById("docScenarioHacking");
                hackerDocElement.style.display = "block";
                switch (state.scenarioHackingState.name) {
                    case "initialisation":
                        {
                            hackerDocElement.innerHTML = documentationHackInit();
                            break;
                        }
                    case "defend1":
                        {
                            hackerDocElement.innerHTML = documentationHackDefend1();
                            break;
                        }
                    case "recovery1":
                        {
                            hackerDocElement.innerHTML = documentationHackRecovery1();
                            break;
                        }
                    case "defend2":
                        {
                            hackerDocElement.innerHTML = documentationHackDefend2();
                            break;
                        }
                    case "recovery2":
                        {
                            hackerDocElement.innerHTML = documentationHackRecovery2();
                            break;
                        }
                    case "defend3":
                        {
                            hackerDocElement.innerHTML = documentationHackDefend3();
                            break;
                        }
                    case "recovery3":
                        {
                            hackerDocElement.innerHTML = documentationHackRecovery3();
                            break;
                        }

                    case "end":
                        {
                            hackerDocElement.innerHTML = documentationHackEnd();
                            break;
                        }

                    default:
                        document.getElementById('docScenarioHacking').style.display = "block";
                        break;
                }
                displayUtilitiesCommands();
                break;
            }
        case "scenarioJeux":
            {
                document.getElementById('docScenarioJeux').style.display = "block";
                displayUtilitiesCommands();
                break;
            }
        default:
            break;
    }
}

function displayUtilitiesCommands() {
    document.getElementById('docUtilities').style.display = "block";
}

/**********/
/*---------------------- UTILITAIRE ----------------------*/
/**********/

function setToDisplayNone(elementsToHide) {
    Array.from(elementsToHide).forEach(element => {
        element.style.display = "none";
    });
}

function writeCommandResults(text) {
    var textResults = document.getElementById("textResults");
    var newText = document.createElement('DIV');
    if (text[0] !== ">") {
        newText.classList = 'anim-typewriter';
    }
    newText.innerHTML = "<div>" + text + "</div>";
    textResults.appendChild(newText);
    scrollDown("commandResults");
}

function cutCommand(command) {
    var commandParts = command.split(" ");
    var commandKey = commandParts[0];
    commandParts.splice(0, 1);
    var commandOptions = commandParts;
    return { commandKey, commandOptions };
}


function scrollDown(id) {
    var objDiv = document.getElementById(id);
    objDiv.scrollTop = objDiv.scrollHeight;
}

function displayScenario(idTitle, idText) {
    var title = document.getElementById(idTitle).textContent.trim();
    writeCommandResults("Sélection du scénario " + title + "... Affichage des informations supplémentaires pour le scénario choisi...");
    document.getElementById("displayScreenTitle").textContent = title;
    if (idText === "hackingText") {
        document.getElementById(idText).style.display = "flex";
    } else {
        document.getElementById(idText).style.display = "block";
    }
    document.getElementById(idTitle).classList.add('menuScenariosSelected');
}