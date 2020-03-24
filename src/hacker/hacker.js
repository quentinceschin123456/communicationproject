var hackerDocElement = document.getElementById("docScenarioHacking");

function hackingScenario(commandKey, commandOptions, state) {
    switch (state.scenarioHackingState.name) {
        case "initialisation":
            {
                state = matchCommandeInit(commandKey, commandOptions, state);
                break;
            }
        case "defend1":
            {
                state = matchCommandeDefend1(commandKey, commandOptions, state);
                break;
            }
        case "recovery1":
            {
                state = matchCommandeRecovery1(commandKey, commandOptions, state);

                break;
            }
        case "defend2":
            {
                state = matchCommandeDefend2(commandKey, commandOptions, state);
                break;
            }
        case "recovery2":
            {
                state = matchCommandeRecovery2(commandKey, commandOptions, state);
                break;
            }
        case "defend3":
            {
                state = matchCommandeDefend3(commandKey, commandOptions, state);
                break;
            }
        case "recovery3":
            {
                state = matchCommandeRecovery3(commandKey, commandOptions, state);
                break;
            }

        case "end":
            {
                state = matchCommandeEnd(commandKey, commandOptions, state);
                break;
            }
        default:
            console.log("hackingScenario - invalid scenario state");
            state.scenarioHackingState.name = "initialisation";
            break;
    }
    console.log(state.scenarioHackingState);
    return state;
}

function matchCommandeInit(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "initialisation") {
        return state;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "") {
        if (commandKey == "start" && commandOptions == "--debugger-sys") {
            writeCommandResults("Vous venez de débloquer le debugger avancé système. Vous pouvez utiliser l'ensemble des commandes systèmes");
            state.scenarioHackingState.previousCmd = "";
            state.scenarioHackingState.name = "defend1";
            hackerDocElement.style.display = "block";
            hackerDocElement.innerHTML = documentationHackDefend1();
            document.getElementById("hackingText").innerHTML = textDefend1();
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }

    return state;
}

function matchCommandeDefend1(commandKey, commandOptions, state) {

    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "defend1") {
        return state;
    }
    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "block" && commandOptions == "--all-port") {
                writeCommandResults("Tous les ports de connexions ont bien été fermés.")
                state.scenarioHackingState.previousCmd = "block";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "block":
            if (commandKey == "changeIp") {
                writeCommandResults("Nouvelle Ip allouée : 197.12.68.49");
                state.scenarioHackingState.previousCmd = "changeIp";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "changeIp":
            if (commandKey == "rm" && commandOptions[0] == "-rf" && commandOptions[1] == "/root/spy/*") {
                writeCommandResults("Les fichiers espions ont bien été effacés.");
                state.scenarioHackingState.previousCmd = "delete";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "delete":
            if (commandKey == "open" && commandOptions == "--all-port") {
                writeCommandResults("Tout les ports de connexions ont bien été ouverts.")
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "recovery1";
                hackerDocElement.style.display = "block";
                hackerDocElement.innerHTML = documentationHackRecovery1();
                document.getElementById("hackingText").innerHTML = textRecovery1();
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        default:
            break;
    }
    return state;
}

function matchCommandeDefend2(commandKey, commandOptions, state) {

    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "defend2") {
        return state;
    }

    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "restore" && commandOptions[0] == "--all" && commandOptions[1] == "firewall") {
                writeCommandResults("Tout les ports de connexions ont bien été fermés.")
                state.scenarioHackingState.previousCmd = "restore";
            } else {

                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "restore":
            if (commandKey == "rsa" && commandOptions[0] == "-gc" && commandOptions[1] == "--new-key") {
                writeCommandResults("Régénration des clées privées rsa. Les clées publiques restent inchangées")
                state.scenarioHackingState.previousCmd = "rsa";
            } else {

                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "rsa":
            if (commandKey == "apply" && commandOptions[0] == "--rsa-key" && commandOptions[1] == "fireWall") {
                writeCommandResults("Encodage des sources des fireWall terminée.")
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "recovery2";
                hackerDocElement.style.display = "block";
                hackerDocElement.innerHTML = documentationHackRecovery2();
                document.getElementById("hackingText").innerHTML = textRecovery2();
            } else {

                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        default:
            break;
    }

    return state;
}


function matchCommandeDefend3(commandKey, commandOptions, state) {

    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "recovery1") {
        return scenarioHackingState;
    }
    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "exec" && commandOptions == "windowsDefender.exe") {
                writeCommandResults("Windows Defender actif...")
                state.scenarioHackingState.previousCmd = "exec";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "exec":
            if (commandKey == "listen" && commandOptions == "-a") {
                writeCommandResults("Ecoute de tout les fichiers en attente d'une analyse.");
                state.scenarioHackingState.previousCmd = "listen";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "listen":
            if (commandKey == "start" && commandOptions[0] == "analysis") {
                writeCommandResults("Su^^ression de toutes les menaces terminées. Votre système est sécurisé.");
                state.scenarioHackingState.previousCmd = "delete";
                state.scenarioHackingState.name = "recovery3";
                hackerDocElement.style.display = "block";
                hackerDocElement.innerHTML = documentationHackRecovery3();
                document.getElementById("hackingText").innerHTML = textRecovery3();
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        default:
            break;
    }
    return state;
}

function matchCommandeRecovery1(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "recovery1") {
        return scenarioHackingState;
    }
    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "netscan") {
                writeCommandResults("IP : 192.168.1.156")
                state.scenarioHackingState.previousCmd = "netscan";
            } else {
                commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "netscan":
            if (commandKey == "ssh" && commandOptions[0] == "--forcePassword" && commandOptions[1] == "root@192.168.1.156") {
                writeCommandResults("Connection ssh réussi, le mot de passe est 'root'");
                writeCommandResults("Les fichiers présent sont : <li>info.txt</li><li>root.pwd</li><li>issous.png</li></<li>");
                state.scenarioHackingState.previousCmd = "ssh";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "ssh":
            if (commandKey == "cat" && commandOptions == "info.txt") {
                writeCommandResults("Ouverture du fichier info.txt");

                //  TODO animation hack + new text
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "defend2";
                hackerDocElement.style.display = "block";
                hackerDocElement.innerHTML = documentationHackDefend2();
                document.getElementById("hackingText").innerHTML = textDefend2();
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        default:
            break;
    }
    return state;
}

// ls -aR -> cat info.txt + cat readme.md qui dit qu'il faut aller dans recrutement ... 
function matchCommandeRecovery2(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "recovery2") {
        return state;
    }

    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "ls" && commandOptions == "-aR") {
                // folder liste
                // one folder
                // file list
                // one folder
                // file list
                writeCommandResults("--------");
                writeCommandResults("");
                document.getElementById("hackingText").innerHTML = getFirstBlocQuentin();
                state.scenarioHackingState.previousCmd = "cat";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "ls":
            if (commandKey == "cat" && commandOptions == "info.txt") {
                writeCommandResults("Ouverture du fichier info.txt");
                document.getElementById("hackingText").innerHTML = getFirstBlocQuentin();
                state.scenarioHackingState.previousCmd = "cat-info";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "cat-info":
            if (commandKey == "cat" && commandOptions == "readme.md") {
                writeCommandResults("Ouverture du fichier readme.md");
                document.getElementById("hackingText").innerHTML = getReadMeText();
                state.scenarioHackingState.previousCmd = "cat";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "cat":
            if (commandKey == "cd" && commandOptions == "Recrutement") {
                writeCommandResults("Déplacement vers /root/Desktop/Recrutement");
                document.getElementById("hackingText").innerHTML = getReadMeText();
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "defend3";
                hackerDocElement.style.display = "block";
                hackerDocElement.innerHTML = documentationHackDefend3();
                document.getElementById("hackingText").innerHTML = textDefend3();
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        default:
            break;
    }
    return state;
}

function matchCommandeRecovery3(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "recovery3") {
        return scenarioHackingState;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {
        switch (state.scenarioHackingState.previousCmd) {
            case "":
                if (commandKey == "exit") {
                    writeCommandResults("Déconnexion de l'hôte distant.Retour sur localUser")
                    state.scenarioHackingState.previousCmd = "exit";
                } else {

                    state = commandsScenariosUtilities(commandKey, commandOptions, state);
                }
                break;
            case "exit":
                if (commandKey == "scp" && commandOptions[0] == "root@192.168.1.156:/root/Desktop/Recrutement" && commandOptions[1] == "~/root/Desktop/") {
                    writeCommandResults("Téléchargment des fichiers...")
                    writeCommandResults("Fichiers Récupérés.")
                    state.scenarioHackingState.previousCmd = "";
                    state.scenarioHackingState.name = "end";
                    hackerDocElement.style.display = "block";
                    hackerDocElement.innerHTML = documentationHackEnd();
                    document.getElementById("hackingText").innerHTML = textEnd();

                } else {

                    state = commandsScenariosUtilities(commandKey, commandOptions, state);
                }
                break;
        }
    }
    return state;
}

function matchCommandeEnd(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "end") {
        return state;
    }

    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "reset") {
                writeCommandResults("Le scenrario a bien été réinitialisé.")
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "initialisation";
                hackerDocElement.style.display = "block";
                hackerDocElement.innerHTML = documentationHackInit();
                document.getElementById("hackingText").innerHTML = textInitialisation();

            } else {

                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            if (commandKey == "getText") {
                writeCommandResults("Voici l'ensemble des paragraphes ainsi qu'un lien de téléchargement pour le CV.")
                state.scenarioHackingState.previousCmd = "";
                document.getElementById("hackingText").innerHTML = textEnd();
            } else {

                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;

    }
    return state;
}

function documentationHackDefend1() {
    var str = "<h2>Blocker une tentative d'accès private : </h2>";
    str += "<strong>block --all-port : </strong>Ferme tous les ports écoutant un réseau distant out local<br>";
    str += "<strong>changeIp : </strong>Change votre adresse virtuelle<br>";
    str += "<strong>rm -rf /root/spy/* : </strong>Efface le contenu du répertoire spy contenant des écouteurs de clavier<br>";
    str += "<strong>open --all-port : </strong>Ouvre tous les ports<br>";

    return str;
}

function documentationHackDefend2() {

}

function documentationHackDefend3() {

}

function documentationHackRecovery1() {

}

function documentationHackRecovery2() {

}

function documentationHackRecovery3() {

}

function documentationHackEnd() {

}

function documentationHackInit() {

}

function documentationHackGeneral() {

}

function getReadMeText() {
    return "Toutes les informations personnelles sont dans le répertoire Recrutement";
}

function textInitialisation() {
    return '<strong>HACKING : </strong><br> <br>' +
        'Bienvenu au cybercafé "TrapedMouse", je suis anonymous et je détiens un accès à l \'intégralité de vos données.' +
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
    // il faut récap tout les textes + lien du cv + dire que l'on veut reset
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