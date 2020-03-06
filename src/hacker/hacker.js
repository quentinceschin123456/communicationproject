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
                state = matchCommandeRecovery1(commandKey, commandOptions, state)

                break;
            }
        case "defend2":
            {
                state = matchCommandeDefend2(commandKey, commandOptions, state)
                // state.scenarioHackingState.name = "recovery2";
                break;
            }
        case "recovery2":
            {
                // state.scenarioHackingState.name = "defend3";
                state = matchCommandeRecovery2(commandKey, commandOptions, state)
                break;
            }
        case "defend3":
            {
                state = matchCommandeDefend3(commandKey, commandOptions, state)
                // state.scenarioHackingState.name = "recovery3";
                break;
            }
        case "recovery3":
            {
                // state.scenarioHackingState.name = "end";
                state = matchCommandeRecovery3(commandKey, commandOptions, state)
                break;
            }

        case "end":
            {
                state = matchCommandeEnd(commandKey, commandOptions, state)
                break;
            }
        default:
            console.log("hackingScenario - invalid scenario state");
            state.scenarioHackingState.name = "initialisation";
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
            writeCommandResults("Vous venez de débloquer le debugger avancé système. Vous pouvez utiliser l'ensemble des commandes systèmes");
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
            writeCommandResults("Tous les ports de connexions ont bien été fermés.")
            state.scenarioHackingState.previousCmd = "block";
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "block") {
        if (commandKey == "changeIp") {
            writeCommandResults("Nouvelle Ip allouée : 197.12.68.49");
            state.scenarioHackingState.previousCmd = "changeIp";
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "changeIp") {
        if (commandKey == "rm" && commandOptions[0] == "-rf" && commandOptions[1] == "/root/spy/*") {
            writeCommandResults("Les fichiers espions ont bien été effacé.");
            state.scenarioHackingState.previousCmd = "delete";
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "delete") {
        if (commandKey == "open" && commandOptions == "--all-port") {
            writeCommandResults("Tout les ports de connexions ont bien été ouvert.")
            state.scenarioHackingState.previousCmd = "";
            state.scenarioHackingState.name = "recovery1";
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }

    return state;
}

function matchCommandeDefend2(commandKey, commandOptions, state) {

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
        state.scenarioHackingState.name = "recovery2";
    }

    return state;
}


function matchCommandeDefend3(commandKey, commandOptions, state) {

    if (!state.scenarioHackingState.isPreviousCmdSucced) {
        return scenarioHackingState;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {

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

function matchCommandeRecovery1(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced) {
        return scenarioHackingState;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {
        if (commandKey == "netscan") {
            writeCommandResults("IP : 192.168.1.156")
            state.scenarioHackingState.previousCmd = "netscan";
        } else {
            commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "netscan") {
        if (commandKey == "ssh" && commandOptions[0] == "--forcePassword" && commandOptions[1] == "root@192.168.1.156") {
            writeCommandResults("Connection ssh réussi, le mot de passe est 'root'");
            writeCommandResults("Les fichiers présent sont : <li>info.txt</li><li>root.pwd</li><li>issous.png</li></<li>");
            state.scenarioHackingState.previousCmd = "ssh";
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "ssh") {
        if (commandKey == "cat" && commandOptions == "info.txt") {
            writeCommandResults("Ouverture du fichier info.txt");

            //  TODO animation hack + new text
            state.scenarioHackingState.previousCmd = "cat";
            state.scenarioHackingState.name = "defend2";
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
}

function matchCommandeRecovery2(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced) {
        return scenarioHackingState;
    }

    //première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {
        if (commandKey == "cat" && commandOptions == "info.txt") {
            writeCommandResults("Ouverture du fichier info.txt");
            document.getElementById("hackingText").innerHTML = getFirstBlocQuentin();
            state.scenarioHackingState.previousCmd = "cat";
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
}

function matchCommandeRecovery3(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced) {
        return scenarioHackingState;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {

        if (commandKey == "block" && commandOptions == "--all-port") {
            writeCommandResults("Tout les ports de connexions ont bien été fermés.")
            state.scenarioHackingState.previousCmd = "block";
        } else {

            commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
}

function matchCommandeEnd(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced) {
        return scenarioHackingState;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {

        if (commandKey == "block" && commandOptions == "--all-port") {
            writeCommandResults("Tout les ports de connexions ont bien été fermés.")
            state.scenarioHackingState.previousCmd = "block";
        } else {

            commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }
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


function getFirstBlocQuentin() {
    return "";
}

function getSecondBlocQuentin() {
    return "";
}

function getThirdFirstBlocQuentin() {
    return "";
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
// lien de téléchargement du fichier