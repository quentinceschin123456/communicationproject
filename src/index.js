(function init() {
    displayAvailableCommands("initialisation");
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
        launchMenu()
    }, 5000);
})();

function launchMenu() {
    document.getElementById('menu').style.display = "flex";
    document.getElementById('displayScreen').style.display = "flex";
    document.getElementById('documentation').style.display = "block";
    document.getElementById('textInput').style.visibility = "visible";
    document.getElementById('input').style.visibility = "visible";
    displayAvailableCommands("scenariosSelection");
    removeScenariosDisplayText();
    initializeCommandTypingEvent();
}

function removeScenariosDisplayText() {
    var listScenarioDisplayText = document.getElementsByClassName("scenariosDisplayText");
    Array.from(listScenarioDisplayText).forEach(element => {
        element.style.display = "none";
    });
}

function initializeCommandTypingEvent() {
    var input = document.getElementsByTagName("INPUT")[0];
    input.onkeyup = function (event) {
        if (event.keyCode === 13) {
            writeCommandResults("> " + input.value);
            scrollDown("commandResults");
            commandTraitment(input.value);
            input.value = "";
        }
    }
}

function scrollDown(id) {
    var objDiv = document.getElementById(id);
    objDiv.scrollTop = objDiv.scrollHeight;
}


function commandTraitment(command) {
    var commandObj = cutCommand(command);
    switch (commandObj.commandKey) {
        case "test": {
            document.getElementById("menuContainer").style.visibility = "hidden";
            writeCommandResults("Suppression des effets visuels du menu");
            break;
        }
        case "menu": {
            document.getElementById("menu").style.display = "flex";
            document.getElementById("displayScreenTitle").style.display = "flex";
            displayAvailableCommands("scenariosSelection");
        }
        case "select": {
            selectScenario(commandObj.commandOptions, selectedScenario);
            break;         
        }
        case "launch": {
            if (document.getElementsByClassName('menuScenariosSelected')[0]) {
                writeCommandResults("Chargement des modules des interfaces utilisateurs\nVérification des données\nLancement du scénario");
                var selectedScenario = "";
                switch (document.getElementsByClassName('menuScenariosSelected')[0].textContent.trim()) {
                    case "Enigmes" : {
                        selectedScenario = "scenarioEnigmes";
                        break;
                    }
                    case "Hacking": {
                        selectedScenario = "scenarioHacking";
                        break;
                    }
                    case "Jeux": {
                        selectedScenario = "scenarioJeux";
                        break;
                    }
                    default: break;
                }
                displayAvailableCommands(selectedScenario);
                document.getElementById("menu").style.display = "none";
                document.getElementById("displayScreenTitle").style.display = "none";
            } else {
                writeCommandResults("Veuillez choisir un scénario avant de le charger.");
            }
            break;
        }
        default: {
            writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
            break;
        }
    }
    scrollDown("commandResults");
}

function cutCommand(command) {
    var commandParts = command.split(" ");
    var commandKey = commandParts[0];
    commandParts.splice(0,1);
    var commandOptions = commandParts;
    return {commandKey, commandOptions};
}

function selectScenario(commandOptions, selectedScenario) {
    removeScenariosDisplayText()
    if (document.getElementsByClassName('menuScenariosSelected')[0]) {
        document.getElementsByClassName('menuScenariosSelected')[0].classList.remove('menuScenariosSelected');
    }
    switch (commandOptions[0]) {
        case "--enigmas": {
            writeCommandResults("Sélection du scénario Enigmes.");
            writeCommandResults("Affichage des informations supplémentaires pour le scénario choisi.");
            document.getElementById("displayScreenTitle").textContent = document.getElementById('firstScenario').textContent;
            document.getElementById("enigmesText").style.display = "block";
            document.getElementById("firstScenario").classList.add('menuScenariosSelected');
            break;
        }
        case "--hacking": {
            writeCommandResults("Sélection du scénario Hacking.");
            writeCommandResults("Affichage des informations supplémentaires pour le scénario choisi.");
            document.getElementById("displayScreenTitle").textContent = document.getElementById('secondScenario').textContent;
            document.getElementById("hackingText").style.display = "block";
            document.getElementById("secondScenario").classList.add('menuScenariosSelected');
            break;
        }
        case "--games": {
            writeCommandResults("Sélection du scénario Jeux.");
            writeCommandResults("Affichage des informations supplémentaires pour le scénario choisi.");
            document.getElementById("displayScreenTitle").textContent = document.getElementById('thirdScenario').textContent;
            document.getElementById("gamesText").style.display = "block";
            document.getElementById("thirdScenario").classList.add('menuScenariosSelected');
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

function displayAvailableCommands(applicationState) {
    var documentation = document.getElementById('textDocumentation');
    switch(applicationState) {
        case "scenariosSelection": {
            documentation.innerHTML =  "<h2>Sélectionner un scénario : </h2>";
            documentation.innerHTML += "<strong>select --enigmas : </strong>Scénario Enigmes<br>";
            documentation.innerHTML += "<strong>select --hacking : </strong>Scénario Hacking<br>";
            documentation.innerHTML += "<strong>select --games &nbsp; : </strong>Scénario Jeux<br>";
            documentation.innerHTML += "<h2>Charger un scénario : </h2>";
            documentation.innerHTML += "<strong>launch</strong> : Charge le scénario sélectionné";
            break;
        }
        case "scenarioEnigmes": {
            documentation.innerHTML = "No commands founded for Enigmes";
            break;
        }
        case "scenarioHacking": {
            documentation.innerHTML = "No commands founded for Hacking";
            break;
        }
        case "scenarioJeux": {
            documentation.innerHTML = "No commands founded for Jeux";
            break;
        }
        default: break;
    }
}

function writeCommandResults(text) {
    var textResults = document.getElementById("textResults");
    textResults.innerText += "\n" + text;
}