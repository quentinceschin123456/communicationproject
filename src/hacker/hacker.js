function getInputedText() {
    return document.getElementsByTagName("INPUT")[0].value;
}

function hackingScenario(commandKey, commandOptions, state) {
    switch (state.scenarioHackingState.name) {
        case "initialisation":
            {
                state = matchCommandeInit(commandKey, commandOptions, state);
                break;
            }
        case "defend1":
            {
                state = matchCommandeDefend1(commandKey, commandOptions, state)
                break;
            }
        case "recovery1":
            {
                state.scenarioHackingState.name = "defend2";
                break;
            }
        case "defend2":
            {
                state = matchCommandeDefend2(commandKey, commandOptions, state)
                // scenarioHackingState = "recovery2";
                break;
            }
        case "recovery2":
            {
                // scenarioHackingState = "defend3";
                break;
            }
        case "defend3":
            {
                state = matchCommandeDefend3(commandKey, commandOptions, state)
                // scenarioHackingState = "recovery3";
                break;
            }
        case "recovery3":
            {
                // scenarioHackingState = "end";
                break;
            }

        case "end":
            {
                break;
            }
        default:
            console.log("hackingScenario - invalid scenario state");
            state.scenarioHackingState.name = "intialisation";
            break;
    }
    console.log(state.scenarioHackingState)
    return state;
}

function matchCommandeInit(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced) {
        return state;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {
        if (commandKey == "start" && commandOptions == "--debugger-sys") {
            writeCommandResults("Vous venez de débloquer le debugger avancé systême.")
            state.scenarioHackingState.previousCmd = "start";
            state.scenarioHackingState.name = "defend1";
            document.getElementById("hackingText").innerHTML = textDefend1();
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }

    return state;
}

function matchCommandeDefend1(commandKey, commandOptions, state) {

    if (!state.scenarioHackingState.isPreviousCmdSucced) {
        return state;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {
        if (commandKey == "block" && commandOptions == "--all-port") {
            writeCommandResults("Tout les ports de connexions ont bien été fermés.")
            state.scenarioHackingState.previousCmd = "block";
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "block") {
        state.scenarioHackingState.previousCmd = "changeIp";
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "changeIp") {
        state.scenarioHackingState.previousCmd = "delete";
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "delete") {
        state.scenarioHackingState.previousCmd = "";
        state.scenarioHackingState.name = "recovery1";
    }

    return state;
}

function matchCommandeDefend2(commandKey, commandOptions, state) {

    if (!state.scenarioHackingState.isPreviousCmdSucced) {
        return state;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {
        var div = document.getElementById('hackingText');
        if (commandKey == "block" && commandOptions == "--all-port") {
            writeCommandResults("Tout les ports de connexions ont bien été fermés.")
            state.scenarioHackingState.previousCmd = "block";
        } else {

            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "block") {
        state.scenarioHackingState.previousCmd = "changeIp";
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "changeIp") {
        state.scenarioHackingState.previousCmd = "delete";
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "delete") {
        state.scenarioHackingState.previousCmd = "";
    }

    return state;
}


function matchCommandeDefend3(commandKey, commandOptions, state) {

    if (!state.scenarioHackingState.isPreviousCmdSucced) {
        return scenarioHackingState;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {
        var div = document.getElementById('hackingText');
        if (commandKey == "block" && commandOptions == "--all-port") {
            writeCommandResults("Tout les ports de connexions ont bien été fermés.")
            state.scenarioHackingState.previousCmd = "block";
        } else {

            commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "block") {
        state.scenarioHackingState.previousCmd = "changeIp";
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "changeIp") {
        state.scenarioHackingState.previousCmd = "delete";
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "delete") {
        state.scenarioHackingState.previousCmd = "";
    }

    return state;
}

function documentationHack1() {

}

function documentationHack2() {

}

function documentationHack3() {

}

function documentationHackGeneral() {

}

function textInitialisation() {
    return '<strong>HACKING : </strong><br> <br>' +
        'Bienvenu au cybercafé "TrapedMouse", je suis anonimous et je détiens un accès à l \'intégralité de vos données.' +
        '<br> ' +
        '<br >' +
        'Donnez moi 500 bitcoins si vous ne souhaitez pas que détruise vos précieuses informations.' +
        '</div>';
}


function textDefend1() {

}

function textRecovery1() {

}

function textDefend2() {

}

function textRecovery2() {

}

function textDefend3() {

}

function textRecovery3() {

}

function textEnd() {

}


// au lancement afficher un texte pour indiquer que le pc est hacké
// 1 ensemble de commande défensif
// netscan + ssh --forcePassword root@192.168.1.156
// message success
// cat info.txt
// mais avant d'être arrivé à lister les fichiers -> deuxieme attaque
// 2 ensemble de commande
// ls -aR -> cat info.txt + cat readme.md qui dit qu'il faut aller dans recrutement ... 
// cd /root/Desktop/Recrutement MAIS attaque
// 3 eme sequense de commande
// cd /root/Desktop/Recrutement + ls
// cat info.txt 
// scp root@192.168.1.156:/root/Desktop/Recrutement ~/root/Desktop/
// lien de téléchargement du fichier =