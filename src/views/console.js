
/**********/
/*---------------------- INITIALISATION ----------------------*/
/**********/

(function init() {
    var applicationState = "initialisation";
    displayAvailableCommands(applicationState);
    var bar, perc, start, update;

    bar = document.getElementsByClassName('percentage')[0];

    perc = 0;

    update = function () {
        bar.style.width = perc + '%';
        bar.setAttribute("perc", Math.floor(perc) + '%');
        perc += 0.2;
        if (Math.floor(perc) === 5) {
            bar.classList.add('active');
        }
        if (Math.floor(perc) === 95) {
            bar.classList.remove('active');
        }
        if (perc >= 100) {
            return perc = 0;
        }
    };

    start = function () {
        var run;
        return run = setInterval(update, 10);
    };

    start();
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = "none";
        launchMenu(applicationState);
    }, 1000);
})();

function launchMenu(applicationState) {
    applicationState = "scenariosSelection";
    document.getElementById('menu').style.display = "flex";
    document.getElementById('displayScreen').style.display = "flex";
    document.getElementById('documentation').style.display = "block";
    document.getElementById('textInput').style.visibility = "visible";
    document.getElementById('input').style.visibility = "visible";
    displayAvailableCommands(applicationState);
    var listScenarioDisplayText = document.getElementsByClassName("scenariosDisplayText");
    setToDisplayNone(listScenarioDisplayText);
    initializeCommandTypingEvent(applicationState);
}


function initializeCommandTypingEvent(applicationState) {
    var input = document.getElementsByTagName("INPUT")[0];
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            var command = input.value.trim();
            if(command !== "") {
                writeCommandResults("> " + command);
                scrollDown("commandResults");
                applicationState = stateTraitment(command, applicationState);
                input.value = "";
            }
        }
    });
}

/**********/
/*---------------------- TRAITEMENTS APPLICATION ----------------------*/
/**********/

function stateTraitment(command, applicationState) {
    var commandObj = cutCommand(command);
    switch(applicationState) {
        case "scenariosSelection" : {
            applicationState = commandsSelection(commandObj.commandKey, commandObj.commandOptions, applicationState);
            break;
        }
        case "scenarioEnigmes": {
            commandsEnigmes();
            applicationState = commandsScenariosUtilities(commandObj.commandKey, commandObj.commandOptions, applicationState);
            break;
        }
        case "scenarioHacking": {
            commandsHacking();
            applicationState = commandsScenariosUtilities(commandObj.commandKey, commandObj.commandOptions, applicationState);
            break;
        }
        case "scenarioJeux": {
            commandsJeux();
            applicationState = commandsScenariosUtilities(commandObj.commandKey, commandObj.commandOptions, applicationState);
            break;
        }
        default: break;    
    }
    scrollDown("commandResults");
    return applicationState;
}

function commandsSelection(commandKey, commandOptions, applicationState) {
    switch (commandKey) {
        case "select": {
            selectScenario(commandOptions);
            break;
        }
        case "launch": {
            applicationState = launchScenario(applicationState);
            break;
        }
        default: {
            writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
            break;
        }
    }
    return applicationState;
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
            break;
        }
        default: {
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
            case "Enigmes": {
                applicationState = "scenarioEnigmes";
                break;
            }
            case "Hacking": {
                applicationState = "scenarioHacking";
                break;
            }
            case "Jeux": {
                applicationState = "scenarioJeux";
                break;
            }
            default: break;
        }
        displayAvailableCommands(applicationState);
        document.getElementById("menu").style.display = "none";
        document.getElementById("displayScreenTitle").style.display = "none";
    } else {
        writeCommandResults("Veuillez choisir un scénario avant de le charger.");
    }
    return applicationState;
}

function commandsEnigmes() {}

function commandsHacking() { }

function commandsJeux() { }

function commandsScenariosUtilities(commandKey, commandOptions, applicationState) {
    switch (commandKey) {
        case "menu": {
            applicationState = "scenariosSelection";
            document.getElementById("menu").style.display = "flex";
            document.getElementById("displayScreenTitle").style.display = "flex";
            displayAvailableCommands(applicationState);
            writeCommandResults("Retour à l'écran principal de l'application.");
            break;
        }
        default: {
            writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
            break;
        }
    }
    return applicationState;
}

/**********/
/*---------------------- DOCUMENTATION ----------------------*/
/**********/

function displayAvailableCommands(applicationState) {
    var allDocumentTexts = document.getElementsByClassName("textDocumentation")
    setToDisplayNone(allDocumentTexts);
    switch(applicationState) {
        case "scenariosSelection": {            
            document.getElementById('docMenu').style.display = "block";
            break;
        }
        case "scenarioEnigmes": {
            document.getElementById('docScenarioEnigmes').style.display = "block";
            displayUtilitiesCommands(documentation);
            break;
        }
        case "scenarioHacking": {
            document.getElementById('docScenarioHacking').style.display = "block";
            displayUtilitiesCommands(documentation);
            break;
        }
        case "scenarioJeux": {
            document.getElementById('docScenarioJeux').style.display = "block";
            displayUtilitiesCommands(documentation);
            break;
        }
        default: break;
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
    textResults.innerText += "\n" + text;
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
    writeCommandResults("Sélection du scénario " + title + ".");
    writeCommandResults("Affichage des informations supplémentaires pour le scénario choisi.");
    document.getElementById("displayScreenTitle").textContent = title;
    document.getElementById(idText).style.display = "block";
    document.getElementById(idTitle).classList.add('menuScenariosSelected');
}