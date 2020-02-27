/**********/
/*---------------------- INITIALISATION ----------------------*/
/**********/

(function init() {
    var state = {
        applicationState: 'initialisation',
        scenarioEnigmesState: 'initialisation',
        scenarioHackingState: 'initialisation',
        scenarioJeuxState: 'initialisation'
    }
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
    document.getElementById('displayScreen').style.display = "flex";
    document.getElementById('documentation').style.display = "block";
    document.getElementById('textInput').style.visibility = "visible";
    document.getElementById('input').style.visibility = "visible";
    displayAvailableCommands(state.applicationState);
    var listScenarioDisplayText = document.getElementsByClassName("scenariosDisplayText");
    setToDisplayNone(listScenarioDisplayText);
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
                scrollDown("commandResults");
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
    var commandObj = cutCommand(command); <<
    << << < HEAD
    switch (state.applicationState) {
        case "scenariosSelection":
            {
                state = commandsSelection(commandObj.commandKey, commandObj.commandOptions, state); ===
                === =
                switch (applicationState) {
                    case "scenariosSelection":
                        {
                            applicationState = commandsSelection(commandObj.commandKey, commandObj.commandOptions, applicationState); >>>
                            >>> > starting my personal dev XD
                            break;
                        }
                    case "scenarioEnigmes":
                        {
                            commandsEnigmes(); <<
                            << << < HEAD
                            state = commandsScenariosUtilities(commandObj.commandKey, commandObj.commandOptions, state); ===
                            === =
                            applicationState = commandsScenariosUtilities(commandObj.commandKey, commandObj.commandOptions, applicationState); >>>
                            >>> > starting my personal dev XD
                            break;
                        }
                    case "scenarioHacking":
                        { <<
                            << << < HEAD
                            commandsHacking();
                            state = commandsScenariosUtilities(commandObj.commandKey, commandObj.commandOptions, state); ===
                            === =
                            commandsHacking(commandObj.commandKey, commandObj.commandOptions, applicationState);
                            applicationState = commandsScenariosUtilities(commandObj.commandKey, commandObj.commandOptions, applicationState); >>>
                            >>> > starting my personal dev XD
                            break;
                        }
                    case "scenarioJeux":
                        {
                            commandsJeux(); <<
                            << << < HEAD
                            state = commandsScenariosUtilities(commandObj.commandKey, commandObj.commandOptions, state); ===
                            === =
                            applicationState = commandsScenariosUtilities(commandObj.commandKey, commandObj.commandOptions, applicationState); >>>
                            >>> > starting my personal dev XD
                            break;
                        }
                    default:
                        break;
                }
                scrollDown("commandResults");
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
                        { <<
                            << << < HEAD
                            state = launchScenario(state); ===
                            === =
                            applicationState = launchScenario(applicationState); >>>
                            >>> > starting my personal dev XD
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
                    case "--enigmas":
                        {
                            displayScenario("firstScenario", "enigmesText");
                            break;
                        }
                    case "--hacking":
                        {
                            displayScenario("secondScenario", "hackingText");
                            break;
                        }
                    case "--games":
                        {
                            displayScenario("thirdScenario", "gamesText");
                            break;
                        }
                    default:
                        {
                            writeCommandResults("Une option manque ou est mal écrite. Options disponibles pour la commande 'select' : ");
                            writeCommandResults(" * select --enigmas");
                            writeCommandResults(" * select --hacking");
                            writeCommandResults(" * select --games");
                            break;
                        }
                }
            }

            function launchScenario(applicationState) {
                if (document.getElementsByClassName('menuScenariosSelected')[0]) {
                    writeCommandResults("Chargement des modules des interfaces utilisateurs\nVérification des données\nLancement du scénario");
                    switch (document.getElementsByClassName('menuScenariosSelected')[0].textContent.trim()) {
                        case "Enigmes":
                            {
                                applicationState = "scenarioEnigmes";
                                break;
                            }
                        case "Hacking":
                            {
                                applicationState = "scenarioHacking";
                                scenarioState = hackingScenario(scenarioState);
                                break;
                            }
                        case "Jeux":
                            {
                                applicationState = "scenarioJeux";
                                break;
                            }
                        default:
                            break;
                    }
                    displayAvailableCommands(state.applicationState);
                    document.getElementById("menu").style.display = "none";
                    document.getElementById("displayScreenTitle").style.display = "none";
                } else {
                    writeCommandResults("Veuillez choisir un scénario avant de le charger.");
                }
                return state;
            }

            function commandsEnigmes() {}

            function commandsHacking(commandKey, commandOptions, applicationState) {
                switch (commandKey) {
                    case "bypass":
                        {
                            applicationState = "scenariosSelection";
                            document.getElementById("menu").style.display = "flex";
                            document.getElementById("displayScreenTitle").style.display = "flex";
                            displayAvailableCommands(applicationState);
                            writeCommandResults("Retour à l'écran principal de l'application.");
                            break;
                        }

                }
                return applicationState;
            }

            function commandsJeux() {}

            function commandsScenariosUtilities(commandKey, commandOptions, state) {
                switch (commandKey) {
                    case "menu":
                        {
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

            /**********/
            /*---------------------- DOCUMENTATION ----------------------*/
            /**********/

            function displayAvailableCommands(applicationState) {
                var allDocumentTexts = document.getElementsByClassName("textDocumentation")
                setToDisplayNone(allDocumentTexts);
                switch (applicationState) {
                    case "scenariosSelection":
                        {
                            document.getElementById('docMenu').style.display = "block";
                            break;
                        }
                    case "scenarioEnigmes":
                        {
                            document.getElementById('docScenarioEnigmes').style.display = "block";
                            displayUtilitiesCommands(documentation);
                            break;
                        }
                    case "scenarioHacking":
                        {
                            document.getElementById('docScenarioHacking').style.display = "block";
                            displayUtilitiesCommands(documentation);
                            break;
                        }
                    case "scenarioJeux":
                        {
                            document.getElementById('docScenarioJeux').style.display = "block";
                            displayUtilitiesCommands(documentation);
                            break;
                        }
                    default:
                        break;
                }
            }

            function displayUtilitiesCommands(documentation) {
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
                document.getElementById(idText).style.display = "block";
                document.getElementById(idTitle).classList.add('menuScenariosSelected');
            }