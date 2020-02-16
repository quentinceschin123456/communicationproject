(function init() {
    removeScenariosDisplayText();
    initializeSwitchBetweenScenarios();
    initializeCommandTypingEvent();
})();

function removeScenariosDisplayText() {
    var listScenarioDisplayText = document.getElementsByClassName("scenariosDisplayText");
    Array.from(listScenarioDisplayText).forEach(element => {
        element.style.display = "none";
    });
}

function initializeSwitchBetweenScenarios() {
    var listElem = document.getElementsByClassName("menuScenarios");
    Array.from(listElem).forEach(element => {
        element.onmouseenter = function (event) {
            document.getElementById("displayScreenTitle").textContent = event.target.textContent;
            removeScenariosDisplayText()
            switch (event.target.textContent.trim()) {
                case "Enigmes": {
                    document.getElementById("enigmesText").style.display = "block";
                    break;
                }
                case "Hacking": {
                    document.getElementById("hackingText").style.display = "block";
                    break;
                }
                case "Jeux": {
                    document.getElementById("gamesText").style.display = "block";
                    break;
                }
                default: break;
            }
        }
    });
}

function initializeCommandTypingEvent() {
    var input = document.getElementsByTagName("INPUT")[0];
    input.onkeyup = function(event) {
        if (event.keyCode === 13) {
            var textResults = document.getElementById("textResults");
            textResults.innerText += "\n> " + input.value;
            scrollDown("commandResults");
            commandTraitment(input.value, textResults);
            input.value = "";
        }
    }
}

function scrollDown(id) {
    var objDiv = document.getElementById(id);
    objDiv.scrollTop = objDiv.scrollHeight;
}


function commandTraitment(command, textResults) {
    switch (command) {
        case "test": {
            document.getElementById("menuContainer").style.visibility = "hidden";
            textResults.innerText += "\nSuppression des effets visuels du menu";
            break;
        }
        case "launch": {
            textResults.innerText += "\nChargement des modules des interfaces utilisateurs\nVérification des données\nLancement du scénario";
            document.getElementById("menu").style.display = "none";
            document.getElementById("displayScreenTitle").style.display = "none";
        }
        default: break;
    }
    scrollDown("commandResults");
}